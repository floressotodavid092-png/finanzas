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
      console.log("Failed to fetch expense: ", error.message);
      setIsFetching(false);
      return;
    }

    setExpenses(data || []);
    console.log("Expenses fetched: ", data);
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
      console.log("Failed to add expense: ", error.message);
      setLoading(false);
      return;
    }

    await fetchExpense();
    console.log("Expense is added successfully! ", data);
    setLoading(false);
  };

  return { expenses, fetchExpense, isFetching, loading, addExpense };
};