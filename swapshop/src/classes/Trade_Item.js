import {View, Text, Image} from 'react-native';
import React from "react";

export class Trade_Item {
    constructor(item) {
        console.log("new trade item has been created with:")
        console.log(item)
        this.item_name = item['item_name'];
        this.item_value = item['item_value'];
        this.owner_id = item['owner_id']
        this.item_description = item['description'];
        this.id = item['id'];

    }

    setName(name) {
        this.item_name = name;
        return this;
    }

    getName() {
        return this.item_name;
    }

    setValue(value) {
        this.item_value = value;
        return this;
    }

    getValue() {
        return this.item_value;
    }

    setID(id) {
        this.id = id;
        return this;
    }

    getID() {
        return this.id;
    }

    setOwnerID(owner) {
        this.owner_id = owner;
        return this;
    }

    getOwnerID() {
        return this.owner_id;
    }

    setDescription(desc) {
        this.item_description = desc;
        return this;
    }

    getDescription() {
        return this.item_description;
    }

    createItemBlock() {
        return (
            <View style={{borderColor:'#000000', borderWidth:1}}>
                <Text>Item Name: {this.item_name}</Text>
                <Image
                style={{width:100, height: 100, borderRadius:10}}
                    source={require("../../assets/filler_image.jpg")}   
                />
                <Text>Item Description: {this.item_description}</Text>
                <Text>Estimated value: {this.item_value}</Text>
            </View>
        );
    }

    compareTerm(term) {
        if (this.item_name.includes(term)) {
            return true;
        }

        return false;
    }

    // logItem() {
    //     console.group(`item ${this.id}`);
    //     console.log(`item Name: ${this.item_name}`);
    //     console.log(`Item estimated value: ${this.item_value}`);
    //     console.log(`item Owner:`)
    //     console.log(`owner id: ${this.owner_id}`);
    //     console.log(`Item description: ${this.item_description}`);
    //     console.groupEnd();
    // }


}