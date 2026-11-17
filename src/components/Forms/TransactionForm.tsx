import CategoryChips from "@/components/Forms/CategoryChips";
import { Movement, MovementType } from "@/Data/types/transactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransaction } from "@/hooks/useTranasaction";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from "react-native";

type TransactionFormProps = {
  onSuccess: () => void | Promise<void>;
  editingItem: Movement | null;
  clearEditing: () => void;
};

const TYPES: { value: MovementType; label: string }[] = [
  { value: "expense", label: "Gasto" },
  { value: "income", label: "Ingreso" },
];

const TransactionForm = ({ onSuccess, editingItem, clearEditing }: TransactionFormProps) => {
  const { addMovement, loading, updateMovement } = useTransaction();
  const [type, setType] = useState<MovementType>("expense");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { categories, loading: loadingCats } = useCategories(type);

  useEffect(() => {
    if (editingItem) {
      setType(editingItem.type);
      setAmount(editingItem.amount.toString());
      setCategoryId(editingItem.category_id);
      setDescription(editingItem.description || "");
    }
  }, [editingItem]);

  const changeType = (value: MovementType) => {
    if (value === type) return;
    setType(value);
    setCategoryId(null);
  };

  const reset = () => {
    setAmount("");
    setCategoryId(null);
    setDescription("");
  };

  const handleSave = async () => {
    if (!categoryId || !amount) {
      setError("Elige una categoría e introduce el monto");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Por favor, introduce una cantidad válida");
      return;
    }
    const payload = {
      type,
      amount: Number(amount),
      category_id: categoryId,
      description,
    };
    try {
      if (editingItem) {
        await updateMovement(editingItem.id, payload);
        clearEditing();
      } else {
        await addMovement(payload);
      }
    } catch (e: any) {
      // Falló el guardado: se conservan los datos escritos.
      setError(`No se pudo guardar: ${e?.message ?? "error desconocido"}`);
      return;
    }
    setError("");
    reset();
    onSuccess();
  };

  const handleCancel = () => {
    reset();
    clearEditing();
  };

  return (
    <View className="gap-2">
      {error ? <Text className="text-red-500">{error}</Text> : null}
      <View className="flex-row gap-2">
        {TYPES.map((t) => (
          <TouchableOpacity
            key={t.value}
            onPress={() => changeType(t.value)}
            className={`flex-1 py-2 rounded-xl border items-center ${
              type === t.value ? "bg-primary border-primary" : "border-gray-300"
            }`}
          >
            <Text className={type === t.value ? "text-white font-semibold" : "text-gray-700"}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        className="border border-gray-300 rounded-xl px-4"
        placeholder="Ingrese el monto $"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />
      {loadingCats ? (
        <ActivityIndicator color="#bf059a" />
      ) : (
        <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      )}
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
                ? "Guardando..."
                : editingItem
                ? "Actualizar"
                : type === "income"
                ? "Agregar ingreso"
                : "Agregar gasto"
            }
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
};

export default TransactionForm;
