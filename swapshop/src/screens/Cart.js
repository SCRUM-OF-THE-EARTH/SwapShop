import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import colors from '../config/colors';
export default function Cart() {
    return (
        <View style={styles.container}>
            <Text>Cart Page</Text>
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