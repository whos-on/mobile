import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { React, useContext, useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { userToBgColor, getStatusMessage, getColorFromStatus } from "./utils";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
//const baseURL = "https://api.whos-on.app/";
const baseURL = "http://localhost:3000/";

const Conversations = ({ chatID }) => {
  const [chatRoomRes, setChatRoomRes] = useState(null);

  useEffect(() => {
    const getChatInfo = (chatID) => {
      const input = {
        chatID: chatID,
      };
      axios
        .post(baseURL + "api/chat/info/", input)
        .then((res) => {
          let info = res.data;
          //let array = [...messagesInfo];
          //array[index] = info;
          setChatRoomRes(info);
          //setMessagesInfo(array);
          //console.log("we are getchatinfo");
          console.log("chat info " + info);
          //return info;
        })
        .catch((e) => {
          console.log(e.response.data);
          setIsLoading(false);
        });
    };

    getChatInfo({ chatID });
  }, []);

  return (
    <View style={styles.blockMain}>
      <Image
        style={styles.image}
        source={{
          uri: "https://lh3.google.com/u/0/ogw/AOLn63FO5Fmf1Bc9H1RUAA1tm5s_-FWAezfTxhNk97w=s32-c-mo",
        }}
      />

      <View style={styles.blockText}>
        <View style={styles.blockTopText}>
          <Text style={styles.textName}>
            {console.log(JSON.stringify(chatRoomRes))}
            {chatRoomRes.people[1].firstName +
              " " +
              chatRoomRes.people[1].lastName}
          </Text>
          <Text style={styles.availableText}>
            {chatRoomRes.people[1].stat.userStatus}
          </Text>
        </View>
        <View style={styles.blockBottomText}>
          <Text style={styles.lastSeenText}>
            Last seen 3m ago in Orlando, Fl
          </Text>
          <Text numberOfLines={1} style={styles.message}></Text>
        </View>
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
    width: "72%",
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
