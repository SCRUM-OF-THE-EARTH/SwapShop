import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Item_List } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';

export const trade_items_list = new Item_List("fetch-trade-items");
let displayItems = [];

// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');
    const [displayItems, setDisplayItems] = useState([]);

    useEffect(() => {
        console.log("making use of useEffect")
        trade_items_list.loadItems((item) => {
            return new Trade_Item(item);
        })

        let items = trade_items_list.getItems();
        let tempArray = [];
        items.forEach((item) => {
            tempArray.push(item.createItemBlock())
        });

        setDisplayItems(tempArray);
    }, [])

    let screen = (<View style={styles.container}>
        <Text>This is the main page</Text>
        {displayItems}
        <Button title='post a new item' onPress={() => navigation.navigate('addItemScreen')}/>
        </View>);

    console.log(screen)
    return screen;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default MainScreen;
