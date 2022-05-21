import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureRequest } from './models/rest/measure-request.model';
import { SensorRequest } from './models/rest/sensor-request.model';
import { SensorResponse } from './models/rest/sensor-response.model';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {

    constructor(private sensorService: SensorsService) {
    }

    @Post("near")
    async getSensors(@Body() request: SensorRequest): Promise<SensorResponse[]> {
        Logger.debug("getSensors: ", request);
        return await this.sensorService.getSensorsByPositionAndRadius(request.latitude, request.longitude, request.radius);
    }

    @Post("measure")
    async sendMeasure(@Body() request: MeasureRequest) {
        return await this.sensorService.sendMqttMeasure(request.type, request.latitude, request.longitude, request.value, request.timestamp);
    }
}
