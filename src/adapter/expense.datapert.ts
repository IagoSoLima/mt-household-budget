import Expense from '~/core/entity/expense.entity';

const ExpenseAdapter = {
  create(param: Omit<Expense, 'id'>): Expense {
    const { amount, category, date, description, paymentType } = param;

    return new Expense(amount, description, date, paymentType, category);
  }
};

export default ExpenseAdapter;
