import { Level } from 'level';

const customerDB = new Level('./db/customer', { valueEncoding: 'json' });

export default customerDB;