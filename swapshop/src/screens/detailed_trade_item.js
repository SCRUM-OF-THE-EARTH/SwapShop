import { useState, useEffect, useContext} from 'react';
import { View, Text,StyleSheet, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { login_user, communicator } from '../helpers/init';
import Icon from 'react-native-vector-icons/Ionicons';
import themeContext from '../components/themeContext';

//export const ownerID = 0;



const confirmSubmit = (item, navigation) => {
    Alert.alert(
        "Confirm delete",
        `Are you sure you want to delete item: \n ${item.getName()}`,
        [
            {            
                text: "cancel",
                style: "cancel"
            },
            {
                text: "confirm",
                onPress: async () => {
                    await communicator.makeRequestByCommand("delete-trade-item", [item.getID()]);
                    let canGoBack = navigation.canGoBack();
                    if (canGoBack) {
                        navigation.goBack();
                    } else {
                        navigation.navigate("MainScreen")
                    }
                    
                },
                
            }

        ]
    )
}

const Detailed_Trade_item = ({route, navigation}) => {

    // retrieve the item passed through the navigation
    const { item } = route.params;

    const [soldStatus, setSoldStatus] = useState(item.sold);

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
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.imageWheel}>
            <Slideshow style={styles.images} dataSource={images}/>
            </View>
            
            <View style={styles.detailContainer}>

                <View style={styles.title_container}>
                    <Text style={styles.nameTitle}>{item.getName()}</Text>
                    { soldStatus == 0 ? <Text style={[styles.availability_tag, {borderColor: '#A3E0BF', color: '#A3E0BF'}]}>AVAILABLE</Text> : <Text style={[styles.availability_tag,  {borderColor: 'gray', color: 'gray'}]}>SOLD</Text> }
                    
                </View>

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
                    null 
                : 
                <Button 
                    color="#3CB371" 
                    title={"contact"}
                    onPress = {() => navigation.navigate('ChatScreen',{owner: item.getOwner()})}
                /> }
            </View>


        </View>

        { (item.getOwner().getID() == login_user.getID()) ? 
                    <View style={styles.button_container}>
                        <TouchableOpacity style={[styles.center_icon, styles.icon_button]} onPress={() => {
                            if (soldStatus == 1) {
                                item.updateSoldStatus(communicator, '0').then(() => {
                                    setSoldStatus(0);
                                })
                                
                            } else {
                                item.updateSoldStatus(communicator, '1').then(() => {
                                    setSoldStatus(1);
                                });
                            }
                        }}>
                            <Icon color="#044B7F" style={{padding:10}} size={30} name={soldStatus == 0 ? "square-outline" : "checkbox-outline" }></Icon>
                            <Text style={[styles.button_text, {color: "#044B7F"}]}>{soldStatus == 0 ? "Mark as sold" : "Mark as available"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center_icon, styles.icon_button]} onPress={() => {
                            navigation.navigate("addItemScreen", {item: item})}
                        }
                        >
                            <Icon style={{padding: 10}} size={30} color="#3CB371" name="create-outline"></Icon>
                            <Text style={[styles.button_text, {color: "#3CB371"}]}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center_icon, styles.icon_button]} onPress={() => confirmSubmit(item, navigation)}>
                            <Icon style={{padding: 10}} size={30} color="#CA054D" name="trash-outline"></Icon>
                            <Text style={[styles.button_text, {color: "#CA054D"}]}>Delete</Text>
                        </TouchableOpacity>
                    </View> 
                : null }
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    center_icon: {
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    }, 
    icon_button: {
        flex: 1,
        marginHorizontal: 10,
    }, 
    button_container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row', 
        textAlign: 'center', 
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        width:"100%",
        padding: 5,
        alignSelf: 'center'
    },
    button_text: {
        textAlign: "center",
        fontSize: 12.5,
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
        flex: 1.5
    },
    availability_tag: {
        justifyContent: 'center',
        borderRadius: 25, 
        borderWidth: 1,
        padding: 10,
        margin: 10,
        fontSize: 12, 
        fontWeight: '900',
        flex: 0.5,
        textAlign: 'center'
    },
    title_container: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection:'row'
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
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
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
