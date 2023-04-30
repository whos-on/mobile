import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";

const Conversations = () => {
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
          <Text style={styles.textName}>Carl Williams</Text>
          <Text style={styles.availableText}>Available</Text>
        </View>
        <View style={styles.blockBottomText}>
          <Text style={styles.lastSeenText}>
            Last seen 3m ago in Orlando, Fl
          </Text>
          <Text numberOfLines={1} style={styles.message}>
            "yeah have you seen that new movie with a bear in it? yeah have you
            seen that new movie with a bear in it?..."
          </Text>
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
