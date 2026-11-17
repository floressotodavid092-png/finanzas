const PALETTE = ["#f97316", "#3b82f6", "#eab308", "#22c55e", "#a855f7", "#ef4444", "#06b6d4", "#bf059a"];

// Color estable por nombre de categoría (para chips y gráfica).
export const colorForCategory = (name: string): string => {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return PALETTE[h % PALETTE.length];
};
