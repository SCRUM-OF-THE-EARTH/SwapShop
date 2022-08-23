import { StyleSheet, View, Text } from "react-native";

 export default function LoginScreen(){
    return(
        
    <View style={styles.container}>
        <Text>This is goinmg to be the Login screen</Text>
    </View>
    )
 }

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 100,
      backgroundColor: 'blue'
    },
  });