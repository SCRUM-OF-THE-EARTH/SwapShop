import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import themeContext from '../components/themeContext';
export const ItemBlock = ({item, navigation}) => {
    const [soldStatus, setSoldStatus] = useState(item.sold);
    const theme = useContext(themeContext);
    let exchangeTags = [];

        item.exchange.forEach(tag => {
            exchangeTags.push(
                <Text style={styles.exchange_tag} key={`${tag.getID()}-${item.id}-tag`}>{tag.getName()}</Text>
            )
        })
        
        return (
            <TouchableOpacity key={`${item.id}-touchable-container`} style={[styles.container, { backgroundColor: theme.inputColor }]} onPress={() => navigation.navigate("detailed_item", {item: item})}>
                <View key={`${item.id}-title_container`} style={[styles.title_container, { backgroundColor: theme.inputColor }]}>
                    <Text key={`${item.id}-header`} style={[styles.header, { color: theme.Itemdetails }]}>{item.item_name}</Text>
                    { soldStatus == 0 ? <Text key={`${item.id}-available-tag`} style={[styles.availability_tag, {borderColor: '#A3E0BF', color: '#A3E0BF'}]}>AVAILABLE</Text> : <Text key={`${item.id}-available-tag`} style={[styles.availability_tag,  {borderColor: 'gray', color: 'gray'}]}>SOLD</Text> }
                    
                </View>
            <View key={`${item.id}-inner-container`} style={styles.innerContainer}>
                
                <Image
                    key={`${item.id}-Image`}
                    style={{width:150, height: 150, borderRadius:10}}
                    source={{uri:item.images[0]}}   
                />
                
                <View key={`${item.id}-detail-container`} style={{flexDirection:"column", flex:1,alignSelf: 'center'}}>
                    <Text key={`${item.id}-description`}  style={[styles.wrappedText, {paddingVertical: 10, color: 'gray'}]}>{item.item_description}</Text>
                        <Text key={`${item.id}-value`} style={[styles.wrappedText, { color: theme.Itemdetails }]}>Estimated value: R{item.item_value}</Text>
                        <Text key={`${item.id}-wanted-title`} style={[styles.wrappedText, { color: theme.Itemdetails }]}>Item wanted:</Text>
                    <View key={`${item.id}-tag-container`} style={styles.exchange_tag_container}>{exchangeTags}</View>
                    <Text key={`${item.id}-owner`} style={[styles.wrappedText, styles.green]}>{item.owner.getFullName()}</Text>
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
    title_container: {
        display: 'flex',
        flexDirection:'row'
    },
    availability_tag: {
        justifyContent: 'center',
        borderRadius: 25, 
        borderWidth: 1,
        padding: 5,
        margin: 5,
        fontSize: 12, 
        fontWeight: '900',
        flex: 0.5,
        textAlign: 'center'
    },
    header: {
        fontSize: 25,
        fontWeight: '300',
        color: "#3CB371",
        paddingRight: 20,
        paddingLeft: 20,
        flex: 1.5
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