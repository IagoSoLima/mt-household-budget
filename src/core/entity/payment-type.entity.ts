export type Type = 'Dinheiro' | 'Credito' | 'Debito' | 'PIX';

export default class PaymentType {
  id = 0;
  type: Type;

  constructor(type: Type) {
    this.type = type;
  }
}
