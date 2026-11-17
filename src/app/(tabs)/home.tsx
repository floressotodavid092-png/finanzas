import TransactionCard from "@/components/Cards/TransactionCard";
import TransactionForm from "@/components/Forms/TransactionForm";
import Header from "@/components/HomeScreen/Header";
import { Transaction } from "@/Data/types/transactions";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { expenses, fetchExpense, isFetching, deleteExpense } = useTransaction();
  const [editingItem, setEditingItem] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchExpense().catch(() => Alert.alert("Error", "No se pudieron cargar los gastos"));
  }, [fetchExpense]);

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
    } catch (e: any) {
      Alert.alert("No se pudo eliminar", e?.message ?? "Error desconocido");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View className="px-4 mt-4 gap-2">
        <TransactionForm
          onSuccess={fetchExpense}
          editingItem={editingItem}
          clearEditing={() => setEditingItem(null)}
        />
        <Text className="text-xl font-semibold">Mis gastos</Text>
        {isFetching ? (
          <ActivityIndicator size="large" color="red" style={{ marginTop: 40 }} />
        ) : expenses.length > 0 ? (
          expenses.map((item) => (
            <TransactionCard
              key={item.id}
              id={item.id}
              category={item.category}
              amount={item.amount}
              description={item.description}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => setEditingItem(item)}
            />
          ))
        ) : (
          <Text className="text-center mt-4">No hay gastos registrados</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;