DROP TABLE IF EXISTS homebrew;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS users ;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    user_password TEXT,
    user_isAdmin BOOLEAN DEFAULT false
);
CREATE TABLE campaigns(
    campaign_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    members VARCHAR(25),
    title VARCHAR(50),
    campaign_desc VARCHAR(5000)
);
CREATE TABLE homebrew(
    homebrew_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    category VARCHAR(10),
    homebrew_name VARCHAR(50),
    homebrew_desc VARCHAR(50)
);

CREATE TABLE characters(
    character_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    character_name TEXT,
    character_stats TEXT,
    character_class TEXT,
    character_subclass TEXT,
    character_level INT,
    character_curr_campaign INT REFERENCES campaigns(campaign_id),
    character_inventory TEXT,
    character_background TEXT,
    character_proficiencies TEXT,
    character_skills TEXT,
    character_languages TEXT,
    character_bonds TEXT,
    character_flaws TEXT,
    character_ideals TEXT,
    character_race VARCHAR(75)
);


