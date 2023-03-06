export type PaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

interface ExpenseCategory {
  name: string;
  description: string;
}

interface ExpensePlace {
  cep: string;
  number: number;
}

export interface ExpenseUpdateParam {
  id: number;
  amount: number;
  description: string;
  date: Date;

  paymentType: PaymentType;
  category: ExpenseCategory;
  place: ExpensePlace;
}
