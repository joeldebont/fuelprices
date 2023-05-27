import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map, { MapParamList } from "components/screens/map";
import Welcome, { WelcomeParamList } from "components/screens/Welcome";
import FuelPick, { FuelPickParamList } from "components/screens/FuelPick";
import Permission, { PermissionParamList } from "components/screens/Permission";
import { SESSION_KEY, Session } from "contexts/sessionContext";
import { useCallback, useEffect, useState } from "react";
import { CheckLocationPermission } from "utils/PermissionHelpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
    Welcome: WelcomeParamList;
    Map: MapParamList;
    FuelPick: FuelPickParamList;
    Permission: PermissionParamList;
}

interface RootStackScreenProps {
    initialRoute: keyof RootStackParamList | undefined;
}

const initialRootProps: RootStackScreenProps = {
    initialRoute: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    const [rootProps, setRootProps] = useState<RootStackScreenProps>(initialRootProps);

    const detirmineStartScreen = useCallback(async () => {
        const newRootProps = {...rootProps};
        const sessionJson = await AsyncStorage.getItem(SESSION_KEY);

        if(sessionJson == null) {
            newRootProps.initialRoute = 'Welcome';
        } else {
            const session = JSON.parse(sessionJson) as Session;
        
            if(session!.fuel == null) {
                newRootProps.initialRoute = 'FuelPick';
            } else {
                const result = await CheckLocationPermission();
    
                if(result) {
                    newRootProps.initialRoute = 'Map';
                } else {
                    newRootProps.initialRoute = 'Permission';
                }
            }
        } 

        setRootProps(newRootProps);
    }, []);

    useEffect(() => {
        detirmineStartScreen();
    }, []);

    const RootStackScreen = (props: RootStackScreenProps) => 
        <Stack.Navigator initialRouteName={props.initialRoute} screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="FuelPick" component={FuelPick} />
            <Stack.Screen name="Permission" component={Permission} />
        </Stack.Navigator>;

    return <RootStackScreen {...rootProps} />
};

export default Navigation;