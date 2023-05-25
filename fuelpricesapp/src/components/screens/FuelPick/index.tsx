import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "navigation/navigation";
import { FC, useState } from "react";
import { Colors, Image, RadioButton, RadioGroup, Text, View } from "react-native-ui-lib";

export interface FuelPickParamList {

}

interface FuelPickProps {
    route: RouteProp<RootStackParamList, 'FuelPick'>;
    navigation: NavigationProp<RootStackParamList, 'FuelPick'>
}

const FuelPick: FC<FuelPickProps> = ({ navigation }) => {
    
    const [fuel, setFuel] = useState<number | null>(null);

    const fuelOnChange = (value: number) => {
        console.log(value);
        setFuel(value);
    }

    const submit = () => {
        navigation.navigate('Permission', {});
    }

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View center style={{ marginTop: 100}}>
                <Image cover source={{uri: 'https://cdn.bluenotion.nl/88b7c48b841b750c6d8465cfbc3863c417acb2040019e2caac976e9122d4c799.jpeg'}}/>
                <Text text75 center style={{marginTop: 20}}>Kies je gewenste brandstof. Deze kun je later nog altijd aanpassen</Text>
                <RadioGroup initialValue={fuel} onValueChange={fuelOnChange}>
                    <RadioButton value={0} label='Euro 95' containerStyle={[styles.radioButton, fuel === 0 && styles.selected]} />
                    <RadioButton value={1} label='Diesel' containerStyle={[styles.radioButton, fuel === 1 && styles.selected]} />
                </RadioGroup>
                <Button title="Volgende" onPress={submit} disabled={fuel == null}></Button>
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
        marginVertical: 10,
    },
    selected: {
        borderColor: Colors.red1
    }
})

export default FuelPick;