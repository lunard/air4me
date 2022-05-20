import { HttpService } from 'nestjs-http-promise';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OpenDataHubStationData } from './models/measure.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measure, MeasureDocument, Point } from '../quality-data/models/schemas/measure.schema';
//import { Station } from './models/station.model';


@Injectable()
export class SyncService {

    constructor(
        private httpService: HttpService,
        @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>
    ) { }

    @Cron(CronExpression.EVERY_HOUR)
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

                        const point: Point = {
                            type: 'Point',
                            coordinates: [m.scoordinate.x, m.scoordinate.y]
                        };

                        Object.keys(m.sdatatypes).forEach(async (dataTypeKey) => {
                            const data = m.sdatatypes[dataTypeKey];
                            Logger.debug("Add measure for type " + dataTypeKey);

                            measures.push(
                                new this.measureModel({
                                    type: dataTypeKey,
                                    date: data.tmeasurements[0].mvalidtime,
                                    period: data.tmeasurements[0].mperiod,
                                    value: data.tmeasurements[0].mvalue,
                                    location: point,
                                })
                            );
                        });

                        await this.measureModel.insertMany(measures);
                        Logger.debug(`${measures.length} measured insert for station '${stationKey}'`);

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                })
                );
            });

            await Promise.all(promises); // NB: executed in parallel!!

            Logger.debug("Sync done!");

        } catch (err) {
            Logger.error("Cannot fetch the data from the Open Data Hub: ");
        }
    }

}
