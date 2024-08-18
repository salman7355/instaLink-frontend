import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../context/Auth";
import { API_URL } from "@env";

const add = () => {
  const [caption, setCaption] = useState("");
  const [add, setAdd] = useState(false);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("post");
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log(user.id);
            console.log(caption);
            addPost();
          }}
          style={{
            backgroundColor: "#F62E8E",
            width: 70,
            height: 24,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            marginEnd: 24,
            marginTop: 30,
          }}
        >
          <Text>Publish</Text>
        </TouchableOpacity>
      ),
    });
  }, [caption, imageUrl]);

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

    const storageRef = ref(storage, "posts/" + Date.now());
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

  const addPost = async () => {
    const res = await fetch(`${API_URL}/posts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        caption: caption,
        imageurl: imageUrl,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
    } else {
      router.push("/(protected)/(tabs)");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181a1c",
        paddingHorizontal: 24,
        paddingTop: 50,
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            height: 32,
            width: 32,
            borderRadius: 32,
          }}
        >
          <Image
            source={require("../../../assets/images/Profile Photo2.png")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 32,
            }}
          />
        </View>
        <TextInput
          placeholder="What's in your mind?"
          placeholderTextColor="#727477"
          style={{
            color: "#727477",
            fontSize: 16,
            width: "85%",
          }}
          multiline
          onChangeText={setCaption}
        />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            setAdd(!add);
          }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 32,
            borderColor: "#323436",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add-sharp" size={16} color="white" />
        </Pressable>
        {add && (
          <View
            style={{
              width: 80,
              backgroundColor: "#323436",
              height: 32,
              borderRadius: 32,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="image-outline"
              size={20}
              color="white"
              onPress={pickImage}
            />
            <Feather name="camera" size={20} color="white" />
          </View>
        )}
      </View>

      {image && (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <View
            style={{
              height: 200,
              width: 300,
              borderRadius: 150,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          width: 163,
          backgroundColor: "transparent",
          borderRadius: 32,
          borderWidth: 2,
          borderColor: "#323436",
          bottom: 10,
          height: 32,
          gap: 4,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          left: "50%",
          marginLeft: -61,
        }}
      >
        <LinearGradient
          colors={
            selectedTab === "post"
              ? ["rgb(246, 46, 143)", "rgb(172, 26, 239)"]
              : ["transparent", "transparent"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: 68,
            height: 20,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            onPress={() => {
              setSelectedTab("post");
            }}
            style={{
              color: "white",
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            Post
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={
            selectedTab === "story"
              ? ["rgb(246, 46, 143)", "rgb(172, 26, 239)"]
              : ["transparent", "transparent"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: 68,
            height: 20,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            onPress={() => {
              setSelectedTab("story");
            }}
            style={{
              color: "white",
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            Story
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default add;
