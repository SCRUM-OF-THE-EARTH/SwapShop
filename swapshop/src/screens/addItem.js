import { Button, TextInput, View, StyleSheet, Text } from "react-native"
import {useState} from 'react'
import {login_user} from './SignInScreen.js';
import { trade_items_list } from "./MainScreen.js";
import { sin } from "react-native-reanimated";


const AddItem = ({navigation}) => {

    const [name, onNameChange] = useState('');
    const [description, onDescChange] = useState('');
    const [value, onValueChange] = useState('');
    const [errorMessage, onChangeError] = useState('');

    return(

        <View style={styles.container}>
            <Text style={styles.header}>Post a new Trade item</Text>
            <Text style={{color: 'red', textAlign:'center'}}>{errorMessage}</Text>
            <TextInput style={styles.TextInput} placeholder="name of item" onChangeText={(name)=>onNameChange(name)}/>
            <TextInput style={[styles.TextInput, {paddingVertical: 20}]} type="textarea" placeholder="description" multiline={true} onChangeText={(description)=>onDescChange(description)}/>
            <TextInput style={styles.TextInput} placeholder="estimate for value of item" onChangeText={(value)=>onValueChange(value)}/>
            
            <View style={styles.addItemBtn}>
                <Button title="save item" color='#2E8B57' onPress={() => AddNewItem(name, description, value, onChangeError, navigation)}/>
            </View>
        </View>
    )
}

function AddNewItem(name, description, value, setError, navigation) {
    if (name == "" || description == "" || value == "") {
        setError("Please fill in all the fields");
        return;
    }

    let owner_id = login_user.getID()
    console.log(name, description, value, owner_id);
    trade_items_list.addItem('add-trade-item', [name,description, value, owner_id]).then(res => {
        console.log(res);
        navigation.navigate('MainScreen')
    })
    
}
const styles = StyleSheet.create({
    container :{
        margin:20,
        marginVertical: 50,
        alignSelf:'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        fontWeight: '400',
        fontSize: 25,
        textAlign: 'center',
        color:'#3CB371'
    },
    TextInput:{
        padding: 5,
        color:"gray",
        alignSelf:'center',
        backgroundColor:"#F5F5F5",
        borderRadius:10,
        width:"90%",
        borderColor:'gray',
        borderWidth: 1,
        margin: 5,
      },

      addItemBtn:{
        width: "70%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        alignSelf: 'center',
        justifyContent:"center",
        marginTop:10,
        backgroundColor:"#2E8B57",
        margin: 2,
      },
});

export default AddItem;