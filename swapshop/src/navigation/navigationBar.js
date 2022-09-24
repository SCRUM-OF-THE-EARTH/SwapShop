import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../config/colors";

import MessagesScreen from "../screens/MessagesScreen";
import MainScreen from "../screens/MainScreen";

import { StackNavigation } from "../navigation/stackNavigation";

const Message = "Messages";
//const Chat = "Chats";
const Main = "Main";

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName={Main}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === Main) {
                            iconName = focused ? "home" : "home-outline";
                        }
                        else if (rn === Message) {
                            iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerStyle: { backgroundColor: colors.white },
                    headerShown: false,
                    tabBarStyle: { backgroundColor: colors.white },
                    tabBarActiveTintColor: colors.seaGreen,
                    tabBarInactiveTintColor: colors.mediumSeaGreen,
                })}
            >
                <Tab.Screen name={Main} component={StackNavigation} />
                <Tab.Screen name={Message} component={MessagesScreen} />
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