import { FuelModel } from "hooks/station/types";

export const getCurrentFuels = (fuels: FuelModel[], fuel: string) => {
    return fuels.filter((f) => f.name === fuel);
}

export const getCurrentFuel = (fuels: FuelModel[], fuel: string) => {
    return fuels.find((f) => f.name === fuel);
}