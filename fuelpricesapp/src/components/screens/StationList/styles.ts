import { StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";

const styles = StyleSheet.create({
    filterButtonsContainer: {
        flexDirection: 'row',
        height: 48,
        marginTop: 10,
        justifyContent: 'space-around'
    },
    filterButton: {
        flex: 1,
        borderRadius: 5,
        borderColor: Colors.$backgroundPrimaryHeavy,
        backgroundColor: Colors.grey70,
        borderWidth: 2,
        marginHorizontal: 5
    },
    filterSelected: {
        backgroundColor: Colors.$backgroundPrimaryMedium
    }
});

export default styles;