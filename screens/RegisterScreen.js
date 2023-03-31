import React, { useState } from "react";
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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState({});
  const [statusNum, setStatusNum] = useState(0);

  const childToParentEmail = (childDataEmail) => {
    setEmail(childDataEmail);
  };
  const childToParentPassword = (childDataPassword) => {
    setPassword(childDataPassword);
  };
  const childToParentFirstName = (childDataFirstName) => {
    setFirstName(childDataFirstName);
  };
  const childToParentLastName = (childDataLastName) => {
    setLastName(childDataLastName);
  };

  const fetchRegister = async (
    email,
    password,
    username,
    firstName,
    lastName
  ) => {
    try {
      const responseReg = await fetch(
        "https://api.whos-on.app/api/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
            firstName: firstName,
            lastName: lastName,
          }),
        }
      );
      //console.log(responseReg.status);
      setStatusNum(responseReg.status);
      const jsonDataReg = await responseReg.json();
      //console.log(jsonDataReg);
      setData(jsonDataReg);
    } catch (error) {
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
            label={"First Name"}
            icon={
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            childToParent={childToParentFirstName}
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
            childToParent={childToParentLastName}
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
            childToParent={childToParentPassword}
          />

          <CustomButton
            label={"Register"}
            onPress={() => {
              console.log("------------------------------------");
              console.log(
                firstName + " " + lastName + " " + email + " " + password
              );
              fetchRegister(
                email,
                password,
                "" + firstName + lastName,
                firstName,
                lastName
              );
              console.log(statusNum);
              console.log(data);
              if (statusNum == 201) {
                navigation.navigate("HomeScreen");
              }
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
