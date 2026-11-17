import { colorForCategory } from "@/Data/categories";
import { ScrollView, Text, View } from "react-native";

export type CategoryTotal = { category: string; total: number; pct: number };

const CHART_HEIGHT = 180;
const COL_WIDTH = 64;
const fmt = (n: number) => `$${n.toLocaleString("es-MX", { maximumFractionDigits: 2 })}`;

// Gráfica de columnas: una columna por categoría, altura proporcional al gasto.
const CategoryBarChart = ({ data }: { data: CategoryTotal[] }) => {
  const max = Math.max(...data.map((d) => d.total), 1);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 12, paddingTop: 8 }}>
        {data.map((d) => (
          <View key={d.category} style={{ width: COL_WIDTH, alignItems: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: "600", marginBottom: 4 }}>{fmt(d.total)}</Text>
            <Text style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{d.pct.toFixed(0)}%</Text>
            <View style={{ height: CHART_HEIGHT, justifyContent: "flex-end" }}>
              <View
                style={{
                  width: 36,
                  height: Math.max((d.total / max) * CHART_HEIGHT, 4),
                  backgroundColor: colorForCategory(d.category),
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
            </View>
            <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 6, color: "#4b5563" }}>
              {d.category}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryBarChart;
