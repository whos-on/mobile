import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Conversations from "../components/Conversations";

export default function MessagesScreen() {
  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <View style={styles.bar}>
          <Feather name="plus" size={20} color="black" />
          <Image
            style={styles.searchBarImage}
            source={require("../assets/logo.png")}
          />
          <Feather name="search" size={20} color="black" />
        </View>
      </View>
      <ScrollView>
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    marginTop: 14,
    marginBottom: 5,
  },
  bar: {
    width: 362,
    height: 48,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    borderRadius: 100,
  },
  searchBarImage: {
    width: 132,
    height: 20,
  },
});
