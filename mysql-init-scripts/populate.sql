
CREATE TABLE IF NOT EXISTS products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  stock_quantity INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

INSERT INTO products (name, description, price, category, stock_quantity, createdAt, updatedAt)
 VALUES ('Macbook Pro M1', 'One of the best laptops out there', '3299.89', 'tech', 12, "2023-09-19 17:16:14","2023-09-19 17:16:14");

INSERT INTO products (name, description, price, category, stock_quantity, createdAt, updatedAt)
    VALUES ('iPhone 15 Pro Max', 'This is the best iPhone yet!', '2658.02', 'tech', 1, "2023-09-19 17:16:18","2023-09-19 17:16:18");

INSERT INTO products (name, description, price, category, stock_quantity, createdAt, updatedAt)
    VALUES ('Kindle Paperwhite', 'Probably the best device to read off', '54.21', 'books', 5, "2023-09-19 17:16:20","2023-09-19 17:16:20");

INSERT INTO products (name, description, price, category, stock_quantity, createdAt, updatedAt)
    VALUES ('The Lean Startup', 'How Todays Entrepreneurs Use Continuous Innovation', '11.96', 'books', 3, "2023-09-19 17:16:22","2023-09-19 17:16:22");

INSERT INTO products (name, description, price, category, stock_quantity, createdAt, updatedAt)
    VALUES ('The Alchemist', 'A fable about following your dream', '9.99', 'books', 2, "2023-09-19 17:16:24","2023-09-19 17:16:24");

CREATE TABLE IF NOT EXISTS auths (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(64),
  email VARCHAR(255) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);


INSERT INTO auths (username, password_hash, email, createdAt, updatedAt)
 VALUES ('Laval', '$2b$10$vrjAXjyfmlpLgBmvvXkwK.PbFppkZI6JjuiWMgLpd1URO6tpxIkF6',
 'laval@gmail.com', "2023-09-19 17:16:14","2023-09-19 17:16:14");

INSERT INTO auths (username, password_hash, email, createdAt, updatedAt)
    VALUES ('Ishak', '$2b$10$k0STG.DTsbMjOQiyCjQZSeMtGX1IvJYcID9N9sEmC9WCpq5S.Ye9C',
    'ishak@gmail.com', "2023-09-19 17:16:18","2023-09-19 17:16:18");