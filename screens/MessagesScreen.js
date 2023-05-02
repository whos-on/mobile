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
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Conversations from "../components/Conversations";
//import ConversationBlock from "../components/ConversationBlock";
import ChatView from "../components/ChatView";
import { Link } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import FriendBlockBottomSheet from "../components/FriendBlockBottomSheet";

export default function MessagesScreen() {
  const {
    isLoading,
    register,
    registerStatusColor,
    registerStatus,
    messagesInfo,
    getChatInfo,
    chatInfo,
    friendInfo,
    searchInfo,
    search,
    userInfo,
  } = useContext(AuthContext);

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [chatID, setChatID] = useState(null);
  const [chatIndex, setChatIndex] = useState(null);

  const snapPoints = ["90%"];

  const handleClosePress = () => bottomSheetModalRef.current.close();

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const handleClosePress2 = () => bottomSheetModalRef2.current.close();

  function handlePresentModal2() {
    bottomSheetModalRef2.current?.present();
  }

  const handleClosePress3 = () => bottomSheetModalRef3.current.close();

  function handlePresentModal3() {
    bottomSheetModalRef3.current?.present();
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
                      onChangeText={(text) => {
                        setSearchValue(text);
                        search(userInfo.id, text);
                      }}
                      value={searchValue}
                    />
                  </View>
                  <TouchableOpacity onPress={handlePresentModal2}>
                    <Feather
                      name="plus"
                      size={24}
                      color="black"
                      style={{ marginLeft: 3 }}
                    />
                  </TouchableOpacity>
                  <BottomSheetModal
                    ref={bottomSheetModalRef2}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
                  >
                    <View style={styles.sheet2Header}>
                      <MaterialIcons
                        name="cancel"
                        size={30}
                        color="black"
                        style={styles.sheet2HeaderLeft}
                      />
                      <Text style={styles.sheet2HeaderText}>Group Message</Text>
                      <Feather
                        name="check-square"
                        size={30}
                        color="black"
                        style={styles.sheet2HeaderRight}
                      />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 12 }}>
                      <View style={styles.sheet2SearchBar}>
                        <Feather name="search" size={20} color="black" />
                        <TextInput
                          placeholder="Search contacts..."
                          style={{ marginLeft: 10 }}
                        />
                      </View>
                    </View>
                  </BottomSheetModal>
                </View>
              </View>
              {friendInfo == null || friendInfo.length == 0 ? (
                <View style={{ alignItems: "center", paddingTop: 20 }}>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    Go to Friends Page to start adding friends!
                  </Text>
                </View>
              ) : searchValue.length == 0 ? (
                friendInfo.map((item, i) => (
                  <FriendBlockBottomSheet
                    firstName={item.firstName}
                    lastName={item.lastName}
                    status={item.stat.userStatus}
                    key={i}
                    lastUpdated={item.stat.lastUpdated}
                  />
                ))
              ) : searchInfo != null && searchInfo.length != 0 ? (
                searchInfo.map((item, i) => (
                  <FriendBlockBottomSheet
                    firstName={item.firstName}
                    lastName={item.lastName}
                    status={item.stat.userStatus}
                    key={i}
                    lastUpdated={item.stat.lastUpdated}
                  />
                ))
              ) : (
                <View style={{ alignItems: "center", paddingTop: 20 }}>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    No friends with that name! Use the Add Friend Button to add
                    this username.
                  </Text>
                </View>
              )}
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

        <ScrollView style={styles.scrollView}>
          {messagesInfo.map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                handlePresentModal3();
                setChatIndex(i);
                setChatID(getChatInfo(item));
                console.log(chatID);
              }}
              key={i}
            >
              <Conversations chatId={item} />
            </TouchableOpacity>
          ))}
          <BottomSheetModal
            ref={bottomSheetModalRef3}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
          >
            {}
          </BottomSheetModal>

          {/* <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} />
          <Conversations chatId={"64509922b5c01b11db82eeef"} /> */}
        </ScrollView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    marginTop: 14,
    marginBottom: 25,
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
    marginBottom: 70,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheet2Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    //borderWidth: 0.8,
    //borderColor: "#C0C0C0",
  },
  sheet2HeaderLeft: { marginLeft: 15 },
  sheet2HeaderText: { fontSize: 28, fontWeight: 600 },
  sheet2HeaderRight: { marginRight: 18 },
  sheet2SearchBar: {
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    width: "95%",
    height: 48,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 75,
  },
  scrollView: {
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
    width: "100%",
    height: "100%",
  },
});
