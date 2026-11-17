import CategoryBarChart, { CategoryTotal } from "@/components/Charts/CategoryBarChart";
import { useTransaction } from "@/hooks/useTranasaction";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataAnalytics() {
  const { movements, fetchMovements, isFetching } = useTransaction();

  // Recarga desde Supabase cada vez que se abre la pestaña.
  useFocusEffect(
    useCallback(() => {
      fetchMovements().catch(() => Alert.alert("Error", "No se pudieron cargar los gastos"));
    }, [fetchMovements])
  );

  const { data, total } = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of movements) {
      if (e.type !== "expense") continue;
      const key = e.categories?.name ?? "Sin categoría";
      map.set(key, (map.get(key) ?? 0) + Number(e.amount));
    }
    const sum = [...map.values()].reduce((s, v) => s + v, 0);
    const list: CategoryTotal[] = [...map.entries()]
      .map(([category, total]) => ({ category, total, pct: sum ? (total / sum) * 100 : 0 }))
      .sort((a, b) => b.total - a.total);
    return { data: list, total: sum };
  }, [movements]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text className="text-xl font-bold">Gastos por categoría</Text>
        {isFetching && movements.length === 0 ? (
          <ActivityIndicator size="large" color="#bf059a" style={{ marginTop: 40 }} />
        ) : data.length === 0 ? (
          <Text className="text-center mt-8">Aún no hay gastos para graficar</Text>
        ) : (
          <>
            <View className="bg-white border border-gray-300 rounded-xl p-4">
              <Text className="text-gray-500">Total gastado</Text>
              <Text className="text-2xl font-bold">
                ${total.toLocaleString("es-MX", { maximumFractionDigits: 2 })}
              </Text>
            </View>
            <View className="bg-white border border-gray-300 rounded-xl p-4">
              <CategoryBarChart data={data} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
