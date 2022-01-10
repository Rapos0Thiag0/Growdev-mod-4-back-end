require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    // "dist/core/data/database/entities/**/*",
    "dist/core/data/database/entities/**/*.entity.js",
  ],
  migrations: ["dist/core/data/database/migrations/**/*"],
  cli: {
    entitiesDir: "dist/core/data/database/entities",
    migrationsDir: "dist/core/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
