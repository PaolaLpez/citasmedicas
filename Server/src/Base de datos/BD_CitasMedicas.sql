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
    hora_inicio Char(10) NOT NULL,
    hora_fin Char(10) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Crear tabla especialidad
CREATE TABLE IF NOT EXISTS especialidad (
    id_especialidad INT NOT NULL PRIMARY KEY,
    nombre_especialidad VARCHAR(60) NOT NULL
);

-- Crear tabla usuario (combina pacientes, doctores y administradores)
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    fecha_nac DATE NULL, -- Opcional, solo para pacientes
    genero CHAR(10) NULL, -- Opcional, solo para pacientes
    direccion VARCHAR(60) NULL, -- Opcional, solo para pacientes
    tipo_sangre CHAR(4) NULL, -- Opcional, solo para pacientes
    curp CHAR(18) NULL, -- Opcional, solo para pacientes
    num_telefono VARCHAR(15) NULL, -- Opcional, solo para pacientes
    id_especialidad INT NULL, -- Opcional, solo para doctores
    id_horario INT NULL, -- Opcional, solo para doctores
    correo_electronico CHAR(60) NOT NULL UNIQUE,
    contrasena CHAR(50) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad),
    FOREIGN KEY (id_horario) REFERENCES horario(id_horario)
);

-- Crear tabla cita (asocia citas con pacientes y doctores)
CREATE TABLE IF NOT EXISTS cita (
    id_cita INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    nombre_especialidad VARCHAR(60) NOT NULL,
    nombre_doc VARCHAR(60) NOT NULL,
    nom_paciente VARCHAR(60) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES usuario(id_usuario), -- Relaciona con la tabla usuario
    FOREIGN KEY (id_doctor) REFERENCES usuario(id_usuario) -- Relaciona con la tabla usuario
);

-- Describir la base de datos para verificar
DESCRIBE rol;
DESCRIBE horario;
DESCRIBE especialidad;
DESCRIBE usuario;
DESCRIBE cita;