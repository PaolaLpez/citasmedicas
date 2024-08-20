-- Crear la base de datos solo si no existe
CREATE DATABASE IF NOT EXISTS citasmedicas;
USE citasmedicas;

-- Crear tabla rol
CREATE TABLE IF NOT EXISTS rol (
    id_rol INT NOT NULL PRIMARY KEY,
    tipo_rol VARCHAR(20) NOT NULL
);

-- Crear tabla horario
CREATE TABLE IF NOT EXISTS horario (
    id_horario INT NOT NULL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Crear tabla paciente
CREATE TABLE IF NOT EXISTS paciente (
    id_paciente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nom_paciente VARCHAR(60) NOT NULL,
    fecha_nac DATE NOT NULL,
    genero CHAR(10) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    tipo_sangre CHAR(4) NOT NULL,
    curp CHAR(18) NOT NULL,
    num_telefono VARCHAR(15) NOT NULL,
    correo_electronico CHAR(60) NOT NULL UNIQUE,
    contrasena char(20) NOT NULL,
    CONSTRAINT FK_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Crear tabla especialidad
CREATE TABLE IF NOT EXISTS especialidad (
    id_especialidad INT NOT NULL PRIMARY KEY,
    nombre_especialidad VARCHAR(60) NOT NULL
);

-- Crear tabla doctor
CREATE TABLE IF NOT EXISTS doctor (
    id_doctor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    id_especialidad INT NOT NULL,
    id_horario INT NOT NULL,
    nombre_doc VARCHAR(50) NOT NULL,
    tipo_doctor VARCHAR(20) NOT NULL,
    correo_electronico CHAR(60) NOT NULL UNIQUE,
    contrasena char(20) NOT NULL,
    FOREIGN KEY (id_horario) REFERENCES horario(id_horario),
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Crear tabla doctor_especialidad
CREATE TABLE IF NOT EXISTS doctor_especialidad (
    id_especialidad INT NOT NULL,
    id_doctor INT NOT NULL,
    PRIMARY KEY (id_especialidad, id_doctor),
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Crear tabla administrador
CREATE TABLE IF NOT EXISTS administrador (
    id_administrador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre_adm VARCHAR(60) NOT NULL,
    correo_electronico CHAR(60) NOT NULL UNIQUE,  
    contrasena char(20) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)    
);

-- Crear tabla cita
CREATE TABLE IF NOT EXISTS cita (
    id_cita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    nombre_especialidad VARCHAR(60) NOT NULL,
    nombre_doc VARCHAR(60) NOT NULL,
    nom_paciente VARCHAR(60) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Describir la base de datos para verificar
DESCRIBE rol;
DESCRIBE paciente;
DESCRIBE doctor;
DESCRIBE administrador;
DESCRIBE horario;
DESCRIBE cita;
DESCRIBE especialidad;
DESCRIBE doctor_especialidad;
