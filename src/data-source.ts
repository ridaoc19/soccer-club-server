import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import * as allEntities from "./entity";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'soccerclub',
  synchronize: true, // Auto-create tables (dev only)
  logging: false,
  // entities: Object.values(allEntities),
  entities: [],
  subscribers: [],
  migrations: [],
});
