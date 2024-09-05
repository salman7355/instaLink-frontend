import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/Auth";
import { storage } from "../firebaseConfig";

const Picture = ({ picture, type }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [caption, setCaption] = useState("");
  // const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "posts/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progress" + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("file available at" + downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const addPost = async () => {
    const imageUrl = await uploadImage(picture);
    console.log("Posting now");
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/add`, {
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

  const addStory = async () => {
    const imageUrl = await uploadImage(picture);
    console.log("Posting now");
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/stories/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        story: imageUrl,
      }),
    });

    const data = await res.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      router.replace("/(protected)/(tabs)");
    }
  };

  // useEffect(() => {
  // uploadImage(picture);
  // }, []);

  // const handleUpload = async () => {
  //   const bool = await uploadImage(picture);
  //   if (bool) {
  //     console.log("Image uploaded successfully:", imageUrl);
  //     await addPost();
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          position: "absolute",
          width: "100%",
          zIndex: 100,
          top: 20,
        }}
      >
        <View>
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => {
              router.push("/(protected)/camera");
            }}
          />
        </View>
        <View>
          <MaterialIcons
            name="done"
            size={30}
            color="black"
            onPress={type === "post" ? addPost : addStory}
          />
        </View>
      </View>
      <Image
        source={{ uri: picture }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {type === "post" && (
        <View
          style={{
            backgroundColor: "black",
            opacity: 0.7,
            width: "100%",
            height: 35,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            transform: [{ translateY: -50 }],
          }}
        >
          <TextInput
            onChangeText={setCaption}
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
            }}
          />
        </View>
      )}
      {/* <TouchableOpacity
        onPress={addPost}
        style={{
          position: "absolute",
          bottom: 20,
          justifyContent: "center",
          alignItems: "center",
          right: 20,
          backgroundColor: "#F62E8E",
          borderRadius: 24,
          padding: 10,
          width: 200,
          //   height: 24,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Publish
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Picture;
