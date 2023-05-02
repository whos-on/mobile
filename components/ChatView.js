import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ChatView = (id) => {
  const baseURL = "http://localhost:3000/";
  const [chatInfo, setChatInfo] = useState(null);

  useEffect(() => {
    const getChatInfo = () => {
      const input = {
        chatID: id,
      };
      axios
        .post(baseURL + "api/chat/info/", input)
        .then((res) => {
          const info = res.data;
          setChatInfo(info);
          //let array = [...messagesInfo];
          //array[index] = info;
          //setMessagesInfo(array);
          //console.log("we are getchatinfo");
          //console.log("chat info " + info);
          //console.log("chat info " + typeof info);
          //return info;
        })
        .catch((e) => {
          console.log(e.response.data);
          setIsLoading(false);
        });
    };

    getChatInfo();
    console.log("Inside useEffect " + chatInfo);
  }, [setChatInfo]);
  return (
    <View>
      {chatInfo &&
        chatInfo.messages.map((item, i) => (
          <Text key={i}>{item.contents}</Text>
        ))}
      {/* <Text>ChatView</Text> */}
    </View>
  );
};

export default ChatView;

const styles = StyleSheet.create({});
