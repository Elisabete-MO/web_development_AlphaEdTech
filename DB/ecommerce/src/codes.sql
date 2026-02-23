INSERT INTO 
  product (sku, name, price, weight, stock_quantity, category_id, created_by, updated_by) 
SELECT 
  'SKU-' || substr(md5(random()::text), 1, 8),
  'Product ' || g,
  (random() * 10000)::numeric(10,2),
  (random() * 500)::numeric(10,2),
  floor(random() * 1000),
  floor(random() * 6),
  c.id,
  c.id 
FROM generate_series(1, 100000) g
JOIN client c ON c.email = 'admin@email.com';

EXPLAIN ANALYZE SELECT * FROM product WHERE name LIKE '%Product 50000%';

CREATE INDEX idx_product_name ON product(name);

---------------------------

INSERT INTO 
client (full_name, birth_date, cpf, email, phone, password_hash, created_by, updated_by) 
SELECT 
  'Cliente ' || g,
  DATE '1970-01-01' + (random() * 13000)::int,
  LPAD(g::text, 11, '0'),
  'client' || g || '@email.com',
  '119' || LPAD((random() * 10000000)::int::text, 8, '0'),
  md5('senha' || g)
  c.id,
  c.id 
FROM generate_series(1, 250000) g
JOIN client c ON c.email = 'admin@email.com';

EXPLAIN ANALYZE SELECT * FROM client WHERE name LIKE 'Cliente 200000';

CREATE INDEX idx_client_name ON client(name);

---------------------------

INSERT INTO address (
  client_id,
  street,
  number,
  city,
  state,
  zip_code
)
SELECT
  c.id,
  'Rua ' || (random() * 25000)::int,
  (random() * 72000)::int,
  'Cidade ' || (random() * 1000)::int,
  (ARRAY[
   'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
   'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
   'RS','RO','RR','SC','SP','SE','TO'
  ])[ FLOOR(random() * 27)::int + 1 ],
  LPAD((random()*100000000)::bigint::text, 8, '0')
FROM client c
CROSS JOIN generate_series(1, 2) g;

EXPLAIN ANALYZE SELECT * FROM address WHERE state = 'AM';

CREATE INDEX idx_address_state ON address(state);