import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { useAuth } from "../../context/AuthProvider";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputField from "../Forms/InputField";

const SignupScreen = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Datos incompletos", "Completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    try {
      const { needsConfirmation } = await signUp(email.trim(), password, name.trim());
      Alert.alert(
        "Cuenta creada",
        needsConfirmation
          ? "Te enviamos un correo. Confírmalo y luego inicia sesión."
          : "Tu cuenta se creó correctamente"
      );
    } catch (error) {
      Alert.alert("No se pudo registrar", error.message);
    }
  };

  return (
    <View className="px-4 gap-4 mt-8">
      <Text className="text-[16px] font-bold text-center text-gray-700">
        Crea una cuenta
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
      <PrimaryButton title="Registrarse" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;
