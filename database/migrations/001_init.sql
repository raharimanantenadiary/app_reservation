CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS utilisateurs (
    id           UUID         DEFAULT uuid_generate_v4() PRIMARY KEY,
    nom          VARCHAR(100) NOT NULL,
    prenom       VARCHAR(100) NOT NULL,
    email        VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role         VARCHAR(20)  NOT NULL DEFAULT 'utilisateur',
    cree_le      TIMESTAMP    DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS restaurants (
    id          UUID         DEFAULT uuid_generate_v4() PRIMARY KEY,
    nom         VARCHAR(150) NOT NULL,
    description TEXT,
    adresse     VARCHAR(255) NOT NULL,
    telephone   VARCHAR(20),
    email       VARCHAR(150),
    image_url   VARCHAR(255),
    est_actif   BOOLEAN      DEFAULT true,
    cree_le     TIMESTAMP    DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS creneaux (
    id            UUID     DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID     NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    jour_semaine  SMALLINT NOT NULL CHECK (jour_semaine BETWEEN 0 AND 6),
    heure_debut   TIME     NOT NULL,
    capacite_max  SMALLINT NOT NULL CHECK (capacite_max > 0),
    est_actif     BOOLEAN  DEFAULT true
);


CREATE TABLE IF NOT EXISTS reservations (
    id               UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
    utilisateur_id   UUID        NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    restaurant_id    UUID        NOT NULL REFERENCES restaurants(id)  ON DELETE CASCADE,
    creneau_id       UUID        NOT NULL REFERENCES creneaux(id)     ON DELETE CASCADE,
    date_reservation DATE        NOT NULL,
    nb_personnes     SMALLINT    NOT NULL CHECK (nb_personnes > 0),
    statut           VARCHAR(20) NOT NULL DEFAULT 'en_attente',
    qrcode_token     UUID        DEFAULT uuid_generate_v4(),
    cree_le          TIMESTAMP   DEFAULT NOW(),

    CONSTRAINT statut_valide CHECK (statut IN ('en_attente', 'confirmee', 'refusee', 'annulee'))
);


CREATE INDEX IF NOT EXISTS idx_creneaux_restaurant       ON creneaux(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_utilisateur  ON reservations(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_reservations_restaurant   ON reservations(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date         ON reservations(date_reservation);