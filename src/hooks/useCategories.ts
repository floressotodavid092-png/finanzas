import { Category, MovementType } from "@/Data/types/transactions";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

// Lee las categorías (tabla `categories`) del tipo indicado.
export const useCategories = (type: MovementType) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("categories")
      .select("id, name")
      .eq("type", type)
      .order("name")
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.log("No se pudieron obtener las categorías: ", error.message);
        setCategories(data ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [type]);

  return { categories, loading };
};
