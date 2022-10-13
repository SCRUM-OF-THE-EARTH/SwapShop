import { StyleSheet, Button, View, ImageBackground, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';


const Tab = ({nav, activeTab}) => {

    const navigation= nav;
    const aTab = activeTab;

    const windowWidth = Dimensions.get('window').width;

    return (
    <View style={styles.container}>
        <View style={styles.back_Bar}></View>
        <TouchableOpacity style={styles.sideTab} ><Icon color={aTab == 'settings' ? "#3CB371" : "#000000"} style={{}} name="settings-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab}><Icon color={aTab == 'chat' ? "#3CB371" : "#000000"} name="chatbubbles-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.mainTab} onPress={() => navigation.navigate("addItemScreen")} ><Icon name="add-outline" color="white" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab} onPress={() => navigation.navigate("MainScreen")}><Icon color={aTab == 'home' ? "#3CB371" : "#000000"} name="home-outline" size={windowWidth/12} title="" /></TouchableOpacity>
        <TouchableOpacity style={styles.sideTab}><Icon onPress={() => navigation.navigate("ProfileScreen")} color={aTab == 'profile' ? "#3CB371" : "#000000"} name="person-circle-outline" size={windowWidth/12} title="" /></TouchableOpacity>
    </View>
    )
}

let styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flex: 1,
        flexDirection:'row', 
        width: '100%' ,
        height: 90,
        padding: 0,
        position:"absolute",
        top: "100%",
        transform: [{translateY: -90}]
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
        // height: '100%',
        // marginHorizontal:5,
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
        top: 30
    }
})

export default Tab;