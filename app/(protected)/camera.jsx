import { View, Text, Alert, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Picture from "../../components/Picture";

const camera = () => {
  const { type } = useLocalSearchParams();
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const router = useRouter();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [cameraMode, setCameraMode] = useState("photo");
  const [picture, setPicture] = useState("");

  const getCameraPermission = async () => {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Camera permission is required to access this feature");
      //   console.log(cameraStatus);
    }
    // console.log(cameraStatus);
  };

  async function takePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response.uri);
    // console.log(response.uri);
  }

  useEffect(() => {
    getCameraPermission();
  }, []);

  if (picture) return <Picture picture={picture} type={type} />;
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        mode={cameraMode}
        style={{ flex: 1 }}
      >
        <Pressable
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: "#435266",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 50,
            right: 20,
          }}
          onPress={() => {
            if (facing === "back") {
              setFacing("front");
            } else {
              setFacing("back");
            }
          }}
        >
          <FontAwesome6 name="camera-rotate" size={24} color="black" />
        </Pressable>

        <TouchableOpacity
          onPress={takePicture}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: 5,
            // justifyContent: "flex-end",
            // alignSelf: "baseline",
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: [{ translateX: -50 }],
          }}
        ></TouchableOpacity>
      </CameraView>
    </View>
  );
};

export default camera;
