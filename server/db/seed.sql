-- ==================================[  DATA INSERTS  ]================================== --
-- Gym_Dev_Accounts
INSERT INTO Gym_Dev_Accounts (gym_name, nit, hash_pass, email, role)
VALUES
    ('Sandy Gym', '445558889-9', 'sandyn123', 'sandygym@gmail.com', 'company'),
    ('Gym El Señor Biuro', '409998889-9', 'biuro123', 'elsrhermoso@gmail.com', 'company'),
    ('Camilo Jiménez', '112266677-7', 'camilo123', 'jmncamilo@gmail.com', 'dev');


-- Employees
INSERT INTO Employees (gym_id_fk, nuip, employee_name, role, hash_access_code, email, phone_number)
VALUES
    (1, '1122334524', 'Valentina De Paula', 'admin', '123455', 'pauval22@gmail.com', '3001234567'),
    (1, '1122574882', 'Laura Jobs', 'employee', '456788', 'laurat@gmail.com', '3002345678'),
    (2, '1122652123', 'Néstor Rojas', 'admin', '303033', 'nealji1223@gmail.com', '3003456789'),
    (2, '1122652745', 'Eliecer Rojas', 'employee', '987652', 'bestial09@gmail.com', '3004567890');


-- Customers
    -- Sandy Gym
INSERT INTO Customers (gym_id_fk, enrolling_employee_id_fk, nuip, first_name, first_last_name, email, phone_number, profile_image_url)
VALUES
    (1, 1, '1001234567', 'Carlos', 'Rodríguez', 'carlos.rodriguez@gmail.com', '3101234567', NULL),
    (1, 1, '1001234568', 'Ana', 'Martínez', 'ana.martinez@gmail.com', '3101234568', NULL),
    (1, 2, '1001234569', 'Juan', 'Gómez', 'juan.gomez@gmail.com', '3101234569', NULL),
    (1, 2, '1001234570', 'María', 'López', 'maria.lopez@gmail.com', '3101234570', NULL),
    (1, 1, '1001234571', 'Pedro', 'Sánchez', 'pedro.sanchez@gmail.com', '3101234571', NULL),
    (1, 2, '1001234572', 'Luisa', 'Fernández', 'luisa.fernandez@gmail.com', '3101234572', NULL),
    (1, 1, '1001234573', 'Diego', 'Ramírez', 'diego.ramirez@gmail.com', '3101234573', NULL),
    (1, 2, '1001234574', 'Sofía', 'Torres', 'sofia.torres@gmail.com', '3101234574', NULL),
    (1, 1, '1001234575', 'Andrés', 'Vargas', 'andres.vargas@gmail.com', '3101234575', NULL),
    (1, 2, '1001234576', 'Valentina', 'Castro', 'valentina.castro@gmail.com', '3101234576', NULL);

    -- Gym El Señor Biuro
INSERT INTO Customers (gym_id_fk, enrolling_employee_id_fk, nuip, first_name, first_last_name, email, phone_number, profile_image_url)
VALUES
    (2, 3, '1122620701', 'Ricardo', 'Mendoza', 'ricardo.mendoza@outlook.com', '3201234567', NULL),
    (2, 4, '1122620702', 'Paola', 'Gutiérrez', 'paola.gutierrez@hotmail.com', '3201234568', NULL),
    (2, 3, '1122620703', 'Gabriel', 'Duarte', 'gabriel.duarte@gmail.com', '3201234569', NULL),
    (2, 4, '1122620704', 'Carolina', 'Medina', 'carolina.medina@outlook.com', '3201234570', NULL),
    (2, 3, '1122620705', 'Fernando', 'Quintero', 'fernando.quintero@gmail.com', '3201234571', NULL),
    (2, 4, '1122620706', 'Daniela', 'Rojas', 'daniela.rojas@hotmail.com', '3201234572', NULL),
    (2, 3, '1122620707', 'Alejandro', 'Herrera', 'alejandro.herrera@gmail.com', '3201234573', NULL),
    (2, 4, '1122620708', 'Natalia', 'Ortiz', 'natalia.ortiz@outlook.com', '3201234574', NULL),
    (2, 3, '1122620709', 'Javier', 'Morales', 'javier.morales@gmail.com', '3201234575', NULL),
    (2, 4, '1122620710', 'Camila', 'Parra', 'camila.parra@hotmail.com', '3201234576', NULL);


-- Customers Details
    -- Sandy Gym
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

    -- Gym El Señor Biuro
