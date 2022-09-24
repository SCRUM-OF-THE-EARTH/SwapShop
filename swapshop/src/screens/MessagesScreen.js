import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import colors from '../../config/colors';

import ChatScreen from './ChatScreen';

const Messages = [
  {
    id: '1',
    userName: 'Jane',
    userImg: require('../../assets/profile.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there!',
  },
  {
    id: '2',
    userName: 'John',
    userImg: require('../../assets/profile.jpg'),
    messageTime: '1 hour ago',
    messageText:
      'This is a test!',
  },
  {
    id: '3',
    userName: 'Val',
    userImg: require('../../assets/profile.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'I repeat, this is a test!',
  },
];

const MessagesScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('Chat', {screen: 'ChatScreen'})}>
              <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image style={styles.UserImg} source={item.userImg} />
                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>{item.userName}</Text>
                    <Text style={styles.PostTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.MessageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  Card: {
    width: "100%",
  },
  UserInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  UserInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  UserName: {
    fontSize: 14,
    fontWeight: "bold",
    //fontFamily: "Lato-Regular",
  },
  PostTime: {
    fontSize: 12,
    color: colors.black,
    //fontFamily: "Lato-Regular", 
  },
  MessageText: {
    fontSize: 14,
    color: colors.black_v2,
  },
});