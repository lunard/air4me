import { IsNotEmpty } from 'class-validator';


export class MeasureRequest {

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;

    @IsNotEmpty()
    tvoc: number;

    @IsNotEmpty()
    eco2: number;

    timestamp: Date;
}