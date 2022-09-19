import { View, Text,StyleSheet, Button } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { color } from 'react-native-reanimated';

const Detailed_Trade_item = ({route, navigation}) => {

    // retrieve the item passed through the navigation
    const { item } = route.params;

    // render the item 
    return (
        <View>
            <View style={styles.container}>
            <View style={styles.imageWheel}>
            <Slideshow style={styles.images} dataSource={[
                    {url: "https://sudocode.co.za/SwapShop/filler_image.jpg"},
                    {url: "https://sudocode.co.za/SwapShop/filler_image.jpg"}
                ]}/>
            </View>
            
            <View style={styles.detailContainer}>

                <Text style={styles.nameTitle}>{item.getName()}</Text>
                <View style={styles.descContainer}>
                    <Text style={{color: "#3CB371", fontSize: 18, fontWeight:'100'}}>Description:</Text>
                    <Text style={styles.description}>{item.getDescription()}</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={{color: "#3CB371", fontSize: 18, fontWeight:'100'}}>Estimated value: </Text>
                    <Text style={styles.description}>R{item.getValue()}</Text>
                </View>

                <View style={styles.descContainer}>
                    <Text style={{color: "#3CB371", fontSize: 18, fontWeight:'100'}}>Posted by: </Text>
                    <Text style={styles.description}>{item.getOwner().getFullName()}</Text>
                </View>
                

                <Button color="#2E8B57" title={"contact"}/>
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
    }
});

export default Detailed_Trade_item;
