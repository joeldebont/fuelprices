import { StationModel } from "hooks/station/types";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Button, Colors, Image, ListItem, Text, View } from "react-native-ui-lib";
import { FC, useMemo, useState } from "react";
import { getCurrentFuel, getFuelPriceStrings } from "utils/FuelHelper";
import { useSession } from "contexts/sessionContext";
import { getDistanceInKm } from "utils/StationHelpers";
import { orderBy } from 'lodash-es';
import { FuelOrder } from "utils/constants/fuelConstants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./styles";

interface StationListProps {
    stations: StationModel[];
}

const StationList: FC<StationListProps> = ({ stations }) => {

    const session = useSession();

    const [fuelOrderBy, setFuelOrderBy] = useState<FuelOrder>(FuelOrder.PRICE);

    const stationsOrderd = useMemo(() => {
        let data = stations.filter((station) => getCurrentFuel(station.fuels, session.session!.fuel) != null);
        data = orderBy(data, (item) =>  fuelOrderBy == FuelOrder.DISTANCE ? item.distanceToStation : getCurrentFuel(item.fuels, session.session!.fuel)!.price);
        
        return data
    }, [stations, session, fuelOrderBy]);

    const renderListItem = (data: ListRenderItemInfo<StationModel>) => {

        const fuelPriceStrings = getFuelPriceStrings(getCurrentFuel(data.item.fuels, session.session!.fuel)!.price);

        return (
            <ListItem
                activeBackgroundColor={Colors.grey60}
                activeOpacity={0.4}
                height={77.5}
                style={{ borderColor: Colors.grey40, borderBottomWidth: StyleSheet.hairlineWidth}}
            >
                <ListItem.Part left>
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={{ uri: 'https://cdn.bluenotion.nl/fe2bae5a4d129aafae03246b7cf4ebf3856c10cb4b2105e7dd6270625c5aa4a7.png'}}
                    />
                </ListItem.Part>
                <ListItem.Part middle column containerStyle={{ paddingHorizontal: 17 }}>
                    <Text grey10 text70>
                        {data.item.name}
                    </Text>
                    <Text grey40>
                        {`${getDistanceInKm(data.item.distanceToStation)} km`}
                    </Text>
                </ListItem.Part>
                <ListItem.Part right>
                    <Text>
                        € {fuelPriceStrings[0]}
                    </Text>
                    <Text text100>
                        {fuelPriceStrings[1]}
                    </Text>
                </ListItem.Part>
            </ListItem>
        );
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={styles.filterButtonsContainer}>
                <Button 
                    onPress={() => setFuelOrderBy(FuelOrder.PRICE)}
                    style={[styles.filterButton, fuelOrderBy == FuelOrder.PRICE && styles.filterSelected]}
                >
                    <FontAwesome5
                        name="euro-sign"
                        size={25}
                        color={Colors.$backgroundPrimaryHeavy}
                        solid={fuelOrderBy == FuelOrder.PRICE}
                    />
                </Button>
                <Button
                    onPress={() => setFuelOrderBy(FuelOrder.DISTANCE)}
                    style={[styles.filterButton, fuelOrderBy == FuelOrder.DISTANCE && styles.filterSelected]}
                >
                    <FontAwesome5
                        name="ruler-horizontal"
                        size={30}
                        color={Colors.$backgroundPrimaryHeavy}
                    />
                </Button>
            </View>
            <FlatList
                style={{ marginTop: 20 }}
                data={stationsOrderd}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

export default StationList;