export type PaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

interface ExpenseCategory {
  name: string;
  description: string;
}

export interface ExpenseStoreParam {
  amount: number;
  description: string;
  date: Date;

  paymentType: PaymentType;
  category: ExpenseCategory;
}
