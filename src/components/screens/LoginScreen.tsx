import { useState } from "react";
import { View } from "react-native";
import InputField from "../Forms/InputField";

const LoginScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <InputField
        icon="mail-outline"
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
};

export default LoginScreen;