import { useTransaction } from "@/hooks/useTranasaction";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

type TransactionFormProps = {
  onSuccess: () => void;
};

const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
  const { addExpense, loading } = useTransaction();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleAddExpense = async () => {
    if (!category || !amount) {
      setError("Please enter the details");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    await addExpense({
      amount: Number(amount),
      category,
      description,
    });

    setError("");
    setAmount("");
    setCategory("");
    setDescription("");
    onSuccess();
  };

  return (
    <View className="gap-2">
      {error ? <Text className="text-red-500">{error}</Text> : null}
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Enter the amount $"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Enter the category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Enter the description"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title={loading ? "Adding..." : "Add Expense"}
        onPress={handleAddExpense}
      />
    </View>
  );
};

export default TransactionForm;