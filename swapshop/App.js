import { StyleSheet, View } from 'react-native';
import RegisterScreen from './src/screens/registerScreen.js';
import LoginScreen from './src/screens/loginScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
