import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

// Al cerrar sesión, RootNavigation (app/_layout.tsx) detecta session = null
// y redirige solo a la pantalla de login.
const LogoutButton = () => {
  const { signOut } = useAuth();

  const confirm = () =>
    Alert.alert("Cerrar sesión", "¿Seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (e: any) {
            Alert.alert("No se pudo cerrar sesión", e?.message ?? "Error desconocido");
          }
        },
      },
    ]);

  return (
    <TouchableOpacity onPress={confirm}>
      <Ionicons name="log-out-outline" size={24} color="#ef4444" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
