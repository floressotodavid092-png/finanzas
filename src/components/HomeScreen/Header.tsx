import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="px-4 py-3">
      <Text className="text-gray-500">Welcome Back</Text>
      <Text className="text-lg font-bold">Hello, Amir</Text>
    </View>
  );
};

export default Header;