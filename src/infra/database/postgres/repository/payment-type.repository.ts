import type PaymentType from '~/core/entity/payment-type.entity';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import db from '~/infra/database/postgres/config.postgres';

export default class PaymentTypeRepository implements IPaymentTypeRepository {
  async getAll(): Promise<PaymentType[] | []> {
    await db.connect();
    const result = await db.manyOrNone<PaymentType>(
      'SELECT * FROM tipos_pagamento'
    );
    return result;
  }

  async getByType(name: string): Promise<PaymentType | null> {
    await db.connect();
    const result = await db.oneOrNone<PaymentType>(
      'SELECT * FROM tipos_pagamento WHERE tipo = $1',
      [name]
    );
    return result;
  }
}
