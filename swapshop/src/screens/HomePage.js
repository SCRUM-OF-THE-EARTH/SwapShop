import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from '../config/colors';


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <Image source={item.photo} style={{ width: 175, height: 150, borderRadius: 20 }} />
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 7 }}>{item.name}</Text>
                <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10 }}>{item.description}</Text>
                <Text style={{ fontWeight: "bold", marginTop: 5, fontSize: 17, marginLeft: 7 }}>{item.price}</Text>
            </View>
            <TouchableOpacity style={{ height: 150, width: 50, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="heart-outline" size={25} color={"#2E8B60"} />
                <Ionicons name="cart-outline" size={25} color={"#2E8B60"}></Ionicons>
            </TouchableOpacity>
        </View>
    );
}

export default class HomePage extends React.Component {
    state = {
        data: [
            {
                "name": "Vintage Bag",
                "price": "R 50",
                "description": "A beautiful vintage brown bag for ladies. In excelllent conditions.",
                "photo": require("../../assets/bag.jpg")
            },
            {
                "name": "Brown Couch",
                "price": "R 1000",
                "description": "Excellent and affordable three seat couch.",
                "photo": require("../../assets/couch.jpg")
            },
            {
                "name": "Bicycle",
                "price": "R 300",
                "description": "Bicycle suitable for teenagers and young adults!",
                "photo": require("../../assets/bicycle.jpg")
            },
            {
                "name": "Running Sneakers",
                "price": "R 100",
                "description": "Comfortable sneakers in good conditions",
                "photo": require("../../assets/sneakers.jpg")
            },
            {
                "name": "Marble Table",
                "price": "R 250",
                "description": "Clerical",
                "photo": require("../../assets/table.jpeg")
            },
            {
                "name": "Soldier Set Toys",
                "price": "R 25",
                "description": "Great toy set for children",
                "photo": require("../../assets/warriortoy.jpg")
            },
            {
                "name": "Set of Cups",
                "price": "R 50",
                "description": " 10 Affordable set of cups",
                "photo": require("../../assets/cups.jpg")
            },
            {
                "name": "Large Pot",
                "price": "R 50",
                "description": "Large size cooking pot (50cm diameter)",
                "photo": require("../../assets/pot.jpg")
            },
            {
                "name": "Toy House",
                "price": "R70",
                "description": "Amazing toy house for little girls",
                "photo": require("../../assets/toyhouse.jpg")
            },
            {
                "name": "Wrist watch",
                "price": "R60",
                "description": "Wrist wast suitable for men and women",
                "photo": require("../../assets/wristwatch.jpg")
            }
        ]
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.extraColor,

    },
    listItem: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#d4f3ee",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 10
    }
});
