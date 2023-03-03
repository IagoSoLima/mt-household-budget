import { Expose } from 'class-transformer';

export type PaymentType = 'Cash' | 'Credit' | 'Debit' | 'PIX';

interface ExpenseCategory {
  name: string;
  description: string;
}

export class ExpenseRequestDTO {
  amount!: number;
  description!: string;
  date!: Date;

  @Expose({ name: 'payment_type' })
  paymentType!: PaymentType;

  category!: ExpenseCategory;
}
