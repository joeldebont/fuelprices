export interface StationModel {
    name: string;
    latitude: number;
    longitude: number;
    distanceToStation: number;
    fuels: FuelModel[];
};

export interface FuelModel {
    name: string;
    price: number;
}