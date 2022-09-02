import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Item_List } from '../classes/Item_List';
import { Trade_Item } from '../classes/Trade_Item';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-screens';
import { useIsFocused } from "@react-navigation/native";

export const trade_items_list = new Item_List("fetch-trade-items");
let displayItems = [];

// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{
    const isFocused = useIsFocused();
    const [email, setEmail] = useState('');
    const [displayItems, setDisplayItems] = useState('');

    useEffect(() => {
        console.log("making use of useEffect")
        trade_items_list.loadItems((item) => {
            return new Trade_Item(item);
        });
    }, [])

    useEffect(() => {
        setDisplayItems(LoadBlocks(''));
    }, [isFocused])

    let screen = (<View style={styles.container}>
        <Text>This is the main page</Text>
        <TextInput placeholder="serach" onChangeText={(searchTerm) => setDisplayItems(LoadBlocks(searchTerm))}/>
        <ScrollView>{displayItems}</ScrollView>
        <Button title='post a new item' onPress={() => navigation.navigate('addItemScreen')}/>
        </View>);

    return screen;
}

function LoadBlocks(searchTerm) {
    console.log(searchTerm);
    let Items = trade_items_list.searchItems(searchTerm);
    let tempArray = [];
    Items.forEach((item) => {
        tempArray.push(item.createItemBlock());
    });
    console.log(tempArray);
    return tempArray;
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default MainScreen;
