import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SensorRequest } from './models/sensor-request.model';
import { SensorResponse } from './models/sensor-response.model';
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
}
