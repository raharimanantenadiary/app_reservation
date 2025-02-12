-- database/seeds/seed.sql

-- mot de passe pour tous les comptes : Password123

INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES
('Admin',   'Super',  'admin@reservation.com',    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Dupont',  'Jean',   'jean.dupont@gmail.com',     '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'utilisateur'),
('Martin',  'Sophie', 'sophie.martin@gmail.com',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'utilisateur');


INSERT INTO restaurants (nom, description, adresse, telephone, email) VALUES
('Le Baobab',      'Restaurant malgache traditionnel au coeur de la ville', '12 rue de lIndependance, Antananarivo', '034 00 000 01', 'contact@lebaobab.mg'),
('Chez Tata Rosa', 'Cuisine familiale et plats du jour faits maison',        '45 avenue de France, Antananarivo',     '034 00 000 02', 'contact@cheztatarosa.mg'),
('Le Rooftop',     'Restaurant panoramique avec vue sur la ville',           '8 rue Pasteur, Antananarivo',           '034 00 000 03', 'contact@lerooftop.mg'),
('Pizza Mada',     'Pizzas artisanales et pasta italiennes',                 '23 boulevard de lOcean, Antananarivo',  '034 00 000 04', 'contact@pizzamada.mg'),
('Le Jardin',      'Restaurant en plein air dans un cadre verdoyant',        '67 rue des Fleurs, Antananarivo',       '034 00 000 05', 'contact@lejardin.mg');


INSERT INTO creneaux (restaurant_id, jour_semaine, heure_debut, capacite_max)
SELECT id, 0, '12:00'::time, 20 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 0, '13:00'::time, 20 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 0, '19:00'::time, 30 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 0, '20:00'::time, 30 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 1, '12:00'::time, 20 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 1, '19:00'::time, 30 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 5, '12:00'::time, 40 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 5, '19:00'::time, 40 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 6, '12:00'::time, 40 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL
SELECT id, 6, '19:00'::time, 40 FROM restaurants WHERE nom = 'Le Baobab' UNION ALL

SELECT id, 0, '12:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 0, '19:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 1, '12:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 1, '19:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 2, '12:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 3, '12:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL
SELECT id, 4, '12:00'::time, 15 FROM restaurants WHERE nom = 'Chez Tata Rosa' UNION ALL

SELECT id, 0, '19:00'::time, 25 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 0, '20:00'::time, 25 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 4, '19:00'::time, 25 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 4, '20:00'::time, 25 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 5, '19:00'::time, 40 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 5, '20:00'::time, 40 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 6, '19:00'::time, 40 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL
SELECT id, 6, '20:00'::time, 40 FROM restaurants WHERE nom = 'Le Rooftop' UNION ALL

SELECT id, 0, '12:00'::time, 20 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 0, '19:00'::time, 20 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 1, '12:00'::time, 20 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 1, '19:00'::time, 20 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 5, '12:00'::time, 35 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 5, '19:00'::time, 35 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 6, '12:00'::time, 35 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL
SELECT id, 6, '19:00'::time, 35 FROM restaurants WHERE nom = 'Pizza Mada' UNION ALL

SELECT id, 0, '12:00'::time, 30 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 0, '19:00'::time, 30 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 2, '12:00'::time, 30 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 3, '12:00'::time, 30 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 4, '12:00'::time, 30 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 5, '12:00'::time, 50 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 5, '19:00'::time, 50 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 6, '12:00'::time, 50 FROM restaurants WHERE nom = 'Le Jardin' UNION ALL
SELECT id, 6, '19:00'::time, 50 FROM restaurants WHERE nom = 'Le Jardin';