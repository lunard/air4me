import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { QualityDataModule } from '../quality-data/quality-data.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [QualityDataModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MqttClient',
        transport: Transport.MQTT,
        options: {
          hostname: process.env.MQTT_URL,
          clientId: process.env.MQTT_CLIENT_ID,
          port: 1883,
          protocol: 'mqtt'
        }
      },
    ]),
  ],
  providers: [SensorsService],
  controllers: [SensorsController]
})
export class SensorsModule { }
