import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../context/AuthProvider";
import { socialImages } from "../../Data/socialImages";
import PrimaryButton from "../Buttons/PrimaryButton";
import SocialButton from "../Buttons/SocialButton";
import InputField from "../Forms/InputField";

const LoginScreen = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { google } = socialImages;

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Datos incompletos", "Introduce tu correo y contraseña");
      return;
    }
    try {
      await signIn(email.trim(), password);
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("No se pudo iniciar sesión", error.message);
    }
  };

  return (
    <View className="px-4 gap-4 mt-8">
      <Text className="text-[16px] font-bold text-center text-gray-700">
        Inicia sesión en tu cuenta
      </Text>
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
      <TouchableOpacity onPress={() => console.log("Olvidé mi contraseña")}>
        <Text className="text-base font-semibold text-primary text-right">
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>
      <PrimaryButton title="Iniciar sesión" onPress={handleSignIn} />
      <View className="flex-row justify-center items-center">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="text-base text-gray-700 mx-4">O</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>
      <SocialButton
        title="Google"
        image={google}
        onPress={() => console.log("Botón de Google presionado")}
      />
    </View>
  );
};

export default LoginScreen;
