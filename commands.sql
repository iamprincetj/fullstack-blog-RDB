CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (title, author, url) values ("hello I'm Justin", "Justin", "https://google.com")
INSERT INTO blogs (title, author, url) values ("sequelize is the best", "Justin", "https://sequelize.com")