import {StyleSheet, Switch, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import React, {useState, useContext} from 'react';
import {EventRegister} from 'react-native-event-listeners' ;
import themeContext from '../components/themeContext';
import Tab from '../components/Tab';
import theme from '../components/config/theme';


const SettingsScreen = ({ navigation }) => {
    const [mode, setMode] = useState(false);
    const toggleSwitch = (value) => { setMode(value);
        EventRegister.emit("changeTheme", value);
    };
    const theme = useContext(themeContext);
    
    return (
        <View style={{backgroundColor: theme.background, height: '100%'}}>
            <Text style={{fontSize:20, fontWeight: '600', paddingHorizontal: 15, color: theme.color}}>Theme:</Text>
            <View style={styles.themecontainer}>
                <Text style={[styles.text, {color: theme.color}]}>{mode ? "Dark mode" : "Light mode" }</Text>
                <Switch style = {styles.switch}
                        onValueChange={toggleSwitch}
                        value={mode}
            ></Switch>
            </View>

            <Tab nav={navigation} activeTab="settings"/>
            
        </View>)
}

const styles = StyleSheet.create({
    switch:{
        flex: 1   
    },
    text: {
        fontSize:15,
        fontWeight: '500',
        flex: 7
    },
    themecontainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 50,
        paddingVertical: 15,
        alignContent: 'center'
    }
})

export default SettingsScreen;