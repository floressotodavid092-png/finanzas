export type MovementType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
};

export type Movement = {
  id: number;
  type: MovementType;
  amount: number;
  category_id: string;
  description?: string | null;
  date: string;
  categories?: { name: string } | null;
};

export type MovementInput = {
  type: MovementType;
  amount: number;
  category_id: string;
  description?: string | null;
};
