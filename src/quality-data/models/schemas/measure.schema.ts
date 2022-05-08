import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GeoPoint } from './geo-point.schema';

export type MeasureDocument = Measure & Document;

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GeoPoint' })
    point: GeoPoint;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);