import { colorForCategory } from "@/Data/categories";
import { Category } from "@/Data/types/transactions";
import { ScrollView, Text, TouchableOpacity } from "react-native";

type Props = {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const CategoryChips = ({ categories, selectedId, onSelect }: Props) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
    {categories.map((c) => {
      const active = selectedId === c.id;
      const color = colorForCategory(c.name);
      return (
        <TouchableOpacity
          key={c.id}
          onPress={() => onSelect(c.id)}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: active ? color : "#d1d5db",
            backgroundColor: active ? color : "#fff",
          }}
        >
          <Text style={{ color: active ? "#fff" : "#374151", fontWeight: "600" }}>{c.name}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default CategoryChips;
