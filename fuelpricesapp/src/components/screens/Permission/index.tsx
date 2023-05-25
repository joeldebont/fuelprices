import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "navigation/navigation";
import { FC } from "react";
import { Image, Text, View } from "react-native-ui-lib";
import { Button } from 'react-native';
import { AskLocationPermission } from "utils/PermissionHelpers";

export interface PermissionParamList { }

interface PermissionProps {
    route: RouteProp<RootStackParamList, 'Permission'>;
    navigation: NavigationProp<RootStackParamList, 'Permission'>
}

const Permission: FC<PermissionProps> = ({ navigation }) => {
    
    const handleAskLocationPermission = async () => {
        console.log('askLocationPermission');
        const result = await AskLocationPermission();

        if(result) {
            navigation.navigate('Map', {});
        }
    };

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View center style={{ marginTop: 100}}>
                <Image cover source={{uri: 'https://cdn.bluenotion.nl/88b7c48b841b750c6d8465cfbc3863c417acb2040019e2caac976e9122d4c799.jpeg'}}/>
                <Text text75 center style={{marginTop: 20}}>Voor het vinden van de dichtbijzijnde tankstations hebben we je locatie nodig.</Text>
                <Button title="Geef toestemming" onPress={handleAskLocationPermission}></Button>
                <Button title="Verder gaan zonder locatie" onPress={() => navigation.navigate('Map', {})}></Button>
            </View>
        </SafeAreaView>
    )
};

export default Permission;