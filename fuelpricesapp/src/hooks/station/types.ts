export interface StationModel {
    id: string;
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