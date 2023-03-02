import PaymentType from '~/core/entity/payment-type.entity';
import { type IPaymentTypeRepository } from '../payment-type.repository.interface';

export default class PaymentTypeRepositoryFake
  implements IPaymentTypeRepository
{
  private readonly paymentsType: PaymentType[] = [];

  constructor() {
    const cash = new PaymentType('Dinheiro');
    const credit = new PaymentType('Credito');
    const debit = new PaymentType('Debito');
    const pix = new PaymentType('PIX');

    cash.setId(1);
    credit.setId(1);
    debit.setId(1);
    pix.setId(1);
    this.paymentsType = [cash, credit, debit, pix];
  }

  async getAll(): Promise<PaymentType[]> {
    return await Promise.resolve(this.paymentsType);
  }

  async getByType(type: string): Promise<PaymentType | null> {
    const index = await Promise.resolve(
      this.paymentsType.findIndex(paymentType => paymentType.type === type)
    );

    if (index < 0) return null;

    return this.paymentsType[index];
  }
}
