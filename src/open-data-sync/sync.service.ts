import { HttpService } from 'nestjs-http-promise';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OpenDataHubStationData } from './models/measure.model';
import { InjectModel } from '@nestjs/mongoose';
import { GeoPoint, GeoPointDocument } from 'src/quality-data/models/schemas/geo-point.schema';
import { Model } from 'mongoose';
import { Measure, MeasureDocument, MeasureSchema } from 'src/quality-data/models/schemas/measure.schema';
//import { Station } from './models/station.model';

@Injectable()
export class SyncService {

    constructor(
        private httpService: HttpService,
        @InjectModel(GeoPoint.name) private geoPointModel: Model<GeoPointDocument>,
        @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>
    ) {
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async syncOpenDataHub() {
        Logger.debug("Sync Open Data Hub data");

        try {
            //const stationsResponse = await this.httpService.get<any>(process.env.OPEN_DATA_HUB_STATIONS_URL);
            //const stations: Station[] = stationsResponse.data.data.filter(s => s.sactive == true);

            const measuresResponse = await this.httpService.get<any>(process.env.OPEN_DATA_HUB_MEASURES_URL);
            const openDataHubMeasures: OpenDataHubStationData = measuresResponse.data.data.EnvironmentStation.stations;


            let promises: Promise<void>[] = [];
            Object.keys(openDataHubMeasures).forEach((stationKey) => {

                promises.push(new Promise<void>(async (resolve, reject) => {

                    try {
                        let measures: Measure[] = [];

                        const m = openDataHubMeasures[stationKey];
                        Logger.debug("Station " + stationKey);

                        let geoPoint: GeoPoint = await this.geoPointModel.findOne({ name: stationKey });
                        if (!geoPoint) {
                            geoPoint = {
                                name: stationKey,
                                coordinates: [m.scoordinate.x, m.scoordinate.y]
                            };
                            Logger.debug("Create new GeoPoint: ", geoPoint);
                            await this.geoPointModel.create(geoPoint);
                        }

                        Object.keys(m.sdatatypes).forEach(async (dataTypeKey) => {
                            const data = m.sdatatypes[dataTypeKey];
                            Logger.debug("Add measure for type " + dataTypeKey);

                            measures.push({
                                type: dataTypeKey,
                                date: data.tmeasurements[0].mtransactiontime,
                                period: data.tmeasurements[0].mperiod,
                                point: geoPoint,
                                value: data.tmeasurements[0].mvalue
                            });
                        });


                        await this.measureModel.insertMany(measures);
                        Logger.debug(`${measures.length} measured insert for station '${stationKey}'`);

                        resolve();
                    } catch {
                        reject();
                    }
                })
                );
            });

            await Promise.all(promises); // NB: executed in parallel!!

            Logger.debug("Sync done!");

        } catch (err) {
            Logger.error("Cannot fetch the data from the Open Data Hub: " + err?.message);
        }
    }

}
