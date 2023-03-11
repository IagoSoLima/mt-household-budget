import { beforeEach, describe, expect, it } from 'vitest';
import PaymentTypeRepositoryFake from '~/core/repository/fake/payment-type.repository.fake';
import { type IPaymentTypeRepository } from '~/core/repository/payment-type.repository.interface';
import PaymentType from '../entity/payment-type.entity';

describe('PaymentTypeRepository', () => {
  let paymentTypeRepository: IPaymentTypeRepository;

  beforeEach(() => {
    paymentTypeRepository = new PaymentTypeRepositoryFake();
  });

  it('should be defined', () => {
    expect(paymentTypeRepository).toBeDefined();
  });

  it('should be get all payment type by type', async () => {
    const paymentsType = await paymentTypeRepository.getAll();
    expect(paymentsType.length).toBeGreaterThanOrEqual(1);
  });

  it('should be get payment type by type', async () => {
    const type = 'Dinheiro';
    const paymentType = await paymentTypeRepository.getByType(type);
    expect(paymentType).toBeInstanceOf(PaymentType);
    expect(paymentType?.id).toBeTypeOf('number');
    expect(paymentType?.type).toEqual(type);
  });

  it('should not be found payment type by zipCode and number', async () => {
    const paymentType = await paymentTypeRepository.getByType('Cash');
    expect(paymentType).toBeNull();
  });
});
