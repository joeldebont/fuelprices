import Geolocation from '@react-native-community/geolocation';
import React, { FC, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Callout, MAP_TYPES, Marker } from 'react-native-maps';
import useStations from 'hooks/station';
import { StationModel } from 'hooks/station/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'navigation/navigation';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { LoaderScreen } from 'react-native-ui-lib';

export interface MapParamList {

}

interface MapProps {
    route: RouteProp<RootStackParamList, 'Map'>;
    navigation: NavigationProp<RootStackParamList, 'Map'>
}

interface location {
  lat: number;
  lng: number;
}

const Map: FC<MapProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const { useStation } = useStations();

  const [location, setLocation] = useState<location | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationModel | null>(null);
  const { data: stations = [], isLoading: isLoadingStations } = useStation(location?.lat ?? 0, location?.lng ?? 0, location !== null)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(async (info) => {
      setLocation({
        lat: info.coords.latitude,
        lng: info.coords.longitude
      });
    });
  }, []);

  return (
      <SafeAreaView style={backgroundStyle}>
        {
          location == null || isLoadingStations ? <LoaderScreen color={Colors.grey40}/> : 
          <>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={backgroundStyle}>
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
              </View>
              <MapView
                  region={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: .05,
                    longitudeDelta: .05
                  }}
                  provider={Platform.OS == "android" ? "google" : undefined}
                  mapType={MAP_TYPES.STANDARD}
                  rotateEnabled={false}
                  zoomEnabled={true}
                  style={styles.map}
                  showsUserLocation
                >
                    {
                        stations.map((station) => 
                            <Marker
                            key={station.name}
                            coordinate={{
                                latitude: station.latitude,
                                longitude: station.longitude
                            }}
                            // title={station.name}
                            // description={`${(station.distanceToStation / 1000).toFixed(2)} km`}
                            onPress={() => setSelectedStation(station)}
                        >
                            <Callout>
                                <Text>{station.name}</Text>
                                <Text>{`${(station.distanceToStation / 1000).toFixed(2)} km`}</Text>
                                {
                                    station.fuels.map((fuel => 
                                        <View key={fuel.name}>
                                            <Text>{fuel.name}</Text>
                                            <Text>{fuel.price}</Text>
                                        </View>
                                    ))
                                }
                            </Callout>
                        </Marker>)
                    }
                </MapView>
                {
                    selectedStation != null &&
                    <View>
                    <Text>{selectedStation.name}</Text>
                    <Text>{`${(selectedStation.distanceToStation / 1000).toFixed(2)} km`}</Text>
                        {
                            selectedStation.fuels.map((fuel => 
                            <View key={fuel.name}>
                                <Text>{fuel.name}</Text>
                                <Text>{fuel.price}</Text>
                            </View>))
                        }
                    </View>
                }
            </ScrollView>
        </>
      }
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  map: {
    height: 400,
    width: 400
  }
});

export default Map;
