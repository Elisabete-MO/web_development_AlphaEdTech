import { Level } from 'level';

const orderDB = new Level('./db/order', { valueEncoding: 'json' });

export default orderDB;