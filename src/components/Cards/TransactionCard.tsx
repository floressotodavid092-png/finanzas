import { Movement } from "@/Data/types/transactions";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TransactionCardProps = {
  movement: Movement;
  onDelete: () => void;
  onEdit: () => void;
};

const TransactionCard = ({ movement, onDelete, onEdit }: TransactionCardProps) => {
  const isIncome = movement.type === "income";
  return (
    <View
      className={`w-full border border-gray-300 bg-white p-4 rounded-xl border-l-4 ${
        isIncome ? "border-l-green-500" : "border-l-red-500"
      }`}
    >
      <View className="flex-row justify-between">
        <Text className="text-xl font-semibold">{movement.categories?.name ?? "Sin categoría"}</Text>
        <Text className={`text-xl ${isIncome ? "text-green-500" : "text-red-500"}`}>
          {isIncome ? "+" : "-"}${movement.amount}
        </Text>
      </View>

      <Text>{movement.description}</Text>

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
