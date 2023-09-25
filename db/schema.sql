DROP DATABASE IF EXISTS inventory_db;

CREATE DATABASE inventory_db;

-- -- Create the departments table
-- CREATE TABLE departments (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL
-- );

-- -- Create the roles (job titles) table
-- CREATE TABLE roles (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   salary DECIMAL(10, 2) NOT NULL,
--   department_id INT,
--   FOREIGN KEY (department_id) REFERENCES departments(id)
-- );

-- -- Create the employees table
-- CREATE TABLE employees (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(255) NOT NULL,
--   last_name VARCHAR(255) NOT NULL,
--   role_id INT,
--   manager_id INT,
--   FOREIGN KEY (role_id) REFERENCES roles(id),
--   FOREIGN KEY (manager_id) REFERENCES employees(id)
-- );