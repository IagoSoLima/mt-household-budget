import { type RequestHandler } from 'express';
import { type AbstractFunction } from '~/common/controller/abstract-controller.interface';
import { ResponseDTO } from '~/common/dto/response.dto';
import { camelizeKeys, snakeKeys } from '~/common/util';

const DEFAULT_VALUE_FN = async () => {
  await Promise.resolve({});
};

const ExpressAdapter = {
  create<T = any>(fn: AbstractFunction = DEFAULT_VALUE_FN): RequestHandler {
    return (req, res) => {
      fn({ ...req.params, ...req.body, ...req.query })
        .then(response => {
          const responseDTO = ResponseDTO<T>;
          res.json(responseDTO.factory(response));
        })
        .catch(err => {
          console.log(err);
          const responseDTO = ResponseDTO<T>;
          res.json(responseDTO.factory(null, false));
        });
    };
  },

  camelizeDataParams(): RequestHandler {
    return (req, res, next) => {
      req.body = camelizeKeys(req.body);
      req.params = camelizeKeys(req.params);
      req.query = camelizeKeys(req.query);
      next();
    };
  }
};

export default ExpressAdapter;
