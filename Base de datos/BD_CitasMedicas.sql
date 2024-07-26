-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT CITASMEDICAS
        FROM sys.databases
        WHERE CITASMEDICAS = 'CITASMEDICAS'
)
CREATE DATABASE CITASMEDICAS
GO

USE CITASMEDICAS

CREATE TABLE PACIENTE(
    id_paciente INT(11) NOT NULL_INCREMENT PRIMARY KEY,
    nom_paciente VARCHAR(50) NOT NULL,
    fecha_nac DATE NOT NULL,
    genero CHAR(10) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    tipo_sangre CHAR(4) NOT NULL,
    padecimiento VARCHAR(30) NOT NULL,
    curp CHAR(18) NOT NULL,
    num_telefono INT NOT NULL,
    correo_electronico VARCHAR(40) NOT NULL
);


CREATE TABLE SESION(
    usuario VARCHAR(20) NOT NULL PRIMARY KEY,
    id_paciente  INT NOT NULL,
    contraseña VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente) 
);


CREATE TABLE CITA(
    id_cita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente),
    FOREIGN KEY (id_doctor) REFERENCES DOCTOR(id_doctor)
);


CREATE TABLE DOCTOR(
     id_doctor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_horario INT NOT NULL,
    ncm_doc VARCHAR(50) NOT NULL,
    tipo_doctor VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_horario) REFERENCES HORARIO(id_doctor)
);


CREATE TABLE HORARIO(
    id_doctor INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    PRIMARY KEY (id_doctor)
);


CREATE TABLE DOCTOR_ESPECIALIDAD(
    id_especialidad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ncm_especialidad VARCHAR(50) NOT NULL
);



CREATE TABLE ESPECIALIDAD(
    id_especialidad INT NOT NULL,
    id_doctor INT NOT NULL,
    FOREIGN KEY (id_especialidad) REFERENCES ESPECIALIDAD(id_especialidad),
    FOREIGN KEY (id_doctor) REFERENCES DOCTOR(id_doctor)
);