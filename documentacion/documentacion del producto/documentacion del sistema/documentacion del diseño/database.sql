CREATE DATABASE IF NOT EXISTS taskmanager;

USE taskmanager;

CREATE TABLE IF NOT EXISTS USERS(
    id INT(255) auto_increment not null,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at datetime,
    updated_at datetime,
    remember_token VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE = InnoDb;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    description VARCHAR2(255),
    status boolean,
    created_at datetime,
    completed_at datetime,
    CONSTRAINT pk_tasks PRIMARY KEY(id),
    CONSTRAINT fk_tasks_users FOREIGN KEY(user_id) REFERENCES users(id);
)ENGINE = InnoDb;