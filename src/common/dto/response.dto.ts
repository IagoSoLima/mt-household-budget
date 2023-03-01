import { snakeKeys } from '~/common/util';

export class ResponseDTO<T = any> {
  data: null | T = null;

  status = false;

  static factory(data) {
    const formattedData = {
      data,
      status: true
    };

    return snakeKeys(formattedData);
  }
}
