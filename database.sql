
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "favorites"(
	"id" SERIAL PRIMARY KEY,
	"recipe_id" INT,
	"recipe_img" VARCHAR,
	"recipe_name" VARCHAR,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "saved"(
	"id" SERIAL PRIMARY KEY,
	"recipe_id" INT,
	"recipe_img" VARCHAR,
	"recipe_name" VARCHAR,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "user_recipes"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"img_url" VARCHAR,
	"credit" VARCHAR,
	"cook_time" INT,
	"servings" INT,
	"ingredients" VARCHAR,
	"instructions" VARCHAR,
	"user_id" INT REFERENCES "user"
);