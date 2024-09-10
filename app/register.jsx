import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import { useAuth } from "../context/Auth";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const register = () => {
  const [Username, setUsername] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Mobile, setMobile] = useState("");
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageurl, setImageUrl] = useState(null);
  const { register } = useAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "users/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress" + progress + "% done");
      },
      (error) => {
        // error handling
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("file availabe at" + downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        gap: 10,
      }}
    >
      <View
        style={{
          marginTop: 100,
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
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
          <Text
            style={{
              color: "#727477",
              fontSize: 12,
            }}
          >
            Create An Account and Sign Up
          </Text>
        </View>
        <Pressable
          onPress={pickImage}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image === null ? (
            <Feather name="camera" size={24} color="black" />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 50 }}
            />
          )}
        </Pressable>
      </View>

      <View style={{ gap: 10, paddingHorizontal: 24 }}>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              color: "#ccc",
            }}
          >
            UserName
          </Text>
          <TextInput
            style={{
              backgroundColor: "#c2c3c5",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>

        <View style={{ gap: 5 }}>
          <Text
            style={{
              color: "#ccc",
            }}
          >
            Date of Birth
          </Text>
          <TextInput
            style={{
              backgroundColor: "#c2c3c5",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="DD/MM/YYYY"
            onChangeText={setDateOfBirth}
          />
        </View>

        <View style={{ gap: 5 }}>
          <Text
            style={{
              color: "#ccc",
            }}
          >
            Mobile
          </Text>
          <TextInput
            style={{
              backgroundColor: "#c2c3c5",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="01XXXXXXXXX"
            onChangeText={setMobile}
          />
        </View>

        <View style={{ gap: 5 }}>
          <Text
            style={{
              color: "#ccc",
            }}
          >
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: "#c2c3c5",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              color: "#ccc",
            }}
          >
            Password
          </Text>
          <TextInput
            style={{
              backgroundColor: "#c2c3c5",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View
        style={{
          gap: 10,
          marginTop: 30,
        }}
      >
        <View
          style={{
            width: "90%",
            height: 40,
            marginHorizontal: 24,
          }}
        >
          <CustomButton
            text={"Create an Account"}
            action={() => {
              register(
                Username,
                Email,
                Password,
                imageurl,
                DateOfBirth,
                Mobile
              );
            }}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#ECEBED",
          }}
        >
          Already have an account?{" "}
          <Text
            onPress={() => router.push("/login")}
            style={{
              color: "#f62e8e",
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default register;
