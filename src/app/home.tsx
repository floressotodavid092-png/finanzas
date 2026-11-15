import { Transaction } from "@/Data/types/transactions";
import { Text, View } from "react-native";

const TransactionCard = ({ amount, category, description }: Transaction) => {
  return (
    <View className="w-full border border-gray-300 bg-white p-4 rounded-xl mb-3">
      <Text className="font-bold">{category}</Text>
      <Text>${amount}</Text>
      {description ? <Text className="text-gray-500">{description}</Text> : null}
    </View>
  );
};

export default TransactionCard;