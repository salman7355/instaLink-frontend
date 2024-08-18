import { Tabs, useRouter } from "expo-router";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 80, // Increase the height as desired
          paddingBottom: 10, // Adjust padding as needed
          paddingTop: 10, // Adjust padding as needed
          backgroundColor: "#000000", // Background color for the tab bar
          display: route.name === "add" ? "none" : "flex", // Hide tab bar on "Add" screen
        },
        tabBarShowLabel: false, // Hide tab labels
        headerShown: route.name === "add" ? true : false, // Show header only on "Add" screen
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <LinearGradient
              colors={["rgb(246, 46, 143)", "rgb(172, 26, 239)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "purple",
                borderRadius: 25,
              }}
            >
              <Ionicons name="add" size={24} color="white" />
            </LinearGradient>
          ),
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#181a1c", // Match the background color if needed
          },
          headerTitleContainerStyle: {
            paddingTop: 30, // Adds padding at the top of the header title
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/")} // Adjust the path to your home screen
              style={{
                paddingLeft: 24,
                paddingTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#2E8AF6",
                }}
              >
                Discard
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "alert",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
