import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Item_List } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';

const trade_items_list = new Item_List("fetch-trade-items");

// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log("making use of useEffect")
        trade_items_list.loadItems((item) => {
            console.log("hey look at you now passing functions as parameters")
            return new Trade_Item(item);
        })
    }, [])

    return(

        <View style={styles.container}>
            <Text>This is the main page</Text>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default MainScreen;
