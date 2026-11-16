import { useState } from "react";
import { Text, View } from "react-native";

import PrimaryButton from "../Buttons/PrimaryButton";
import InputField from "../Forms/InputField";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View className="px-4 gap-4 mt-8">
      <Text className="text-[16px] font-bold text-center text-gray-700">
        Create an account
      </Text>
      <InputField
        icon="person"
        placeholder="Introduce tu nombre"
        value={name}
        onChangeText={setName}
      />
      <InputField
        icon="mail"
        placeholder="Introduce tu correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon="lock-closed"
        placeholder="Introduce tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <InputField
        icon="lock-closed"
        placeholder="Confirma tu contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <PrimaryButton
        title="Sign Up"
        onPress={() => console.log("Se ha pulsado el botón de registro")}
      />
    </View>
  );
};

export default SignupScreen;