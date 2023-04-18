import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [statusNum, setStatusNum] = useState(0);

  const childToParentEmail = (childDataEmail) => {
    setEmail(childDataEmail);
  };
  const childToParentPassword = (childDataPassword) => {
    setPassword(childDataPassword);
  };

  const fetchLogin = async (email, password) => {
    try {
      const response = await fetch("https://api.whos-on.app/api/user/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      //console.log(response.status);
      setStatusNum(response.status);
      const jsonData = await response.json();
      //console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      setData({});
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ marginBottom: 25 }}
            source={require("../assets/logo.png")}
          />

          <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="mail-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            childToParent={childToParentEmail}
          />
          <InputField
            label={"Password"}
            icon={
              <MaterialIcons
                name="vpn-key"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
            childToParent={childToParentPassword}
          />

          <CustomButton
            label={"Login"}
            onPress={() => {
              console.log("------------------------------------");
              console.log(email + " " + password);
              fetchLogin(email, password);
              console.log(statusNum);
              console.log(data);
              if (statusNum == 200) {
                login(data);
              } else {
                console.log("Something went wrong");
              }
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={{ color: "#25D366", fontWeight: "700" }}>
              Create new account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;