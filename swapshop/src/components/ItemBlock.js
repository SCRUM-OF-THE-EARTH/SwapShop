import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';

export const ItemBlock = ({item}) => {
    const [images, setImages] = useState([item.images]);
    let exchangeTags = [];

        item.exchange.forEach(tag => {
            exchangeTags.push(
                <Text style={styles.exchange_tag} key={tag.getID()}>{tag.getName()}</Text>
            )
        })
        
        return (
            <TouchableOpacity key={item.id} style={styles.container} onPress={() => item.navigation.navigate("detailed_item", {item: item})}>
                <Text style={styles.header}>{item.item_name}</Text>
        
            <View style={styles.innerContainer}>
                
                <Image
                    style={{width:150, height: 150, borderRadius:10}}
                    source={{uri:item.images[0]}}   
                />
                
                <View style={{flexDirection:"column", flex:1,alignSelf: 'center'}}>
                    <Text style={[styles.wrappedText, {paddingVertical: 10, color: 'gray'}]}>{item.item_description}</Text>
                    <Text style={styles.wrappedText}>Estimated value: R{item.item_value}</Text>
                    <Text style={styles.wrappedText}>Item wanted:</Text>
                    <View style={styles.exchange_tag_container}>{exchangeTags}</View>
                    <Text style={[styles.wrappedText, styles.green]}>{item.owner.getFullName()}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({

    container: {
        borderRadius: 10,
        width: "100%",
        display: 'flex',
        padding: 5,
        backgroundColor: "#F5F5F5",
        marginVertical: 5,   
    },
    header: {
        fontSize: 25,
        fontWeight: '300',
        color: "#3CB371",
        paddingRight: 20,
        paddingLeft: 20,
    },
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        
    },
    wrappedText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 10
    },
    green: {
        color: "#3CB371",
    },
    exchange_tag_container: {
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    exchange_tag: {
        margin: 2,
        borderWidth: 1,
        borderColor: "#2E8B57",
        color: "#2E8B57",
        borderRadius: 10,
        paddingHorizontal: 10
    }
})