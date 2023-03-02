import type Category from '~/core/entity/category.entity';
import type PaymentType from '~/core/entity/payment-type.entity';

export interface CreateExpense {
  amount: number;
  description: string;
  date: Date;
  category: Category;
  paymentType: PaymentType;
}
