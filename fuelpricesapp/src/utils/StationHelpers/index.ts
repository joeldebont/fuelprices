export const getDistanceInKm = (distanceInMeters: number, numberOfDecimals: number = 2) => {
    return (distanceInMeters / 1000).toFixed(numberOfDecimals);
}