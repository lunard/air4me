import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GeoPoint } from './geo-point.schema';

export type MeasureDocument = Measure & Document;

@Schema()
export class Measure {
    @Prop({ required: true, default: 'point' })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GeoPoint' })
    pint: GeoPoint;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);