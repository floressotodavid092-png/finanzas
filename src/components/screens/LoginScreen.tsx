import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputField from "../Forms/InputField";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="px-4 gap-4">
      <InputField
        icon="mail"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon="lock-closed"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text className="text-base font-semibold text-primary text-right">
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <PrimaryButton
        title="Login"
        onPress={() => console.log("Login Button Pressed")}
      />
    </View>
  );
};

export default LoginScreen;