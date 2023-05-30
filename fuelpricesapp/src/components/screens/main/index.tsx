import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "navigation/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionBar, Colors } from "react-native-ui-lib";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StationList from "../StationList";
import Map from "../map";
import Settings from "../Settings";
import useStations from "hooks/station";
import Geolocation from "@react-native-community/geolocation";

export interface MainParamList { };

export interface Location {
    lat: number;
    lng: number;
}

interface MainProps {
    route: RouteProp<RootStackParamList, 'Main'>;
    navigation: NavigationProp<RootStackParamList, 'Main'>;
}

const Main: FC<MainProps> = () => {

    const [active, setActive] = useState(0);
    const { useStation } = useStations();

    const [location, setLocation] = useState<Location | null>(null);
    const { data: stations = [], isLoading: isLoadingStations } = useStation(location?.lat ?? 0, location?.lng ?? 0, location !== null)
  
    useEffect(() => {
      Geolocation.getCurrentPosition(async (info) => {
        setLocation({
          lat: info.coords.latitude,
          lng: info.coords.longitude
        });
      });
    }, []);

    const color = Colors.$backgroundPrimaryHeavy;

    const onPress = (index: number) => {
        setActive(index);
    };

    const actions = useMemo(() => [
        { 
            iconSource: () => <FontAwesome5 name="map" size={24} color={color} solid={active === 0} />,
            onPress: () => onPress(0)
        },
        {
            iconSource: () => <FontAwesome5 name="list" size={24} color={color} solid={active === 1} />,
            onPress: () => onPress(1)
        },
        { 
            iconSource: () => <FontAwesome5 name="user" size={24} color={color} solid={active === 2} />,
            onPress: () => onPress(2)
        }
    ], [active]);

    const renderPage = useCallback(() => {
        switch (active) {
            case 0:
                return <Map stations={stations} isLoadingStations={isLoadingStations} location={location} />
            case 1:
                return <StationList stations={stations} />
            case 2:
                return <Settings />
        }
    }, [active, stations, isLoadingStations, location]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderPage()}
            <ActionBar
                centered
                flex
                bottom
                actions={actions}
            />
        </SafeAreaView>
    );
};

export default Main;