import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "../../../../context/Auth";
import CustomButton from "../../../../components/CustomButton";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const edit = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleEmptyValues = (inputValue) => {
    const value = inputValue.trim();
    if (value.length > 0) {
      return value;
    }
    return false;
  };

  const handleUpdate = async () => {
    try {
      const nameValue = handleEmptyValues(name);
      const emailValue = handleEmptyValues(email);
      const mobileValue = handleEmptyValues(mobile);
      const passwordValue = handleEmptyValues(password);

      if (!nameValue && !emailValue && !mobileValue && !passwordValue) {
        console.log("Empty values");
        Alert.alert("Empty values", "Please fill your desired values");
        return;
      }
      // console.log("not empty");

      const data = {
        username: nameValue,
        email: emailValue,
        mobile: mobileValue,
        password: passwordValue,
      };

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.error) {
        Alert.alert("Error", "Failed to update account");
      } else {
        Alert.alert("Success", "Account updated successfully");
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            auth: true,
            ...result,
          })
        );
        router.push("/(protected)/(tabs)/profile");
      }
    } catch (error) {
      console.log(`Error in update: ${error}`);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        paddingHorizontal: 24,
        paddingTop: 60,
        gap: 5,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            // marginTop: 20,
          }}
        >
          Account Setting
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          gap: 20,
          flex: 1,
        }}
      >
        {/* profile info */}
        <View style={{ marginTop: 20, gap: 20 }}>
          <View>
            <Text
              style={{ fontSize: 16, color: "white", fontWeight: "semibold" }}
            >
              Profile Info
            </Text>
          </View>
          <View
            style={{
              gap: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                paddingLeft: 10,
                borderColor: "#454545",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="email" size={20} color="#454545" />
              <TextInput
                placeholder="Username"
                style={{
                  backgroundColor: "transparent",
                  color: "#454545",
                }}
                onChangeText={setName}
                placeholderTextColor={"#454545"}
              />
            </View>
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                paddingLeft: 10,
                borderColor: "#454545",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Fontisto name="email" size={20} color="#454545" />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#454545"}
                style={{
                  backgroundColor: "transparent",
                  color: "#454545",
                }}
                onChangeText={setEmail}
              />
            </View>
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                paddingLeft: 10,
                borderColor: "#454545",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome name="phone" size={24} color="#454545" />
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor={"#454545"}
                style={{
                  backgroundColor: "transparent",
                  color: "#454545",
                }}
                onChangeText={setMobile}
              />
            </View>
          </View>
        </View>
        {/* password */}
        <View style={{ marginTop: 40, gap: 20 }}>
          <View>
            <Text
              style={{ fontSize: 16, color: "white", fontWeight: "semibold" }}
            >
              Security
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 10,
              padding: 10,
              paddingLeft: 10,
              borderColor: "#454545",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Entypo name="lock" size={24} color="#454545" />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#454545"}
              style={{
                backgroundColor: "transparent",
                color: "#454545",
              }}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 40,
            marginTop: 40,
          }}
        >
          <CustomButton text={"Update"} action={handleUpdate} />
        </View>
      </View>
    </View>
  );
};

export default edit;
