INSERT INTO personajes (nombre, apellido, ocupacion, descripcion) VALUES
('Homer', 'Simpson', 'Inspector de seguridad nuclear', 'Padre de familia, amante de las rosquillas y la siesta'),
('Marge', 'Simpson', 'Ama de casa', 'Paciente y sensata, mantiene unida a la familia'),
('Bart', 'Simpson', 'Estudiante', 'Travieso y rebelde, famoso por su patineta'),
('Lisa', 'Simpson', 'Estudiante', 'Inteligente, activista y amante del jazz'),
('Mr.', 'Burns', 'Dueño de la planta nuclear', 'Anciano millonario, símbolo de la avaricia'),
('Milhouse', 'Van Houten', 'Estudiante', 'Mejor amigo de Bart, ingenuo y sensible');

INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
('Bart Gets an F', 1, 2, '1990-10-11', 'Bart intenta aprobar el examen final para no repetir curso'),
('Lisa the Vegetarian', 5, 7, '1995-10-15', 'Lisa decide dejar de comer carne tras visitar una granja'),
('Homer vs. Lisa and the 8th Commandment', 13, 2, '1991-02-07', 'Lisa cuestiona la moralidad de robar cable'),
('Treehouse of Horror V', 6, 6, '1994-10-30', 'Especial de Halloween con tres historias de terror'),
('Mr. Plow', 9, 4, '1992-11-19', 'Homer inicia un negocio de quitanieves');

INSERT INTO frases (texto, marca_tiempo, descripcion, fk_id) VALUES
("¡D'oh!", '00:01', 'Expresión clásica de frustración de Homer', 1),
("¡Ay, caramba!", '00:03', 'Frase típica de Bart ante el caos', 3),
("Excelente...", '00:05', 'Susurro malévolo de Mr. Burns', 5),
("¡Multiplícate por cero!", '00:07', 'Insulto absurdo de Bart', 3),
("¿Y si nos equivocamos de religión? Dios estaría más furioso cada semana.", '00:10', 'Reflexión absurda de Homer', 1),
("Los vampiros son seres inventados, como los duendes, los gremlins y los esquimales.", '00:12', 'Confusión total de Homer', 1);

INSERT INTO personajes_capitulos (personaje_id, capitulo_id) VALUES
(1, 1), -- Homer en "Bart Gets an F"
(3, 1), -- Bart en "Bart Gets an F"
(4, 2), -- Lisa en "Lisa the Vegetarian"
(1, 2), -- Homer también aparece
(5, 5), -- Mr. Burns en "Mr. Plow"
(2, 1), -- Marge en "Bart Gets an F"
(6, 1); -- Milhouse en "Bart Gets an F"
