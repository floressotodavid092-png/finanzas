import { Transaction } from "@/Data/types/transactions";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

type TransactionFormProps = {
  onSuccess: () => void | Promise<void>;
  editingItem: Transaction | null;
  clearEditing: () => void;
};

const TransactionForm = ({ onSuccess, editingItem, clearEditing }: TransactionFormProps) => {
  const { addExpense, loading, updateExpense } = useTransaction();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingItem) {
      setAmount(editingItem.amount.toString());
      setCategory(editingItem.category);
      setDescription(editingItem.description || "");
    }
  }, [editingItem]);

  const handleAddExpense = async () => {
    if (!category || !amount) {
      setError("Por favor, introduce los datos");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Por favor, introduce una cantidad válida");
      return;
    }
    try {
      if (editingItem) {
        await updateExpense(editingItem.id, {
          amount: Number(amount),
          category,
          description,
        });
        clearEditing();
      } else {
        await addExpense({
          amount: Number(amount),
          category,
          description,
        });
      }
    } catch (e: any) {
      // Falló el guardado: se conservan los datos escritos.
      setError(`No se pudo guardar el gasto: ${e?.message ?? "error desconocido"}`);
      return;
    }

    setError("");
    setAmount("");
    setCategory("");
    setDescription("");
    onSuccess();
  };

  const handleCancel = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    clearEditing();
  };

  return (
    <View className="gap-2">
      {error ? <Text className="text-red-500">{error}</Text> : null}
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Ingrese el monto $"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Introduce la categoría"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Introduce la descripción"
        value={description}
        onChangeText={setDescription}
      />
      <View className="flex-row justify-between w-full">
        {editingItem && (
          <View className="flex-1 mr-2">
            <Button title="Cancelar" onPress={handleCancel} color="gray" />
          </View>
        )}
        <View className="flex-1">
          <Button
            title={
              loading
                ? editingItem
                  ? "Actualizando..."
                  : "Agregando..."
                : editingItem
                ? "Actualizar"
                : "Agregar gasto"
            }
            onPress={handleAddExpense}
          />
        </View>
      </View>
    </View>
  );
};

export default TransactionForm;