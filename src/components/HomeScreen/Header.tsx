import { useAuth } from "@/context/AuthProvider";
import { Text, View } from "react-native";

const Header = () => {
  const { user } = useAuth();
  const name =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";

  return (
    <View className="px-4 py-3">
      <Text className="text-gray-500">Bienvenido de nuevo</Text>
      <Text className="text-lg font-bold">Hola, {name}</Text>
    </View>
  );
};

export default Header;
