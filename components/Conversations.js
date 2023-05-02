import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { React, useContext, useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { userToBgColor, getStatusMessage, getColorFromStatus } from "./utils";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
//const baseURL = "https://api.whos-on.app/";
const baseURL = "http://localhost:3000/";

const Conversations = ({ chatId }) => {
  const [chatRoomRes, setChatRoomRes] = useState(null);
  const [chat, setChat] = useState(chatId);
  //console.log("the chat id is... " + chat);

  useEffect(() => {
    const getChatInfo = () => {
      const input = {
        chatID: chat,
      };
      axios
        .post(baseURL + "api/chat/info/", input)
        .then((res) => {
          const info = res.data;
          setChatRoomRes(info);
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
    console.log("Inside useEffect " + chatRoomRes);
  }, []);

  return (
    <View style={styles.blockMain}>
      <Image
        style={styles.image}
        source={{
          uri: "https://lh3.google.com/u/0/ogw/AOLn63FO5Fmf1Bc9H1RUAA1tm5s_-FWAezfTxhNk97w=s32-c-mo",
        }}
      />
      {chatRoomRes && (
        <View style={styles.blockText}>
          <View style={styles.blockTopText}>
            {/* <View style={{ paddingRight: 100 }}> */}
            <Text style={styles.textName}>
              {chatRoomRes.people[1].firstName +
                " " +
                chatRoomRes.people[1].lastName}
            </Text>
            {/* </View> */}
          </View>

          <View style={styles.blockBottomText}>
            <Text numberOfLines={1} style={styles.message}>
              {chatRoomRes.messages == null
                ? "Click to add a message"
                : chatRoomRes.messages[chatRoomRes.messages.length - 1]
                    .contents}
            </Text>
          </View>
        </View>
      )}
      <View style={{ position: "absolute", right: 10 }}>
        <Ionicons name="ios-exit-outline" size={24} color="red" style={{}} />
      </View>
    </View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  blockMain: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
    //borderWidth: 0.8,
    //borderColor: "#C0C0C0",
    //borderRadius: 100,
    //alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 28,
    marginLeft: 20,
    //borderWidth: 2,
    //borderColor: "red",
  },
  blockText: {},
  blockTopText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 11,
    //borderWidth: 0.8,
    //borderColor: "#C0C0C0",
    //borderRadius: 100,
  },
  textName: {
    fontSize: 22,
    fontWeight: "600",
  },
  blockBottomText: {
    width: "73%",
    marginLeft: 11,
    //borderWidth: 0.8,
    //borderColor: "#C0C0C0",
    //borderRadius: 100,
  },
  availableText: {
    fontSize: 12,
    color: "#787276",
  },
  lastSeenText: {
    fontSize: 12,
    color: "#787276",
  },
  message: {
    fontSize: 12,
    color: "#787276",
    fontStyle: "italic",
  },
});
