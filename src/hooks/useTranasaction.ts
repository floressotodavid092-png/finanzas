import { Transaction } from "@/Data/types/transactions";
import { supabase } from "@/lib/supabase";
import { useCallback, useState } from "react";

export const useTransaction = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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

    setExpenses((data as Transaction[]) ?? []);
    setIsFetching(false);
  }, []);

  return { expenses, fetchExpense, isFetching };
};