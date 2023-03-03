export type PaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

interface ExpenseCategory {
  name: string;
  description: string;
}

export interface ExpenseUpdateParam {
  id: number;
  amount: number;
  description: string;
  date: Date;

  paymentType: PaymentType;
  category: ExpenseCategory;
}
