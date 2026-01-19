import { Level } from 'level';

const loginDB = new Level('./db/login', { valueEncoding: 'json' });

export default loginDB;