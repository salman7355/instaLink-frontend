import { Redirect, Slot, Stack, Tabs, useRouter } from "expo-router";
import { useAuth } from "../../context/Auth";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          title: "Post",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 100,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/(tabs)");
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
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          title: "",
          // headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 50,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="searchProfile/[id]"
        options={{
          title: "",
          // headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 50,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/");
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
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Messages",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
            // backgroundColor: "white",
            // height: 100,
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/");
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
              <Ionicons name="arrow-back-outline" size={16} color="white" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
