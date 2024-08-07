CREATE DATABASE IF NOT EXISTS citasmedicas;
USE citasmedicas;

-- Tabla Rol
CREATE TABLE rol (
    id_rol CHAR(5) NOT NULL PRIMARY KEY,
    tipo_rol VARCHAR(20) NOT NULL
);

-- Tabla Sesion
CREATE TABLE sesion (
    usuario VARCHAR(20) NOT NULL PRIMARY KEY,
    id_rol CHAR(5) NOT NULL,
    contraseña VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Tabla Paciente
CREATE TABLE paciente (
    id_paciente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(20) NOT NULL,
    nom_paciente VARCHAR(50) NOT NULL,
    fecha_nac DATE NOT NULL,
    genero CHAR(10) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    tipo_sangre CHAR(4) NOT NULL,
    padecimiento VARCHAR(30),
    curp CHAR(18) NOT NULL,
    num_telefono INT NOT NULL,
    correo_electronico VARCHAR(40) NOT NULL,
    FOREIGN KEY (usuario) REFERENCES sesion(usuario)
);

-- Tabla Doctor
CREATE TABLE doctor (
    id_doctor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(20) NOT NULL,
    id_horario INT NOT NULL,
    ncmre_doc VARCHAR(50) NOT NULL,
    tipo_doctor VARCHAR(20) NOT NULL,
    FOREIGN KEY (usuario) REFERENCES sesion(usuario)
);

-- Tabla Administrador
CREATE TABLE administrador (
    id_administrador VARCHAR(5) NOT NULL PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    id_doctor INT NOT NULL,
    nmbre_adm VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario) REFERENCES sesion(usuario),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Tabla Horario
CREATE TABLE horario (
    id_doctor INT NOT NULL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Tabla Cita
CREATE TABLE cita (
    id_cita INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    fecha DATE NOT NULL,
    hora INT NOT NULL,
    estado VARCHAR NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Tabla Especialidad
CREATE TABLE especialidad (
    id_especialidad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ncm_especialidad VARCHAR(50) NOT NULL
);

-- Tabla Doctor_Especialidad
CREATE TABLE doctor_especialidad (
    id_especialidad INT NOT NULL,
    id_doctor INT NOT NULL,
    PRIMARY KEY (id_especialidad, id_doctor),
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad),
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);
