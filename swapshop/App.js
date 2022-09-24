import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';

const RootStack = createStackNavigator();

const App = () => {
  return(

    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown:false}}>
          <RootStack.Screen name = "MainScreen" component = {MainScreen}/>
          <RootStack.Screen name = "MessagesScreen" component = {MessagesScreen}/>
          <RootStack.Screen name = "ChatScreen" component = {ChatScreen}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;