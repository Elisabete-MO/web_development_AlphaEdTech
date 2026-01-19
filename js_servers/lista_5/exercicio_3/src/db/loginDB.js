import { Level } from 'level';

const db = new Level('./db/login', { valueEncoding: 'json' });

export default db;
