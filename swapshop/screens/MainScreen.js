import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';




// export default function forgotPasswordScreen() {

const MainScreen = ({navigation}) =>{

    const [email, setEmail] = useState('');

    return(

        <View style={styles.container}>
            <Text>This is the main page</Text>

            {/*<Button*/}
            {/*    title="Forgot pass?"*/}
            {/*    onPress={() => navigation.navigate('SignInScreen')}*/}

            {/*/>*/}
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default MainScreen;
