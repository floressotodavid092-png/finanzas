import { Transaction } from "@/Data/types/transactions";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TransactionCardProps = Transaction & {
  onDelete: () => void;
  onEdit: () => void;
};

const TransactionCard = ({ amount, category, description, onDelete, onEdit }: TransactionCardProps) => {
  return (
    <View className="w-full border border-gray-300 bg-white p-4 rounded-xl border-l-4 border-l-red-500">
      <View className="flex-row justify-between">
        <Text className="text-xl font-semibold">{category}</Text>
        <Text className="text-red-500 text-xl">-${amount}</Text>
      </View>

      <Text>{description}</Text>

      <View className="flex-row justify-end">
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionCard;