import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measure, MeasureDocument } from 'src/quality-data/models/schemas/measure.schema';
import { SensorResponse } from './models/sensor-response.model';
import * as moment from 'moment';
@Injectable()
export class SensorsService {
    constructor(@InjectModel(Measure.name) private measureModel: Model<MeasureDocument>) {
    }

    async getSensorsByPositionAndRadius(lat: number, lon: number, radius: number): Promise<SensorResponse[]> {
        const results = await this.measureModel.find({
            location: {
                $near:
                {
                    $geometry: { type: "Point", coordinates: [Number(lon), Number(lat)] },
                    $maxDistance: Number(radius)
                }
            },
            date: { $gt: moment().subtract(1, 'days').toDate() },
        });
        const result = (results as Measure[]).map((measure) => {
            return {
                type: measure.type,
                lat: measure.location.coordinates[0],
                lon: measure.location.coordinates[1]
            } as SensorResponse;
        });

        return result;
    }
}
