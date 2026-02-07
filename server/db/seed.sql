-- ==================================[  DATA INSERTS  ]================================== --
-- Gym_Dev_Accounts
INSERT INTO Gym_Dev_Accounts (gym_name, nit, hash_pass, email, role)
VALUES
    ('Schnauzer Performance Gym', '999999999-9', '$2b$10$0u0n5ytJZ4L8Qk5xx10vyOjgcZ1roA.ulKt3juzEPzfqekTB.woOS', 'schnauzergym@gmail.com', 'company'),
    ('Camilo Jiménez', '112266677-7', 'camilo123', 'jmncamilo@gmail.com', 'dev');


-- Employees
INSERT INTO Employees (gym_id_fk, nuip, employee_name, role, hash_access_code, email, phone_number)
VALUES
    (1, '993456799', 'Ada Lovelace', 'admin', '$2b$10$LnUwyi01QYDmDLl2ACu9.uGFhooMulYxLlW6JUnAx9vYuOXuOlnCq', 'adminempleado03@gmail.com', '3158859999');


-- Customers
    -- Schnauzer Performance Gym
INSERT INTO Customers (gym_id_fk, enrolling_employee_id_fk, nuip, first_name, first_last_name, email, phone_number, profile_image_url)
VALUES
    (1, 1, '1001234567', 'Carlos', 'Rodríguez', 'carlos.rodriguez@gmail.com', '3101234567', NULL),
    (1, 1, '1001234568', 'Ana', 'Martínez', 'ana.martinez@gmail.com', '3101234568', NULL),
    (1, 1, '1001234569', 'Juan', 'Gómez', 'juan.gomez@gmail.com', '3101234569', NULL),
    (1, 1, '1001234570', 'María', 'López', 'maria.lopez@gmail.com', '3101234570', NULL),
    (1, 1, '1001234571', 'Pedro', 'Sánchez', 'pedro.sanchez@gmail.com', '3101234571', NULL),
    (1, 1, '1001234572', 'Luisa', 'Fernández', 'luisa.fernandez@gmail.com', '3101234572', NULL),
    (1, 1, '1001234573', 'Diego', 'Ramírez', 'diego.ramirez@gmail.com', '3101234573', NULL),
    (1, 1, '1001234574', 'Sofía', 'Torres', 'sofia.torres@gmail.com', '3101234574', NULL),
    (1, 1, '1001234575', 'Andrés', 'Vargas', 'andres.vargas@gmail.com', '3101234575', NULL),
    (1, 1, '1001234576', 'Valentina', 'Castro', 'valentina.castro@gmail.com', '3101234576', NULL);


-- Customers Details
    -- Schnauzer Performance Gym
INSERT INTO Customers_Details (customer_id_fk, gender, birthdate, age, address, city, emergency_phone, additional_info)
VALUES
    (1, 'm', '1990-05-12', 35, '123 Broadway Ave, Apt 5B', 'New York', '3101234599', 'Prefiere entrenar en la mañana.'),
    (2, 'f', '1995-08-22', 30, '456 Park Avenue, Suite 10', 'New York', '3101234600', 'Alergias a algunos suplementos.'),
    (3, 'm', '1988-03-15', 37, '789 5th Avenue', 'New York', '3101234601', 'Lesión previa en rodilla derecha.'),
    (4, 'f', '1992-11-30', 33, '234 Madison Ave, Apt 12C', 'New York', '3101234602', 'Interesada en clases de yoga.'),
    (5, 'm', '1985-07-04', 40, '567 Lexington Avenue', 'New York', '3101234603', 'Entrenamiento para maratón.'),
    (6, 'f', '1998-01-25', 28, '890 West 42nd Street, Apt 15', 'New York', '3101234604', 'Primera vez en gimnasio.'),
    (7, 'm', '1991-09-18', 34, '123 Times Square, Apt 7D', 'New York', '3101234605', 'Busca entrenamiento HIIT.'),
    (8, 'f', '1993-04-05', 32, '456 Wall Street', 'New York', '3101234606', 'Prefiere clases grupales.'),
    (9, 'm', '1987-12-10', 38, '789 Canal Street, Apt 3', 'New York', '3101234607', 'Experiencia en powerlifting.'),
    (10, 'f', '2000-06-20', 25, '234 Soho Street, Apt 9B', 'New York', '3101234608', 'Objetivo: tonificar músculos.');


-- Customers Memberships
    -- Schnauzer Performance Gym
INSERT INTO Customers_Memberships (customer_id_fk, membership_type, status, duration_days, start_date, end_date)
VALUES
    (1, 'Semestral', 'active', 180, '2025-12-13', '2026-06-12'),
    (2, 'Trimestral', 'expired', 90, '2025-06-15', '2025-09-14'),
    (3, 'Mensual', 'expired', 30, '2024-01-05', '2024-02-04'),
    (4, 'Anual', 'active', 365, '2025-05-01', '2026-04-28'),
    (5, 'Trimestral', 'frozen', 90, '2025-12-15', '2026-03-14'),
    (6, 'Mensual', 'trial', 30, '2026-02-01', '2026-03-02'),
    (7, 'Semestral', 'expired', 180, '2025-03-10', '2025-09-09'),
    (8, 'Trimestral', 'expired', 90, '2025-07-13', '2025-10-11'),
    (9, 'Mensual', 'active', 30, '2026-02-20', '2026-03-21'),
    (10, 'Anual', 'active', 365, '2026-01-01', '2026-12-31');


-- Transactions
    -- Schnauzer Performance Gym
INSERT INTO Transactions (employee_id_fk, customer_id_fk, transaction_category, transaction_type, amount, payment_method, description)
VALUES
    (1, 1, 'Membresía', 'Inscripción', 210000.00, 'Tarjeta', 'Pago de membresía promo.'),
    (1, 3, 'Membresía', 'Deuda', 80000.00, 'Efectivo', 'Paga membresía que debía.'),
    (1, 5, 'Membresía', 'Renovación', 210000.00, 'Transferencia', 'Pago de renovación promo.'),
    (1, 10, 'Membresía', 'Inscripción', 840000.00, 'Nequi', 'Pago de anualidad oferta fin de año.');