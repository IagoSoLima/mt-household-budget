import pgPromise from 'pg-promise';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from '~/infra/vars/app.vars';

const pgp = pgPromise({});

const db = pgp({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT
});

// db.connect = async (): Promise<void> => {
//   clientPg
//     .connect()
//     .then(() => {
//       console.log('connected');
//     })
//     .catch(err => {
//       console.error('connection error', err.stack);
//     });
// };

export default db;
