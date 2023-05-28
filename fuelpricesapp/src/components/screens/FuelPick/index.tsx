import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "navigation/navigation";
import { FC, useCallback, useState } from "react";
import { Button, Colors, Image, RadioButton, RadioGroup, Text, View } from "react-native-ui-lib";
import { useSession } from "contexts/sessionContext";
import { Fuel } from "utils/constants/fuelConstants";

export interface FuelPickParamList {

}

interface FuelPickProps {
    route: RouteProp<RootStackParamList, 'FuelPick'>;
    navigation: NavigationProp<RootStackParamList, 'FuelPick'>
}

const FuelPick: FC<FuelPickProps> = ({ navigation }) => {

    const { setSessionFuel } = useSession();
    const [fuel, setFuel] = useState<Fuel | null>(null);

    const fuelOnChange = (value: Fuel) => {
        setFuel(value);
    }

    const submit = useCallback(() => {
        if(fuel == null) {
            return;
        }
        
        setSessionFuel(fuel);

        navigation.navigate('Permission', {});
    }, [fuel, setSessionFuel]);

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View center style={{ marginTop: 100}}>
                <Image cover source={{uri: 'https://cdn.bluenotion.nl/88b7c48b841b750c6d8465cfbc3863c417acb2040019e2caac976e9122d4c799.jpeg'}}/>
                <Text text75 center style={{marginTop: 20}}>Kies je gewenste brandstof. Deze kun je later nog altijd aanpassen</Text>
                <RadioGroup initialValue={fuel} onValueChange={fuelOnChange} style={{ marginTop: 20, width: '80%' }}>
                    <RadioButton value={Fuel.EURO95} label='Euro 95' containerStyle={[styles.radioButton, fuel === Fuel.EURO95 && styles.selected]} />
                    <RadioButton value={Fuel.DIESEL} label='Diesel' containerStyle={[styles.radioButton, fuel === Fuel.DIESEL && styles.selected]} />
                </RadioGroup>
            </View>
            <View>
                <Button label="Volgende" onPress={submit} disabled={fuel == null} style={{ marginTop: 30, width: '100%' }} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    radioButton: {
        borderColor: Colors.$outlinePrimary,
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginVertical: 5,
    },
    selected: {
        backgroundColor: Colors.$backgroundPrimaryMedium
    }
})

export default FuelPick;