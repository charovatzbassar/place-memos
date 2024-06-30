import * as SQLite from "expo-sqlite";

export const initDb = () => {
  const db = SQLite.openDatabaseSync("places.db");

  db.execSync(
    `CREATE TABLE IF NOT EXISTS places (
        id TEXT NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        long REAL NOT NULL
      );`
  );

  return db;
};
