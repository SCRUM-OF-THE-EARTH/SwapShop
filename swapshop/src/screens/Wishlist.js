import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import colors from '../config/colors';
export default function Wishlist() {
    return (
        <View style={styles.container}>
            <Text>Wishlist Page</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.extraColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
});