export class MqttMeasure {

    type: string;
    position: Position;
    value: number;
    timestamp: Date;

    constructor(type: string, latitude: number, longitude: number, value: number, timestamp?: Date) {
        this.type = type;
        this.position = new Position(latitude, longitude);
        this.value = value;

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