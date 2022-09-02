import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomePage from "./HomePage";
import Cart from "./Cart";
import AccountPage from "./AccountPage";
import Wishlist from "./Wishlist";
import colors from "../config/colors";
import { StackNav } from "./StackNav";


const homePage = "HomePage";
const cart = "Cart";
const accountPage = "AccountPage";
const wishlist = "Wishlist";
const signIn = "Registry";
//const Stack = ""

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={signIn}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === signIn) {
                            iconName = focused ? "log-in" : "log-in-outline";
                        }
                        else if (rn === homePage) {
                            iconName = focused ? "home" : "home-outline";
                        }
                        else if (rn === wishlist) {
                            iconName = focused ? "heart" : "heart-outline";
                        } else if (rn === cart) {
                            iconName = focused ? "cart" : "cart-outline";
                        } else if (rn === accountPage) {
                            iconName = focused ? "person" : "person-outline";
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerStyle: { backgroundColor: colors.extraColor },
                    // headerShown: false,
                    tabBarStyle: { backgroundColor: colors.extraColor },
                    tabBarActiveTintColor: colors.primaryButton,
                    tabBarInactiveTintColor: colors.darkerColor,
                })}

            >

                <Tab.Screen name={homePage} component={HomePage} />
                <Tab.Screen name={signIn} component={StackNav} />
                <Tab.Screen name={wishlist} component={Wishlist} />
                <Tab.Screen name={cart} component={Cart} />
                <Tab.Screen name={accountPage} component={AccountPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d4f3ee",
        alignItems: "center",
        justifyContent: "center",
    },
});