import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Conversations from "../components/Conversations";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function MessagesScreen() {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["90%"];

  const handleClosePress = () => bottomSheetModalRef.current.close();

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.footerContainer}>
          <TextInput placeholder="Enter message..." />
          <TouchableOpacity>
            <Feather name="send" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <SafeAreaView>
      <BottomSheetModalProvider>
        <View style={styles.topBar}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={handlePresentModal}>
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 50 }}
              footerComponent={renderFooter}
            >
              <View
                style={{
                  width: "100%",
                  height: "5%",
                  marginTop: 15,
                  //borderWidth: 0.8,
                  //borderColor: "#C0C0C0",
                }}
              >
                <View style={styles.topBarSheet}>
                  <TouchableOpacity onPress={handleClosePress}>
                    <Feather
                      name="x"
                      size={30}
                      color="black"
                      style={{ marginLeft: 25 }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  >
                    New Message
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center", marginTop: 35 }}>
                <View style={styles.inputContactSheet}>
                  <Text style={{ marginRight: 5, fontSize: 16 }}>To:</Text>
                  <View style={styles.inputContactSheetBox}>
                    <TextInput
                      style={{
                        marginLeft: 12,
                      }}
                      placeholder="Search a contact..."
                    />
                  </View>
                  <TouchableOpacity>
                    <Feather
                      name="plus"
                      size={24}
                      color="black"
                      style={{ marginLeft: 3 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheetModal>
            <Image
              style={styles.searchBarImage}
              source={require("../assets/logo.png")}
            />
            <TouchableOpacity>
              <Feather name="search" size={20} color="black" />
            </TouchableOpacity>
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
      </BottomSheetModalProvider>
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
  topBarSheet: {
    flex: 1,
    width: "100%",
    //flexDirection: "row",
    //justifyContent: "flex-start",
    //alignItems: "center",
    //borderWidth: 0.8,
    //borderColor: "#C0C0C0",
    //borderRadius: 100,
  },
  inputContactSheet: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  inputContactSheetBox: {
    width: "80%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderRadius: 20,
    borderColor: "#C0C0C0",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
