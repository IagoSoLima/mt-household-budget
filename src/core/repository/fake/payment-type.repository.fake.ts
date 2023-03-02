import PaymentTypeAdapter from '~/adapter/payment-type.adapter';
import type PaymentType from '~/core/entity/payment-type.entity';
import { type IPaymentTypeRepository } from '../payment-type.repository.interface';

export default class PaymentTypeRepositoryFake
  implements IPaymentTypeRepository
{
  private readonly paymentsType: PaymentType[] = [];

  constructor() {
    const cash = PaymentTypeAdapter.create({ type: 'Dinheiro' } as PaymentType);
    const credit = PaymentTypeAdapter.create({
      type: 'Credito'
    } as PaymentType);
    const debit = PaymentTypeAdapter.create({ type: 'Debito' } as PaymentType);
    const pix = PaymentTypeAdapter.create({ type: 'PIX' } as PaymentType);

    cash.id = 1;
    credit.id = 2;
    debit.id = 3;
    pix.id = 4;
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
