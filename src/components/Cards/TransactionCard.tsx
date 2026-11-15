import { Transaction } from "@/Data/types/transactions";
import { Text, View } from "react-native";

const TransactionCard = ({ amount, category, description }: Transaction) => {
  return (
    <View className="w-full border border-gray-300 bg-white p-4 rounded-xl border-l-4 border-l-red-500">
      <View className="flex-row justify-between">
        <Text className="text-xl font-semibold">{category}</Text>
        <Text className="text-red-500 text-xl">-${amount}</Text>
      </View>

      <Text>{description}</Text>
    </View>
  );
};

export default TransactionCard;