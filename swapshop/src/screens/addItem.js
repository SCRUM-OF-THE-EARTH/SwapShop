import { Button, TextInput, View } from "react-native"
import {useState} from 'react'
import {login_user} from './SignInScreen.js';
import { trade_items_list } from "./MainScreen.js";


const AddItem = ({navigation}) => {

    const [name, onNameChange] = useState('');
    const [description, onDescChange] = useState('');
    const [value, onValueChange] = useState('');

    return(

        <View>
            <TextInput placeholder="name of item" onChangeText={(name)=>onNameChange(name)}/>
            <TextInput type="textarea" placeholder="description" onChangeText={(description)=>onDescChange(description)}/>
            <TextInput placeholder="estimate for value of item" onChangeText={(value)=>onValueChange(value)}/>
            <Button title="save item" onPress={() => AddNewItem(name, description, value)}/>
        </View>
    )
}

function AddNewItem(name, description, value) {
    let owner_id = login_user.getID()
    console.log(name, description, value, owner_id);
    trade_items_list.addItem('add-trade-item', [name,description, value, owner_id]).then(res => {
        trade_items_list.logItems();
    })
    
}

export default AddItem;