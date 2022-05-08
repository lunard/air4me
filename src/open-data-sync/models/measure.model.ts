import { OpenDataHubCoordinates } from "./station.model";

export interface OpenDataHubStationData {
    [key: string]: OpenDataHubMeasure;
}

export interface OpenDataHubMeasure {
    scoordinate: OpenDataHubCoordinates;
    sdatatypes: any;
}