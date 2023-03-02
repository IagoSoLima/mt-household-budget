import { snakeKeys } from '~/common/util';

export class ResponseDTO<T = any> {
  data: null | T = null;
  status = false;

  static factory(data = null, status = true) {
    const formattedData = {
      data,
      status
    };

    return snakeKeys(formattedData);
  }
}
