export interface DataExpenseDataTemplate {
  description: string;
  date: string;
  amount: string;
}

export interface IExpenseDataTemplate {
  month: string;
  year: string;
  data: DataExpenseDataTemplate[];
}
