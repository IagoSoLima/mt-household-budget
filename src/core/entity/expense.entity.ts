import type Category from './category.entity';
import type PaymentType from './payment-type.entity';

export default class Expense {
  id = 0;
  amount: number;
  description: string;
  date: Date;
  paymentType: PaymentType;
  category: Category;

  constructor(
    amount: number,
    description: string,
    date: Date,
    paymentType: PaymentType,
    category: Category
  ) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.paymentType = paymentType;
    this.category = category;
  }
}
