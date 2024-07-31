import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Url } from './entity/Url.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'url_shortener',
  synchronize: true,
  logging: false,
  entities: [Url],
  migrations: [],
  subscribers: [],
});
