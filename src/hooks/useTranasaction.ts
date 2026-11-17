import { Movement, MovementInput } from "@/Data/types/transactions";
import { supabase } from "@/lib/supabase";
import { useCallback, useState } from "react";

// Los errores de Supabase se PROPAGAN (throw) para que quien llama
// (formulario / pantalla) sepa si la operación realmente se guardó.
export const useTransaction = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovements = useCallback(async () => {
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from("movements")
        .select("*, categories(name)")
        .order("date", { ascending: false })
        .order("id", { ascending: false });
      if (error) throw error;
      setMovements((data as Movement[]) || []);
    } catch (error: any) {
      console.log("No se pudieron obtener los movimientos: ", error.message);
      throw error;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addMovement = async (input: MovementInput) => {
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("movements").insert([input]);
      if (error) throw error;
      await fetchMovements();
    } catch (error: any) {
      console.log("No se pudo añadir el movimiento: ", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteMovement = async (id: number) => {
    const { error } = await supabase.from("movements").delete().eq("id", id);
    if (error) {
      console.log("No se pudo eliminar el movimiento: ", error.message);
      throw error;
    }
    setMovements((current) => current.filter((m) => m.id !== id));
  };

  const updateMovement = async (id: number, updateData: MovementInput) => {
    const { error } = await supabase.from("movements").update(updateData).eq("id", id);
    if (error) {
      console.log("No se pudo actualizar el movimiento: ", error.message);
      throw error;
    }
    await fetchMovements();
  };

  return { movements, fetchMovements, isFetching, loading, addMovement, deleteMovement, updateMovement };
};
