export class MqttMeasure {

    type: string;
    position: Position;
    TVOC: number;
    eCO2: number;
    timestamp: Date;

    constructor(type: string, latitude: number, longitude: number, tvoc: number, eco2: number, timestamp?: Date) {
        this.type = type;
        this.position = new Position(latitude, longitude);
        this.TVOC = tvoc;
        this.eCO2 = eco2;

        this.timestamp = timestamp ?? new Date();
    }
}

export class Position {
    latitude: number;
    longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}