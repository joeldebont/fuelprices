import { FuelModel } from "hooks/station/types";

export const getCurrentFuels = (fuels: FuelModel[], fuel: string) => {
    return fuels.filter((f) => f.name === fuel);
}