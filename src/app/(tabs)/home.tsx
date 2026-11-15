import TransactionCard from "@/components/Cards/TransactionCard";
import TransactionForm from "@/components/Forms/TransactionForm";
import Header from "@/components/HomeScreen/Header";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { expenses, fetchExpense, isFetching, deleteExpense } = useTransaction();

  useEffect(() => {
    fetchExpense();
  }, [fetchExpense]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View className="px-4 mt-4 gap-2">
        <TransactionForm onSuccess={fetchExpense} />
        <Text className="text-xl font-semibold">Today's Expenses</Text>
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
              onDelete={() => deleteExpense(item.id)}
            />
          ))
        ) : (
          <Text className="text-center mt-4">No expenses found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;