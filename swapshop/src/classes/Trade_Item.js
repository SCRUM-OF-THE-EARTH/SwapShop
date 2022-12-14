import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from "react";
import { communicator } from './Communicator';
import themeContext from '../components/themeContext';
import { useEffect, useState, useContext } from 'react';
import theme from '../components/config/theme';
// Trade item is used to create and store items fetched from the database of trading items
// it has 5 parameters:
//  | item_name - the name of the item (string)
//  | item_value - the estimated value of the item (float)
//  | owner - the user account that posted the item (User_Account)
//  | item_description - the desiption provided to the trade item (string)
//  | id - the id of the trade item (integer)

//const theme = useContext(themeContext);
export class Trade_Item {
    
    constructor(item) {
        this.item_name = item['item_name'];
        this.item_value = item['item_value'];
        this.owner = false;
        this.item_description = item['description'];
        this.id = item['id'];
        this.images = ['https://sudocode.co.za/SwapShop/assets/images/filler_image.jpg'];
        if (item['images']) {
            this.images = item['images'];
        }
        
        this.date_created = item['date_created'];
        this.exchange = [];
        this.sold = item['sold'];

        this.tags = [];
        
    }

    // updateSoldStatus is used to upodate the sold status of the item for 1 to 0 or 0 to 1
    // it takes in a communicator and a status (1 ro 0)
    // and returns this object
    async updateSoldStatus(communicator, status) {
        await communicator.makeRequestByCommand("update-sold-status", [this.id, status])
        this.sold = status;
        return this; 
        
    }

    // getImageSlideshw is used to get the list of  images in a form that is suitable for the slideshow in react
    // it takes in nothing
    // and returns the list of images in slideshow form
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

    // addExchangeTag is used to add a tag to the list of item exchange tags
    addExchangeTag(tag) {
        this.exchange.push(tag);
        return tag;
    }
    
    // getExchangeTags is used to get a list of exchange tags
    getExchangeTags() {
        return this.exchange;
    }

    // setSold is used to set the sold status of the object
    setSold(sold) {
        this.sold = sold;
        return this;
    }

    // getSold is used to get the sold status of the object
    getSold() {
        return this.sold;
    }

    // getImages is used to get the raw list of images
    getImages() {
        return this.images;
    }
}