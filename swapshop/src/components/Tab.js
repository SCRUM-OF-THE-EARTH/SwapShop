import { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import themeContext from '../components/themeContext';

// the tab component is used to switch between pages in the app and is displayed at the bottom of the page
const Tab = ({nav, activeTab}) => {
    const theme = useContext(themeContext); // the theme 
    const navigation= nav; // the navigator use dto switc pages
    const aTab = activeTab; // the actuve tab corresponding the acative screen

    const windowWidth = Dimensions.get('window').width;

    // the tab GUI component
    return (
    <View style={[styles.container]}>
            <View style={[styles.back_Bar, { backgroundColor: theme.background }]}></View>
        <TouchableOpacity style={styles.sideTab} ><Icon color={aTab == 'settings' ? "#3CB371" : "#000000"} style={{}} name="settings-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab} onPress={() => navigation.navigate("MessageScreen")}><Icon color={aTab == 'chat' ? "#3CB371" : "#000000"} name="chatbubbles-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={[styles.mainTab,{borderColor: theme.background}]} onPress={() => navigation.navigate("addItemScreen", {item: null, heading: "Post an Item"})} ><Icon name="add-outline" color="white" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab} onPress={() => navigation.navigate("MainScreen")}><Icon color={aTab == 'home' ? "#3CB371" : "#000000"} name="home-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab} onPress={() => navigation.navigate("ProfileScreen")} ><Icon color={aTab == 'profile' ? "#3CB371" : "#000000"} name="person-circle-outline" size={windowWidth/12} title="" /></TouchableOpacity>
    </View>
    )
}


// styles for te tab
let styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection:'row', 
        width: '100%' ,
        height: 90,
        padding: 0,
        position:"absolute",
        top: "100%",
        transform: [{translateY: -90}],
    },
    sideTab: {
        flex:1,
        height: '50%',
        marginTop: 40,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainTab:{
        flex:1,
        borderRadius: 100,
        backgroundColor: '#3CB371',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 10,
        borderColor: 'white',
    },
    back_Bar: {
        backgroundColor: "white",
        height: 60,
        width: '100%',
        position: 'absolute',
        top: 30,
    }
})

export default Tab;