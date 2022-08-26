import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import SignInScreen from './screens/SignInScreen';

export default function App() {
  
  return <SignInScreen></SignInScreen>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
