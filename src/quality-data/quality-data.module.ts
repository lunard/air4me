import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Measure, MeasureSchema } from './models/schemas/measure.schema';
import { QualityDataController } from './quality-data.controller';
import { QualityDataService } from './quality-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Measure.name, schema: MeasureSchema },
    ])
  ],
  controllers: [QualityDataController],
  providers: [QualityDataService],
  exports: [MongooseModule]
})
export class QualityDataModule { }
