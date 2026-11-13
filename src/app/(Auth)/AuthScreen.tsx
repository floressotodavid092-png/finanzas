import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import SignupScreen from "../../components/screens/SignupScreen";

const AuthScreen = () => {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#bf059a", "#3f0333"]}
        locations={[0.3, 0.9]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%" }}
      />
      <View className="flex-1 justify-center">
        <SignupScreen />
      </View>
    </View>
  );
};

export default AuthScreen;