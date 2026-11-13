import { LinearGradient } from "expo-linear-gradient";
import Lottie from "lottie-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoginScreen from "../../components/screens/LoginScreen";
import SignupScreen from "../../components/screens/SignupScreen";

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const isLogin = activeTab === "Login";

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#bf059a", "#3f0333"]}
        locations={[0.3, 0.9]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%" }}
      />
      <View className="flex-[4] items-center justify-center">
        <Lottie
          source={require("../../../assets/animations/budget-report.json")}
          autoPlay
          loop
          resizeMode="contain"
          style={{ width: "90%", height: "90%" }}
        />
      </View>
      <View className="flex-[6] bg-white px-4 rounded-t-[50px]">
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {isLogin ? <LoginScreen /> : <SignupScreen />}
            <View className="flex-row justify-center pt-2">
              <Text>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity
                onPress={() => setActiveTab(isLogin ? "Signup" : "Login")}
              >
                <Text className="text-primary font-semibold underline">
                  {isLogin ? "Sign Up" : "Login"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default AuthScreen;