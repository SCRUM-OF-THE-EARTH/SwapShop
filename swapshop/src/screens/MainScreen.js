import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Item_List } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';

const trade_items_list = new Item_List();

// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');

    useEffect(() => {
        trade_items_list.fetchItems("fetch-trade-items",(item) => {
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
