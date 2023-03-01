interface expenseCategory {
  name: string;
  description: string;
}

type expensePaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

export interface createExpenseDTO {
  amount: number;
  description: string;
  date: Date;
  category: expenseCategory;
  paymentType: expensePaymentType;
}
