import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeasureDocument = Measure & Document;


export class Point {
    @Prop({ enum: ['Point'], required: true, default: 'Point' })
    type: string;

    @Prop({ required: true, default: [0, 0] })
    coordinates: number[];
}

@Schema()
export class Measure {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true, min: 0 })
    value: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, min: 0 })
    period: number;

    @Prop({ type: Point })
    location: Point;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
MeasureSchema.index({ location: '2dsphere' });

