import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FC } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { RootStackParamList } from "navigation/navigation";

export interface WelcomeParamList {

}

interface WelcomeProps {
    route: RouteProp<RootStackParamList, 'Welcome'>;
    navigation: NavigationProp<RootStackParamList, 'Welcome'>
}

const Welcome: FC<WelcomeProps> = ({ navigation }) => {
    
    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View center style={{ marginTop: 100}}>
                <Image cover source={{uri: 'https://cdn.bluenotion.nl/88b7c48b841b750c6d8465cfbc3863c417acb2040019e2caac976e9122d4c799.jpeg'}}/>
                <Text text40 style={{marginTop: 40}}>Welkom bij FuelPrices</Text>
                <Text text75 center style={{marginTop: 20}}>Vind de goedkoopste tankstation bij jou in de buurt!</Text>
                <Button title="Beginnen" onPress={() => navigation.navigate('FuelPick', {})}></Button>
            </View>
        </SafeAreaView>
    )
};

export default Welcome;