import { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Button } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native';

//export const ownerID = 0;

const Detailed_Trade_item = ({route, navigation}) => {

    // retrieve the item passed through the navigation
    const { item } = route.params;
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
                
                <Button 
                    color="#3CB371" 
                    title={"contact"}
                    onPress = {() => navigation.navigate('ChatScreen',{owner: item.getOwner()})}
                />
            </View>


        </View>
        </ScrollView>
        
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
