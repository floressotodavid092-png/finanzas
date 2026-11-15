import TransactionCard from "@/components/Cards/TransactionCard";
import Header from "@/components/HomeScreen/Header";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { expenses, fetchExpense, isFetching } = useTransaction();

  useEffect(() => {
    fetchExpense();
  }, [fetchExpense]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View className="px-4 mt-4">
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
            />
          ))
        ) : (
          <Text>No expenses found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;