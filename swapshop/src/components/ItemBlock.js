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