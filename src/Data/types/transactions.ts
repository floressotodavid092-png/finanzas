export type Transaction = {
  id: number;
  amount: number;
  category: string;
  description?: string | null;
  onDelete:()=>void;
};

export type TransactionInput = {
  amount: number;
  category: string;
  description?: string | null;
};