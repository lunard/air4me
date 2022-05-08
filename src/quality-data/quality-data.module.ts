import { Module } from '@nestjs/common';
import { QualityDataController } from './quality-data.controller';
import { QualityDataService } from './quality-data.service';

@Module({
  controllers: [QualityDataController],
  providers: [QualityDataService]
})
export class QualityDataModule {}
