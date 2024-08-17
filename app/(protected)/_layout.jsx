import { Redirect, Slot, Stack, Tabs } from "expo-router";
import { useAuth } from "../../context/Auth";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
