import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeoPointDocument = GeoPoint & Document;

@Schema()
export class GeoPoint {
    @Prop({ required: true, default: 'point' })
    name: string;

    @Prop({ required: true, default: [46.49067, 11.33982] })
    coordinates: number[];
}

export const GeoPointSchema = SchemaFactory.createForClass(GeoPoint);