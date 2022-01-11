require("dotenv").config();

const rootDir =
  process.env.NODE_ENV?.toLowerCase() === "production" ? "dist" : "src";

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    rootDir + "/core/data/database/entities/**/*",
    // "dist/core/data/database/entities/**/*.entity.js",
  ],
  migrations: [rootDir + "/core/data/database/migrations/**/*"],
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
