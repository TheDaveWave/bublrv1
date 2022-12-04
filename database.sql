CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(50) UNIQUE NOT NULL,
	"password" VARCHAR(75) UNIQUE NOT NULL,
	"firstname" VARCHAR(75), -- Optional
	"lastname" VARCHAR(75), -- Optional
	"email" VARCHAR(500) UNIQUE NOT NULL,
	"picture" VARCHAR(3000),
	"bio" VARCHAR(1000),
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "fountains" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"latitude" DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"picture" VARCHAR(3000) NOT NULL,
	"laminar_flow" BOOLEAN DEFAULT 'false',
	"turbulent_flow" BOOLEAN DEFAULT 'false',
	"bottle_accessible" BOOLEAN DEFAULT 'false',
	"outdoor" BOOLEAN DEFAULT 'false',
	"indoor" BOOLEAN DEFAULT 'false'
);

CREATE UNIQUE INDEX "fountains_latitude_longitude" ON "public"."fountains"("latitude","longitude");

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"fountain_id" BIGINT REFERENCES "fountains",
	"body" VARCHAR(500) NOT NULL,
	"likes" BIGINT NOT NULL DEFAULT '0',
	"date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ratings" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"fountain_id" BIGINT REFERENCES "fountains",
	"rating" DECIMAL DEFAULT '0',
	"likes" BIGINT DEFAULT '0',
	UNIQUE ("user_id", "fountain_id")
);

ALTER TABLE "public"."ratings" ALTER COLUMN "rating" SET DEFAULT 0;

CREATE TABLE "replies" (
	"id" SERIAL PRIMARY KEY,
	"user_id" BIGINT REFERENCES "users",
	"comment_id" BIGINT REFERENCES "comments",
	"body" VARCHAR(500) NOT NULL,
	"likes" BIGINT NOT NULL DEFAULT '0',
	"date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Test data for users
INSERT INTO "users" ("username", "password", "firstname", "lastname", "email", "admin")
VALUES ('admin', '1234', 'admin', 'admin', 'admin@admin.com', 'true');

-- Test data for fountains
INSERT INTO "fountains" ("user_id", "latitude", "longitude", "picture", "turbulent_flow", "bottle_accessible", "indoor")
VALUES ('1', '46.8776563', '-96.7882843', 'images/eda-fountain1.jpeg', 'true', 'true', 'true');
INSERT INTO "fountains" ("user_id", "latitude", "longitude", "picture", "turbulent_flow", "bottle_accessible", "outdoor") 
VALUES('1', '46.9249837', ' q', 'images/eda-fountain1.jpeg', 'true', 'true', 'true');

-- Some test data for comments
INSERT INTO "comments" ("user_id", "fountain_id", "body")
VALUES ('1', '1', 'This fountain is super cool!');
INSERT INTO "comments" ("user_id", "fountain_id", "body")
VALUES ('1', '1', 'WOW!');

-- Test data for ratings
INSERT INTO "ratings" ("user_id", "fountain_id", "rating")
VALUES ('1', '1', '4.9');
INSERT INTO "ratings" ("user_id", "fountain_id", "rating")
VALUES ('1', '1', '3.8');

