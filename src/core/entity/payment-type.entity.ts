export type Type = 'Cash' | 'Credit' | 'Debit' | 'PIX';

export default class PaymentType {
  type: Type;

  constructor(type: Type) {
    this.type = type;
  }
}
