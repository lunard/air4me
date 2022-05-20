import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { QualityDataModule } from '../quality-data/quality-data.module';

@Module({
  imports: [QualityDataModule],
  providers: [SensorsService],
  controllers: [SensorsController]
})
export class SensorsModule { }
