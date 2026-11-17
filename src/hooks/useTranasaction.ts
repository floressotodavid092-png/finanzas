import { Transaction, TransactionInput } from "@/Data/types/transactions";
import { supabase } from "@/lib/supabase";
import { useCallback, useState } from "react";

// Los errores de Supabase se PROPAGAN (throw) para que quien llama
// (formulario / pantalla) sepa si la operación realmente se guardó.
export const useTransaction = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchExpense = useCallback(async () => {
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      console.log("No se pudieron obtener los gastos: ", error.message);
      throw error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addExpense = async ({ amount, category, description }: TransactionInput) => {
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("expenses")
        .insert([{ amount: Number(amount), category, description }]);
      if (error) throw error;
      await fetchExpense();
    } catch (error: any) {
      console.log("No se pudo añadir el gasto: ", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: number) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.log("No se pudo eliminar el gasto: ", error.message);
      throw error;
    }
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const updateExpense = async (
    id: number,
    updateData: { amount: number; category: string; description: string }
  ) => {
    const { data, error } = await supabase
      .from("expenses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.log("No se pudo actualizar el gasto: ", error.message);
      throw error;
    }
    setExpenses((current) =>
      current.map((expense) => (expense.id === id ? data : expense))
    );
  };

  return { expenses, fetchExpense, isFetching, loading, addExpense, deleteExpense, updateExpense };
};
