CREATE DATABASE IF NOT EXISTS gymember_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gymember_db;

-- ==================================[  TABLES  ]================================== --

    -- Handling gym accounts and dev accounts
CREATE TABLE IF NOT EXISTS Gym_Dev_Accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gym_name VARCHAR(255) UNIQUE NOT NULL,
    nit VARCHAR(50) UNIQUE NOT NULL,
    hash_pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role ENUM('company', 'dev') NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

    -- Handling gym employees
CREATE TABLE IF NOT EXISTS Employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gym_id_fk INT NOT NULL,
    nuip VARCHAR(50) UNIQUE NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') NOT NULL,
    hash_access_code VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Fk
    FOREIGN KEY (gym_id_fk) REFERENCES Gym_Dev_Accounts(id)
) ENGINE = InnoDB;

    -- Handling gym customers
CREATE TABLE IF NOT EXISTS Customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gym_id_fk INT NOT NULL,
    enrolling_employee_id_fk INT NOT NULL,
    nuip VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    first_last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    profile_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FKs
    FOREIGN KEY (gym_id_fk) REFERENCES Gym_Dev_Accounts(id),
    FOREIGN KEY (enrolling_employee_id_fk) REFERENCES Employees(id)
) ENGINE = InnoDB;

        -- Handling gym customers details
CREATE TABLE IF NOT EXISTS Customers_Details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id_fk INT UNIQUE NOT NULL,
    gender ENUM('m', 'f') NOT NULL,
    birthdate DATE NOT NULL,
    age INT NOT NULL,
    address VARCHAR(255),
    city VARCHAR(255),
    emergency_phone VARCHAR(50) NOT NULL,
    additional_info TEXT,
    -- FK
    FOREIGN KEY (customer_id_fk) REFERENCES Customers(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

        -- Handling gym customers memberships
CREATE TABLE IF NOT EXISTS Customers_Memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id_fk INT UNIQUE NOT NULL,
    membership_type VARCHAR(255) NOT NULL,
    status ENUM('active', 'expired', 'pending', 'cancelled', 'frozen', 'trial') NOT NULL,
    duration_days INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    -- FK
    FOREIGN KEY (customer_id_fk) REFERENCES Customers(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

    -- Handling gym transactions
CREATE TABLE IF NOT EXISTS Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id_fk INT NOT NULL,
    customer_id_fk INT NOT NULL,
    transaction_category VARCHAR(255) NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FKs
    FOREIGN KEY (employee_id_fk) REFERENCES Employees(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (customer_id_fk) REFERENCES Customers(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;