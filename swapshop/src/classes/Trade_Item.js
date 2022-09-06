import {View, Text, Image, StyleSheet} from 'react-native';
import React from "react";

export class Trade_Item {
    constructor(item) {
        console.log("new trade item has been created with:")
        console.log(item)
        this.item_name = item['item_name'];
        this.item_value = item['item_value'];
        this.owner = false;
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

    setOwner(owner) {
        this.owner = owner;
        return this;
    }

    getOwner() {
        return this.owner;
    }

    setDescription(desc) {
        this.item_description = desc;
        return this;
    }

    getDescription() {
        return this.item_description;
    }

    createItemBlock() {
        console.log(this.owner);
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.item_name}</Text>
            <View style={styles.innerContainer}>
                <Image
                style={{width:150, height: 150, borderRadius:10}}
                    source={require("../../assets/filler_image.jpg")}   
                />
                <View style={{flexDirection:"column", flex:1,alignSelf: 'center'}}>
                    <Text style={[styles.wrappedText, {paddingVertical: 10, color: 'gray'}]}>{this.item_description}</Text>
                    <Text style={styles.wrappedText}>Estimated value: R{this.item_value}</Text>
                    <Text style={[styles.wrappedText, styles.green]}>{this.owner.getFullName()}</Text>
                </View>
            </View>
            </View>
        );
    }

    compareTerm(term) {
        term = term.toLowerCase();
        if (this.item_name.toLowerCase().includes(term)) {
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

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: "100%",
        display: 'flex',
        padding: 5,
        backgroundColor: "#F5F5F5",
        marginVertical: 5,
        // shadowColor: "#171717",
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3
    },
    header: {
        fontSize: 25,
        fontWeight: '300',
        // fontWeight: 500,
        color: "#3CB371",
        paddingRight: 20,
        paddingLeft: 20,
    },
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        
    },
    wrappedText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 10
    },
    green: {
        color: "#3CB371",
    }
})