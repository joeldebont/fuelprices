import axios from "axios";
import { StationModel } from "./types";
import { useQuery } from "react-query";

const useStations = () => {

    const baseUrl = '/station';

    const getStations = async (lat: number, lng: number) => {
        const response = await axios.get<StationModel[]>(`${baseUrl}?lat=${lat}&lng=${lng}`);

        return response;
    };

    const useStation = (lat: number, lng: number, enabled: boolean = true) => {
        const queryKey = ['station.search', { lat, lng }, enabled];

        return useQuery<StationModel[]>(queryKey, async () => {
            const response = await getStations(lat, lng);

            return response.data;
        }, {
            enabled
        });
    };

    return {
        getStations,
        useStation
    };
};

export default useStations;
