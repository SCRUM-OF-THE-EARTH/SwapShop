import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from "react";
import { communicator } from './Communicator';

// Trade item is used to create and store items fetched from the database of trading items
// it has 5 parameters:
//  | item_name - the name of the item (string)
//  | item_value - the estimated value of the item (float)
//  | owner - the user account that posted the item (User_Account)
//  | item_description - the desiption provided to the trade item (string)
//  | id - the id of the trade item (integer)
export class Trade_Item {
    constructor(item, navigation) {
        this.item_name = item['item_name'];
        this.item_value = item['item_value'];
        this.owner = false;
        this.item_description = item['description'];
        this.id = item['id'];
        this.hasImages = false;
        this.navigation = navigation;
        this.exchangeItem = "";
        if (item['images']) {
            this.images = item['images'];
        } else {
            this.images = ['https://sudocode.co.za/SwapShop/assets/images/filler_image.jpg'];
        }
        
        this.date_created = item['date_created'];
        this.exchange = [];
        this.sold = item['sold'];

        this.tags = [];
        
    }

    async fetchImages() {
        if (!this.hasImages) {
            let temp = await communicator.makeRequestByCommand('fetch-trade-images', [this.id])
            if (temp.length > 0) {
                this.images = temp;
            }
        }

        return;
    }

    getImageSlideShow() {
        let imageSlideShow = [];

        this.images.forEach(image => {
            imageSlideShow.push({url: image});
        })
        return imageSlideShow;
    }
    // setName is used to set the item_name value 
    // it takes in a string 
    // and returns this 
    setName(name) {
        this.item_name = name;
        return this;
    }

    // getName is used to get the name of an item
    getName() {
        return this.item_name;
    }

    // setValue is used to set the value of the item
    // it takes in a float
    // and returns this
    setValue(value) {
        this.item_value = value;
        return this;
    }

    // getValue is used to get the flaot value of the item
    getValue() {
        return this.item_value;
    }

    // set id is used to set the id of the item
    // it takes in an integer
    // and returns this
    setID(id) {
        this.id = id;
        return this;
    }

    // getID is used to get the value of the ID (integer) for the item
    getID() {
        return this.id;
    }

    // setOwner is used to set the value of the items
    // it takes in a User_Account item
    // and returns this
    setOwner(owner) {
        this.owner = owner;
        return this;
    }

    // getOwner is used to get the value of the owner
    getOwner() {
        return this.owner;
    }

    // setDescription is used to set the value of the item's description
    // it takes in a string 
    // and returns this
    setDescription(desc) {
        this.item_description = desc;
        return this;
    }

    //getDescription is used to get the value of the description of the item
    getDescription() {
        return this.item_description;
    }

    // getExchageItem is used to get the item that the user wants in exchange for the item
    getExchange() {
        return this.exchange;
    }

    // setDateCreated is used to set the created date of the trade item
    // it takes in a string date
    // and returns this
    setDateCreated(date) {
        this.date_created = date;
        return this;
    }

    // getDateCreated method is used to retrieve the date of when the item was created
    // it takes in no parameters
    // and returns a string representing a date
    getDateCreated() {
        return this.date_created;
    }

    // compareTerm is used to comapre the item's name to some searchTerm 
    // it takes in a string
    // and returns true if the item contains thn the serachterm 
    // and false if the item does not contain the searchterm
    compareTerm(term) {
        term = term.toLowerCase();
        if (this.item_name.toLowerCase().includes(term)) {
            return true;
        }

        return false;
    }

    // addTag is used to add a tag to the list of tags acting on the trade item
    // it tkaes in a tag object 
    // and returns this
    addTag(tag) {
        this.tags.push(tag);
        return tag;
    }

    //getTag is used to retrieve the list of tags
    // it takes in no parameter
    // and returns a list of tags
    getTags() {
        return this.tags;
    }

    addExchangeTag(tag) {
        this.exchange.push(tag);
        return tag;
    }
    
    getExchangeTags() {
        return this.exchange;
    }

    setSold(sold) {
        this.sold = sold;
        return this;
    }

    getSold() {
        return this.sold;
    }

    getImages() {
        return this.images;
    }
}