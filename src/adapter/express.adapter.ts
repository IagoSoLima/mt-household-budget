import { type RequestHandler } from 'express';
import { type AbstractFunction } from '~/controller/abstract-controller.interface';

const ExpressAdapter = {
  create<T = any>(fn: AbstractFunction<T>): RequestHandler {
    return (req, res) => {
      fn({ params: req.params, body: req.body })
        .then(response => res.json(response))
        .catch(err => res.status(err));
    };
  }
};

export default ExpressAdapter;
