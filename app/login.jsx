import { useAuth } from "@/context/Auth";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";

export default function login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        gap: 20,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          // marginTop: -50,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          𝕴𝖓𝖘𝖙𝖆𝕷𝖎𝖓𝖐
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          gap: 15,
        }}
      >
        <View
          style={{
            // marginTop: 20,
            height: 40,
            backgroundColor: "#323436",
            borderRadius: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            marginHorizontal: 24,
          }}
        >
          <TextInput
            placeholder="Username"
            onChangeText={setUsername}
            placeholderTextColor="#ECEBED"
            style={{
              color: "#ECEBED",
              fontSize: 14,
              // paddingLeft: 14,
            }}
          />
        </View>
        <View
          style={{
            // marginTop: 20,
            height: 40,
            backgroundColor: "#323436",
            borderRadius: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            marginHorizontal: 24,
          }}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ECEBED"
            style={{
              color: "#ECEBED",
              fontSize: 14,
              // paddingLeft: 14,
            }}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            width: "90%",
            height: 40,
          }}
        >
          <CustomButton text={"Log In"} action={signIn} />
        </View>
      </View>

      <View
        style={{
          borderTopColor: "#323436",
          borderTopWidth: 1,
          width: "100%",
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          padding: 30,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#ECEBED",
          }}
        >
          Don't have an account?{" "}
          <Text
            onPress={() => router.push("/register")}
            style={{
              color: "#f62e8e",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
