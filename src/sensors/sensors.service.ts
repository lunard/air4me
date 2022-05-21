import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measure, MeasureDocument } from 'src/quality-data/models/schemas/measure.schema';
import { SensorResponse } from './models/rest/sensor-response.model';
import * as moment from 'moment';
import { ClientProxy } from '@nestjs/microservices';
import { MqttMeasure } from './models/mqtt/measure.model';
@Injectable()
export class SensorsService {
    constructor(
        @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>,
        @Inject("MqttClient") private mqttClient: ClientProxy) {
        mqttClient.connect();
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
            date: { $gt: moment().subtract(2, 'days').toDate() },
        });
        const result = (results as Measure[]).map((measure) => {
            return {
                type: measure.type,
                lat: measure.location.coordinates[1],
                lon: measure.location.coordinates[0],
                value: measure.value
            } as SensorResponse;
        });
        return result;
    }

    async sendMqttMeasure(type: string, latitude: number, longitude: number, tvoc: number, eco2: number, timestamp?: Date) {
        const message = new MqttMeasure(type, latitude, longitude, tvoc, eco2, timestamp);
        Logger.debug(`Sending message to MQTT: ${JSON.stringify(message)}`);
        await this.mqttClient.emit(process.env.MQTT_TOPIC, message);
    }
}
