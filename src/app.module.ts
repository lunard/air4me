import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@air4me.frvrk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`),
    SensorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
