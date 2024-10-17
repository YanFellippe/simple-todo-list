CREATE DATABASE todo_db;
USE todo_db;

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,       
    title VARCHAR(100) NOT NULL,             
    status VARCHAR(50) NOT NULL DEFAULT 'pendente'  
);

SELECT * FROM task;

DESCRIBE task;