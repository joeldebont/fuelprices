import Geolocation from '@react-native-community/geolocation';
import React, { FC, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, MAP_TYPES, Marker } from 'react-native-maps';
import useStations from 'hooks/station';
import { StationModel } from 'hooks/station/types';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { useSession } from 'contexts/sessionContext';
import { getCurrentFuels } from 'utils/FuelHelper';

interface location {
  lat: number;
  lng: number;
}

const Map = () => {

  const { session } = useSession();
  const { useStation } = useStations();

  const [location, setLocation] = useState<location | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationModel | null>(null);
  const { data: stations = [], isLoading: isLoadingStations } = useStation(location?.lat ?? 0, location?.lng ?? 0, location !== null)

  useEffect(() => {
    Geolocation.getCurrentPosition(async (info) => {
      setLocation({
        lat: info.coords.latitude,
        lng: info.coords.longitude
      });
    });
  }, []);

  return (
      <View style={{ flex: 1}}>
        {
          location == null || isLoadingStations ? <LoaderScreen color={Colors.grey40}/> : 
          <>
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
                                onPress={() => setSelectedStation(station)}
                            >
                            <Callout>
                                <Text>{station.name}</Text>
                                <Text>{`${(station.distanceToStation / 1000).toFixed(2)} km`}</Text>
                                {
                                    getCurrentFuels(station.fuels, session!.fuel).map((fuel => 
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
        </>
      }
      </View>
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
    flex: 1
  }
});

export default Map;
