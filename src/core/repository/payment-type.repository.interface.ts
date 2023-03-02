import type PaymentType from '../entity/payment-type.entity';

export interface IPaymentTypeRepository {
  getAll: () => Promise<PaymentType[] | []>;
  getByType: (name: string) => Promise<PaymentType | null>;
}
