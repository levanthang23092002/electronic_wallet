-- Tạo cơ sở dữ liệu và sử dụng nó
CREATE DATABASE electronic_wallet;
\c electronic_wallet;

-- Tạo bảng accounts
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE CHECK (email ~ '^[a-z][a-z0-9]*@gmail\.com$'),
  password VARCHAR(16),
  google_id VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng users
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
  phone VARCHAR(11) CHECK (phone ~ '^[0][0-9]{9}$'),
  address VARCHAR(100),
  born DATE CHECK (born <= CURRENT_DATE - INTERVAL '18 years'),
  FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Tạo SEQUENCE cho số tài khoản
CREATE SEQUENCE account_number_seq START 123456789100;

-- Tạo bảng wallet
CREATE TABLE wallet (
  accountNumber VARCHAR(12) PRIMARY KEY DEFAULT LPAD(nextval('account_number_seq')::text, 12, '0'),
  id INT REFERENCES users(id),
  accountName VARCHAR(50),
  balance MONEY DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng transactions với user_id thay vì wallet_id
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  type VARCHAR(10) CHECK (type IN ('deposit', 'transfer')),
  amount MONEY NOT NULL,
  from_wallet_id VARCHAR(12) REFERENCES wallet(accountNumber),
  to_wallet_id VARCHAR(12) REFERENCES wallet(accountNumber),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cccd_images (
    id SERIAL PRIMARY KEY,          
    user_id INT NOT NULL UNIQUE,           
    front_image_filename VARCHAR(255) NOT NULL, 
    back_image_filename VARCHAR(255) NOT NULL, 
    front_image_path VARCHAR(255) NOT NULL,     
    back_image_path VARCHAR(255) NOT NULL, 
    type VARCHAR(50) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Tạo function để tự động tạo ví cho người dùng mới
CREATE OR REPLACE FUNCTION create_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallet (id, accountName, created_at)
  VALUES (NEW.id, NEW.name, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger để gọi function sau khi thêm người dùng mới
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_wallet();
