import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from "../../config/colors";

// create a chat screen UI
// so the user can be redirected to this page when, they choose the option to contact the client.
// this will make use of React-Native Gifted Chats (a builtin package which handles the components of the chat screen interface)
const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    setMessages([
      {
        // this is the receivers chat bubble
        _id: 1,
        text: "Copy that!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Test",
          avatar: require("../../assets/profile.jpg"),
        },
      },
      
      //this is the sender's chat bubble;
      {
        _id: 2,
        text: "This is a test!",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Test",
          avatar: require("../../assets/profile.jpg"),
        },
      },
    ]);
  }, []);

  // when the user types a message and presses send, the new message will appear, on the screen (under previous one)
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  // rendering the send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={40}
            color={colors.seaGreen}
          />
        </View>
      </Send>
    );
  };

  // render the chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.seaGreen,
          },
          left: {
            backgroundColor: colors.lightGray,
          }
        }}
        textStyle={{
          right: {
            color: colors.white,
          },
          left: {
            color: colors.black,
          }
        }}
      />
    );
  };

  // when messages have filled the screen and the user scrolls up, there is going to be an arrow that
  // when pressed will scroll back to the bottom (recent message)
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color={colors.black} />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});