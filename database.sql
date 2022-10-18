CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(50) UNIQUE NOT NULL,
	"password" VARCHAR(75) UNIQUE NOT NULL,
	"firstname" VARCHAR(75) NOT NULL,
	"lastname" VARCHAR(75) NOT NULL,
	"email" VARCHAR(500) UNIQUE NOT NULL,
	"picture" VARCHAR(3000),
	"bio" VARCHAR(1000),
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);

INSERT INTO "users" ("username", "password", "firstname", "lastname", "email", "admin")
VALUES ('thedavewave', 'password', 'David', 'Lindberg', 'david.wesley.lindberg@gmail.com', 'true');

CREATE TABLE "fountains" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT,	-- Make this optional 
	"latitude" DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"picture" VARCHAR(3000) NOT NULL,
	"laminar_flow" BOOLEAN DEFAULT 'false',
	"turbulent_flow" BOOLEAN DEFAULT 'false',
	"bottle_accessible" BOOLEAN DEFAULT 'false',
	"quality" DECIMAL DEFAUlT '1.0',
	"rating" DECIMAL DEFAULT '1.0',
	"appearance" DECIMAL DEFAULT '1.0',
	"outdoor" BOOLEAN DEFAULT 'false',
	"indoor" BOOLEAN DEFAULT 'false'
);

INSERT INTO "fountains" ("user_id", "latitude", "longitude", "picture", "turbulent_flow", "bottle_accessible", "quality", "rating", "appearance", "indoor")
VALUES ('1', '46.8776563', '-96.7882843', 'public/images/eda-fountain1.jpeg', 'true', 'true', '4.1', '3.9', '2.3', 'true');


CREATE TABLE "threads" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"fountain_id" BIGINT REFERENCES "fountains",
	"title" VARCHAR(500) NOT NULL,
	"body" TEXT NOT NULL,
	"likes" BIGINT NOT NULL DEFAULT '0',
	"date" TIMESTAMP NOT NULL
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"thread_id" BIGINT REFERENCES "threads",
	"comment" TEXT NOT NULL,
	"likes" BIGINT NOT NULL DEFAULT '0',
	"date" TIMESTAMP NOT NULL
);



