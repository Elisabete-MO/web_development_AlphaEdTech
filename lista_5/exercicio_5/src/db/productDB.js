import { Level } from 'level';

const productDB = new Level('./db/product', { valueEncoding: 'json' });

export default productDB;