import PaymentType from '~/core/entity/payment-type.entity';

const PaymentTypeAdapter = {
  create(param: Omit<PaymentType, 'id'>): PaymentType {
    const { type } = param;

    return new PaymentType(type);
  }
};

export default PaymentTypeAdapter;
