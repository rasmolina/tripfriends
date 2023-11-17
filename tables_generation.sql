CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL
);

CREATE TABLE trip (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE,
    data_fim DATE,
    criador INT,
    país VARCHAR(255),
    cidade VARCHAR(255),
    local_hospedagem VARCHAR(255),
    FOREIGN KEY (criador) REFERENCES user(id)
);

CREATE TABLE viajantes (
    trip_id INT,
    viajante_id INT,
    PRIMARY KEY (trip_id, viajante_id),
    FOREIGN KEY (trip_id) REFERENCES trip(id),
    FOREIGN KEY (viajante_id) REFERENCES user(id)
);
