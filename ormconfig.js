require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    "src/core/data/database/entities/**/*.js",
    // "dist/core/data/database/entities/**/*.entity.js",
  ],
  migrations: ["src/core/data/database/migrations/**/*.js"],
  cli: {
    entitiesDir: "src/core/data/database/entities",
    migrationsDir: "src/core/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
