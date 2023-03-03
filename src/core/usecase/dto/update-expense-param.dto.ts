import { type Type as PaymentTypeEntity } from '~/core/entity/payment-type.entity';
type PaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

export type ChargePaymentType = Record<PaymentType, PaymentTypeEntity>;

interface ExpenseCategory {
  name: string;
  description: string;
}

export interface UpdateExpenseParam {
  id: number;
  amount: number;
  description: string;
  date: Date;
  paymentType: PaymentType;
  category: ExpenseCategory;
}
