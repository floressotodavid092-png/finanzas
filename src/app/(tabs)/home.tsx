import TransactionCard from "@/components/Cards/TransactionCard";
import TransactionForm from "@/components/Forms/TransactionForm";
import Header from "@/components/HomeScreen/Header";
import { Movement } from "@/Data/types/transactions";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { movements, fetchMovements, isFetching, deleteMovement } = useTransaction();
  const [editingItem, setEditingItem] = useState<Movement | null>(null);

  useEffect(() => {
    fetchMovements().catch(() => Alert.alert("Error", "No se pudieron cargar los movimientos"));
  }, [fetchMovements]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMovement(id);
    } catch (e: any) {
      Alert.alert("No se pudo eliminar", e?.message ?? "Error desconocido");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 mt-4 gap-2">
          <TransactionForm
            onSuccess={fetchMovements}
            editingItem={editingItem}
            clearEditing={() => setEditingItem(null)}
          />
          <Text className="text-xl font-semibold">Mis movimientos</Text>
          {isFetching ? (
            <ActivityIndicator size="large" color="red" style={{ marginTop: 40 }} />
          ) : movements.length > 0 ? (
            movements.map((item) => (
              <TransactionCard
                key={item.id}
                movement={item}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => setEditingItem(item)}
              />
            ))
          ) : (
            <Text className="text-center mt-4">No hay movimientos registrados</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
