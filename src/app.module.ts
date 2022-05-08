import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsModule } from './sensors/sensors.module';
import { QualityDataModule } from './quality-data/quality-data.module';
import { GeoPoint, GeoPointSchema } from './quality-data/models/schemas/geo-point.schema';
import { Measure, MeasureSchema } from './quality-data/models/schemas/measure.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenDataSyncModule } from './open-data-sync/open-data-sync.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@air4me.frvrk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: GeoPoint.name, schema: GeoPointSchema }, { name: Measure.name, schema: MeasureSchema }]),
    ScheduleModule.forRoot(),
    SensorsModule,
    QualityDataModule,
    OpenDataSyncModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
