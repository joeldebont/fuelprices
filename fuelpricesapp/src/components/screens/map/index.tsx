import React, { FC } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, MAP_TYPES, Marker } from 'react-native-maps';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { useSession } from 'contexts/sessionContext';
import { getCurrentFuels } from 'utils/FuelHelper';
import { StationModel } from 'hooks/station/types';
import { Location } from '../main';
import { getDistanceInKm } from 'utils/StationHelpers';

interface MapProps {
  stations: StationModel[];
  isLoadingStations: boolean;
  location: Location | null;
}

const Map: FC<MapProps> = ({ stations, isLoadingStations, location }) => {

  const { session } = useSession();

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
                            >
                            <Callout>
                                <Text>{station.name}</Text>
                                <Text>{`${getDistanceInKm(station.distanceToStation)} km`}</Text>
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
