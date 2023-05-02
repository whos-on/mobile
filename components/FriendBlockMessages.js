import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { userToBgColor, getStatusMessage, getColorFromStatus } from "./utils";
import React from "react";

export default function FriendBlockMessages({
  firstName,
  lastName,
  status,
  lastUpdated,
}) {
  const statusColor = getColorFromStatus(status);
  const statusMessage = getStatusMessage(status, lastUpdated);
  return (
    <View style={styles.friendBlock}>
      <View style={styles.friendBlock1}>
        <Avatar
          size={64}
          title={firstName.substring(0, 1) + lastName.substring(0, 1)}
          containerStyle={{
            backgroundColor: userToBgColor({
              firstName: firstName,
              lastName: lastName,
            }),
          }}
          rounded
        />
      </View>

      <View style={styles.friendBlock2}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {firstName + " " + lastName}{" "}
        </Text>
        <Text style={{ color: statusColor, fontWeight: "bold" }}>
          {statusMessage}
        </Text>
      </View>

      <View style={styles.friendBlock3}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{ color: "#ff0000", fontWeight: "700", paddingLeft: 50 }}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendBlock: {
    flexDirection: "row",
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
    padding: 0,
    zIndex: 1,
  },
  friendBlock1: {
    //alignItems: "center",
    //justifyContent: "center",
    padding: 10,
    paddingLeft: 15,
    zIndex: 1,
  },
  friendBlock2: {
    //alignItems: "center",
    justifyContent: "center",
    padding: 10,
    zIndex: 1,
  },
  friendBlock3: {
    position: "absolute",
    right: 10,
    //alignItems: "center",
    justifyContent: "center",
    padding: 10,
    zIndex: 1,
  },
});
