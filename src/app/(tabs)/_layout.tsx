import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const icon =
  (name: IconName) =>
  ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={name} size={size} color={color as string} />
  );

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#a3109c" }}>
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: icon("home") }} />
      <Tabs.Screen name="transactions" options={{ title: "Transactions", tabBarIcon: icon("swap-horizontal") }} />
      <Tabs.Screen name="dataAnalytics" options={{ title: "Analytics", tabBarIcon: icon("bar-chart") }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: icon("person") }} />
    </Tabs>
  );
}