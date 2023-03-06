import type Category from './category.entity';
import type PaymentType from './payment-type.entity';
import type Place from './place.entity';

export default class Expense {
  id = 0;
  amount: number;
  description: string;
  date: Date;
  paymentType: PaymentType;
  category: Category;
  place: Place;

  constructor(
    amount: number,
    description: string,
    date: Date,
    paymentType: PaymentType,
    category: Category,
    Place: Place
  ) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.paymentType = paymentType;
    this.category = category;
    this.place = Place;
  }
}
