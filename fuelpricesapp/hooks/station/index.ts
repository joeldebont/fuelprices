import axios from "axios";

const useStations = () => {

    const baseUrl = '/station';

    const getStations = async (lat: number, lng: number) => {
        const response = await axios.get<number>(`${baseUrl}?lat=${lat}&lng=${lng}`);

        return response;
    };

    return {
        getStations
    };
};

export default useStations;
