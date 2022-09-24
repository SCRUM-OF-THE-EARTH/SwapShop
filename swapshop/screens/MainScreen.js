import { StatusBar } from "expo-status-bar";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class MainScreen extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}> SwapShop </Text>
                <StatusBar> style="auto"</StatusBar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    textAlignVertical: "top",
    fontSize: 20,
    fontWeight: "bold",
  },
});