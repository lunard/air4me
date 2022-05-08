import { HttpModule } from 'nestjs-http-promise';
import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { QualityDataModule } from 'src/quality-data/quality-data.module';

@Module({
  imports: [HttpModule, QualityDataModule],
  providers: [SyncService]
})
export class OpenDataSyncModule { }
