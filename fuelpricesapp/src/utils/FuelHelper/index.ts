import { FuelModel } from "hooks/station/types";

export const getCurrentFuels = (fuels: FuelModel[], fuel: string) => {
    return fuels.filter((f) => f.name === fuel);
}

export const getCurrentFuel = (fuels: FuelModel[], fuel: string) => {
    return fuels.find((f) => f.name === fuel);
}

export const getFuelPriceStrings = (price: number) => {
    const fixedPrice = price.toFixed(3);
    const firstPart = fixedPrice.toString().substring(0, 4);
    const secondPart = fixedPrice.toString().substring(4, 5);

    return [firstPart, secondPart];
}