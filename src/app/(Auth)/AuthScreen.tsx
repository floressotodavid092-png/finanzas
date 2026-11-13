import { LinearGradient } from "expo-linear-gradient";
import Lottie from "lottie-react-native";
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
      <View className="flex-[4] items-center justify-center">
        <Lottie
          source={require("../../../assets/animations/bill-payment.json")}
          autoPlay
          resizeMode="contain"
          style={{width: "90%", height: "90%" }}
        />
      </View>
      <View className="flex-[6] bg-white px-4 rounded-t-[50px]">
        <SignupScreen />
      </View>
    </View>
  );
};

export default AuthScreen;