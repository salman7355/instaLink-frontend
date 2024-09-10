import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../../context/Auth";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function Layout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerContentContainerStyle: {
            backgroundColor: "#181a1c",
            flex: 1,
            paddingTop: 50,
          },
          drawerType: "slide",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Profile",
            drawerInactiveTintColor: "gray",
          }}
        />
        <Drawer.Screen
          name="edit"
          options={{
            title: "Edit Profile",
            drawerInactiveTintColor: "gray",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const CustomDrawerContent = (props) => {
  const { signout } = useAuth();

  const handleSignOut = () => {
    signout();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#181a1c" }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          marginTop: "auto",
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#323436",
        }}
      >
        <TouchableOpacity
          onPress={handleSignOut}
          style={{ alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#e74c3c",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
