import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map, { MapParamList } from "components/screens/map";
import Welcome, { WelcomeParamList } from "components/screens/Welcome";
import FuelPick, { FuelPickParamList } from "components/screens/FuelPick";
import Permission, { PermissionParamList } from "components/screens/Permission";

export type RootStackParamList = {
    Welcome: WelcomeParamList;
    Map: MapParamList;
    FuelPick: FuelPickParamList;
    Permission: PermissionParamList;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {

    const RootStackScreen = () => 
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="FuelPick" component={FuelPick} />
            <Stack.Screen name="Permission" component={Permission} />
        </Stack.Navigator>;

    return <RootStackScreen />
};

export default Navigation;