import { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { color, combineTransition } from 'react-native-reanimated';
import { login_user } from '../classes/User_Account';
import Icon from 'react-native-vector-icons/Ionicons';
import { communicator } from '../classes/Communicator';

//export const ownerID = 0;

const confirmSubmit = (item, navigation) => {
    Alert.alert(
        "Confirm delete",
        `Are you sure you want to delete item: \n ${item.getName()}`,
        [
            {            
                text: "cancel",
                onPress: () => console.log("cancel press"),
                style: "cancel"
            },
            {
                text: "confirm",
                onPress: async () => {
                    await communicator.makeRequestByCommand("delete-trade-item", [item.getID()]);
                    navigation.goBack();
                },
                
            }

        ]
    )
}

const Detailed_Trade_item = ({route, navigation}) => {

    // retrieve the item passed through the navigation
    const { item } = route.params;
    const { edit } = route.params

    let loaded = false;

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!loaded) {
            setImages(item.getImageSlideShow());
            loaded = true;
        }
    }, [loaded]);

    let exchangeTags = [];
    item.getExchange().forEach(tag => {
        exchangeTags.push(
            <Text style={styles.exchangeTag}>#{tag.getName()}</Text>
        )
    });

    let itemTags = [];
    item.getTags().forEach(tag => {
        itemTags.push(
            <Text style={styles.itemTag}>#{tag.getName()}</Text>  
        )
    })

    //ownerID = item.getOwner().getID();

    // render the item 
    return (
        <View>
            <View style={styles.container}>
            <View style={styles.imageWheel}>
            <Slideshow style={styles.images} dataSource={images}/>
            </View>
            
            <View style={styles.detailContainer}>

                <Text style={styles.nameTitle}>{item.getName()}</Text>
                <View style={styles.descContainer}>
                    <Text style={{color: "#1E5C3A", fontSize: 18, fontWeight:'400'}}>Description:</Text>
                    <Text style={styles.description}>{item.getDescription()}</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={{color: "#1E5C3A", fontSize: 18, fontWeight:'400'}}>Estimated value: </Text>
                    <Text style={styles.description}>R{item.getValue()}</Text>
                </View>

                <View style={styles.descContainer}>
                    <Text style={{color: "#1E5C3A", fontSize: 18, fontWeight:'400'}}>Tags for this item: </Text>
                    <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>{itemTags}</View>
                </View>

                <View style={styles.descContainer}>
                    <Text style={{color: "#1E5C3A", fontSize: 18, fontWeight:'400'}}>Item wanted in exchange: </Text>
                    <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>{exchangeTags}</View>
                </View>

                <View style={styles.descContainer}>
                    <Text style={{color: "#1E5C3A", fontSize: 18, fontWeight:'400'}}>Posted by: </Text>
                    <Text style={styles.description}>{item.getOwner().getFullName()}</Text>
                </View>
                
                { (item.getOwner().getID() == login_user.getID()) ? 
                    <View style={{display: 'flex',justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => console.log("edit pressed")}><Icon style={{padding: 10}} size={30} color="#3CB371" name="create-outline"></Icon></TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmSubmit(item, navigation)}><Icon style={{padding: 10}} size={30} color="#CA054D" name="trash-outline"></Icon></TouchableOpacity>
                    </View> 
                : 
                <Button 
                    color="#3CB371" 
                    title={"contact"}
                    onPress = {() => navigation.navigate('ChatScreen',{owner: item.getOwner()})}
                /> }
            </View>


        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
    },
    detailContainer: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 10,
    },
    descContainer: {
        padding: 5,
    },
    description: {
        fontSize: 18,
        fontWeight: '300',
        paddingHorizontal: 10,
    },
    nameTitle: {
        fontSize: 30,
        padding: 5,
        fontWeight: '400',
        color: "#3CB371",
        textAlign: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    },
    imageWheel: {
        paddingVertical: 5,
        borderRadius:5
    },
    header: {
        backgroundColor: "#3CB371", 
        height: '15%',
        width: '100%',
    },
    exchangeTag: {
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        // borderColor: "#85D6A9",
        // color: "#85D6A9",
        color: 'white',
        backgroundColor: "#ECA398"
    },

    itemTag: {
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        color: 'white',
        backgroundColor: "#A3E0BF"   
    }
});

export default Detailed_Trade_item;
