DROP TABLE IF EXISTS homebrew;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS users ;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username UNIQUE VARCHAR(50),
    user_password TEXT,
    user_isAdmin BOOLEAN DEFAULT false
);
CREATE TABLE campaigns(
    campaign_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(50),
    campaign_desc VARCHAR(5000)
);
CREATE TABLE homebrew(
    homebrew_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    category VARCHAR(10),
    homebrew_name VARCHAR(50)
);
CREATE TABLE characters(
    character_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    character_name VARCHAR(50),
    character_stats VARCHAR(12),
    character_class VARCHAR(50),
    character_subclass VARCHAR(50),
    character_level INT,
    character_curr_campaign INT REFERENCES campaigns(campaign_id),
    -- maybe give it's own table
    character_items VARCHAR(5000)
);
