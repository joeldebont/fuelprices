import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "navigation/navigation";
import { FC } from "react";
import { Button, Colors, Image, Text, View } from "react-native-ui-lib";
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
            navigation.navigate('Main', {});
        }
    };

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <View center style={{ marginTop: 100}}>
                <Image cover source={{uri: 'https://cdn.bluenotion.nl/88b7c48b841b750c6d8465cfbc3863c417acb2040019e2caac976e9122d4c799.jpeg'}}/>
                <Text text75 center style={{marginTop: 20}}>Voor het vinden van de dichtbijzijnde tankstations hebben we je locatie nodig.</Text>
                <Button label="Geef toestemming" onPress={handleAskLocationPermission} style={{ marginTop: 40, width: '100%' }} />
                <Button label="Verder gaan zonder locatie" color={Colors.$textNeutral} backgroundColor={Colors.white} onPress={() => navigation.navigate('Main', {})} style={{ marginTop: 5, width: '100%' }} />
            </View>
        </SafeAreaView>
    )
};

export default Permission;