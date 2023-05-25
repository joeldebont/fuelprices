import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions"
import { Platform } from "react-native"

export const AskLocationPermission = async () => {
    if(Platform.OS === "ios") {
        const checkResponse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if(checkResponse === RESULTS.GRANTED || checkResponse === RESULTS.LIMITED) {
            return true;
        }
    }

    const permission = Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const requestResult = await request(permission);

    return requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
}