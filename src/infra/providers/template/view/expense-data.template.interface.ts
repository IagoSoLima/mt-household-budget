export interface DataExpenseDataTemplate {
  description: string;
  date: string;
  amount: string;
}

export interface InfoExpenseTemplate {
  month: string;
  year: string;
  data: DataExpenseDataTemplate[];
}

export interface IExpenseDataTemplate {
  initialDate: string;
  finishedDate: string;
  info: InfoExpenseTemplate[];
}