INSERT INTO Customers_Details (customer_id_fk, gender, birthdate, age, address, city, emergency_phone, additional_info)
VALUES
    (11, 'm', '1985-02-15', 41, 'Calle 45 #23-18', 'Bogotá', '3201234599', 'Busca ganar masa muscular.'),
    (12, 'f', '1990-07-20', 35, 'Carrera 15 #85-43, Apto 502', 'Bogotá', '3201234600', 'Prefiere ejercicios cardiovasculares.'),
    (13, 'm', '1992-11-05', 33, 'Avenida Caracas #70-34', 'Bogotá', '3201234601', 'Lesión en hombro izquierdo.'),
    (14, 'f', '1988-03-30', 37, 'Calle 80 #14-23, Apto 301', 'Bogotá', '3201234602', 'Interesada en pilates.'),
    (15, 'm', '1995-09-12', 30, 'Carrera 7 #45-12', 'Bogotá', '3201234603', 'Objetivo: definición muscular.'),
    (16, 'f', '1987-05-18', 38, 'Calle 116 #9-25, Apto 704', 'Bogotá', '3201234604', 'Experiencia en crossfit.'),
    (17, 'm', '1993-08-25', 32, 'Carrera 19 #104-56', 'Bogotá', '3201234605', 'Entrenamiento para competencia.'),
    (18, 'f', '1996-12-08', 29, 'Calle 53 #27-15, Apto 201', 'Bogotá', '3201234606', 'Busca mejorar flexibilidad.'),
    (19, 'm', '1989-04-22', 36, 'Avenida Suba #127-15', 'Bogotá', '3201234607', 'Necesita rutina para bajar de peso.'),
    (20, 'f', '1994-10-15', 31, 'Carrera 11 #93-46, Apto 602', 'Bogotá', '3201234608', 'Primera experiencia en gimnasio.');


-- Customers Memberships
    -- Sandy Gym
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

    -- Gym El Señor Biuro
INSERT INTO Customers_Memberships (customer_id_fk, membership_type, status, duration_days, start_date, end_date)
VALUES
    (11, 'Semestral', 'active', 180, '2025-10-13', '2026-04-12'),
    (12, 'Trimestral', 'active', 90, '2025-12-13', '2026-03-12'),
    (13, 'Mensual', 'expired', 30, '2024-01-05', '2024-02-04'),
    (14, 'Anual', 'active', 365, '2025-04-23', '2026-04-22'),
    (15, 'Trimestral', 'frozen', 90, '2025-06-15', '2025-09-14'),
    (16, 'Mensual', 'trial', 30, '2026-02-01', '2026-03-02'),
    (17, 'Semestral', 'expired', 180, '2025-04-10', '2025-10-09'),
    (18, 'Trimestral', 'expired', 90, '2025-07-13', '2025-10-11'),
    (19, 'Mensual', 'cancelled', 30, '2025-03-20', '2025-04-19'),
    (20, 'Anual', 'active', 365, '2025-04-10', '2026-04-09');


-- Transactions
    -- Sandy Gym
INSERT INTO Transactions (employee_id_fk, customer_id_fk, transaction_category, transaction_type, amount, payment_method, description)
VALUES
    (1, 1, 'Membresía', 'Inscripción', 210000.00, 'Tarjeta', 'Pago de membresía promo.'),
    (2, 3, 'Membresía', 'Deuda', 80000.00, 'Efectivo', 'Paga membresía que debía.'),
    (1, 5, 'Membresía', 'Renovación', 210000.00, 'Transferencia', 'Pago de renovación promo.'),
    (2, 10, 'Membresía', 'Inscripción', 840000.00, 'Nequi', 'Pago de anualidad oferta fin de año.');

    -- Gym El Señor Biuro
INSERT INTO Transactions (employee_id_fk, customer_id_fk, transaction_category, transaction_type, amount, payment_method, description)
VALUES
    (3, 11, 'Membresía', 'Inscripción', 420000.00, 'Tarjeta', 'Pago de seis(6) meses promo.'),
    (4, 13, 'Membresía', 'Deuda', 80000.00, 'Efectivo', 'Paga membresía que debía.'),
    (3, 15, 'Membresía', 'Renovación', 210000.00, 'Transferencia', 'Pago de renovación promo.'),
    (4, 19, 'Membresía', 'Inscripción', 80000.00, 'Daviplata', 'Pago de mensualidad.');