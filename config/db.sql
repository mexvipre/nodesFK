-- Crear base de datos
create DATABASE terminal_buses;
USE terminal_buses;

-- Crear tabla de pasajeros
CREATE TABLE pasajeros (
    id_pasajero INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL
);

-- Crear tabla de buses (con número de asientos)
CREATE TABLE buses (
    id_bus INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL,
    ruta VARCHAR(100) NOT NULL,
    cantidad_asientos INT NOT NULL -- Número total de asientos disponibles en el bus
);

-- Crear tabla de pasajes (reservas de asiento)
CREATE TABLE pasajes (
    id_pasaje INT AUTO_INCREMENT PRIMARY KEY,
    id_pasajero INT,
    id_bus INT,
    fecha_viaje DATE NOT NULL,
    asiento INT NOT NULL, -- Asiento asignado
    FOREIGN KEY (id_pasajero) REFERENCES pasajeros(id_pasajero),
    FOREIGN KEY (id_bus) REFERENCES buses(id_bus)
);


-- Insertar algunos pasajeros
INSERT INTO pasajeros (nombre, dni) VALUES ('Luis Martínez', '12345678');
INSERT INTO pasajeros (nombre, dni) VALUES ('Sofía Ramírez', '87654321');
INSERT INTO pasajeros (nombre, dni) VALUES ('Carlos Méndez', '23456789');
INSERT INTO pasajeros (nombre, dni) VALUES ('Ana Torres', '98765432');
INSERT INTO pasajeros (nombre, dni) VALUES ('Miguel Ángel', '34567890');
INSERT INTO pasajeros (nombre, dni) VALUES ('Patricia López', '45678901');
INSERT INTO pasajeros (nombre, dni) VALUES ('Fernando Díaz', '56789012');

-- Insertar algunos buses con diferentes números de asientos
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('ABC123', 'Lima - Cusco', 40);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('DEF456', 'Lima - Arequipa', 35);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('GHI789', 'Lima - Trujillo', 30);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('JKL012', 'Cusco - Puno', 28);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('MNO345', 'Arequipa - Lima', 32);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('PQR678', 'Trujillo - Lima', 36);
INSERT INTO buses (placa, ruta, cantidad_asientos) VALUES ('STU901', 'Lima - Ica', 30);

-- Insertar pasajes (reservas de asientos por pasajeros)
INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (1, 1, '2025-05-01', 12);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (2, 2, '2025-05-02', 8);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (3, 3, '2025-05-03', 5);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (4, 4, '2025-05-04', 15);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (5, 5, '2025-05-05', 9);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (6, 6, '2025-05-06', 3);

INSERT INTO pasajes (id_pasajero, id_bus, fecha_viaje, asiento)
VALUES (7, 7, '2025-05-07', 1);



DELIMITER $$

CREATE PROCEDURE eliminar_pasaje(IN pasaje_id INT)
BEGIN
    DELETE FROM pasajes WHERE id_pasaje = pasaje_id;
END $$

DELIMITER ;



