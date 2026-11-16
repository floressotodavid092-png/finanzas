import { Transaction, TransactionInput } from "@/Data/types/transactions";
import { supabase } from "@/lib/supabase";
import { useCallback, useState } from "react";

export const useTransaction = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchExpense = useCallback(async () => {
    setIsFetching(true);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("No se pudo obtener el gasto: ", error.message);
      setIsFetching(false);
      return;
    }

    setExpenses(data || []);
    console.log("Gastos recuperados: ", data);
    setIsFetching(false);
  }, []);

  const addExpense = async ({ amount, category, description }: TransactionInput) => {
    if (loading) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          amount: Number(amount),
          category,
          description,
        },
      ]);

    if (error) {
      console.log("No se pudo añadir el gasto: ", error.message);
      setLoading(false);
      return;
    }

    await fetchExpense();
    console.log("El gasto se ha añadido correctamente! ", data);
    setLoading(false);
  };

  const deleteExpense = async (id: number) => {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("No se pudo eliminar el gasto: ", error.message);
      return;
    }

    setExpenses((current) => current.filter((expense) => expense.id !== id));
    console.log("El gasto se ha eliminado correctamente!");
  };

  const updateExpense = async (
    id: number,
    updateData: {
      amount: number;
      category: string;
      description: string;
    }
  ) => {
    const { data, error } = await supabase
      .from("expenses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log("No se pudo actualizar el gasto: ", error.message);
      return;
    }

    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? data : expense))
    );
    console.log("El gasto se ha actualizado correctamente!");
  };

  return { expenses, fetchExpense, isFetching, loading, addExpense, deleteExpense, updateExpense };
};