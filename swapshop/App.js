import { StyleSheet, Text, View } from 'react-native';

import Navigator from './src/screens/stackNavigator.js';

import LoginScreen from './src/screens/loginScreen.js';
import RegisterScreen from './src/screens/registerScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
