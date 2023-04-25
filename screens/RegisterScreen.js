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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {isLoading, register, registerStatusColor, registerStatus} = useContext(AuthContext);
  const [textColor, setTextColor] = useState("white");
  const [errorMessage, setErrorMessage] = useState("");

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
            label={"First Name"}
            icon={
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText = {text => setFirstName(text)}
            value = {firstName}
          />
          <InputField
            label={"Last Name"}
            icon={
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            onChangeText = {text => setLastName(text)}
            value = {lastName}
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
            onChangeText = {text => setPassword(text)}
            value = {password}
          />

          <Text style={{ color: registerStatusColor, fontWeight: "700", paddingBottom: 20}}>
            {registerStatus}
          </Text>

          <CustomButton
            label={"Register"}
            onPress={() => {
              register(firstName, lastName, firstName + lastName, email, password)
            }}
          />

          

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={{ color: "#25D366", fontWeight: "700" }}>
              Log in to existing account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
