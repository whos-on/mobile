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
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({ navigation }) => {
  const {isLoading, login} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner visible={isLoading} />
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
            onChangeText = {text => setEmail(text)}
            value = {email}
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
            onChangeText = {text => setPassword(text)}
            value = {password}
          />

          <CustomButton
            label={"Login"}
            onPress={() => {
              login(email, password);
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