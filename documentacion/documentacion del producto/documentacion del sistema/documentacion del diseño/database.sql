CREATE USER 'tasks-bunner'@'database_name' IDENTIFIED BY 'password';
#GRANT ALL PRIVILEGES ON * . * TO 'new_user'@'localhost';
#REVOKE ALL PRIVILEGES ON * . * FROM 'user_name'@'localhost';
GRANT CREATE,SELECT,INSERT,UPDATE,DELETE,DROP ON database_name.* TO 'tasks-bunner'@'database_name';
#REVOKE PERMISSION_TYPE ON database_name.table_name FROM ‘user_name’@‘localhost’;
SHOW GRANTS FOR 'tasks-bunner'@'database_name';
-- CREATE — enable users to create a database or table
-- SELECT — permit users to retrieve data
-- INSERT — let users add new entries in tables
-- UPDATE — allow users to modify existing entries in tables
-- DELETE — enable users to erase table entries
-- DROP — let users delete entire database tables

CREATE DATABASE IF NOT EXISTS `tasks-bunner`;

USE `tasks-bunner`;

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

CREATE TABLE IF NOT EXISTS TASKS (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    description VARCHAR(255),
    status boolean,
    created_at datetime,
    completed_at datetime,
    CONSTRAINT pk_tasks PRIMARY KEY(id),
    CONSTRAINT fk_tasks_users FOREIGN KEY(user_id) REFERENCES USERS(id)
)ENGINE = InnoDb;