import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  const client = new MongoClient(uri);
  
  await client.connect();
  const db = client.db('NBAdatabase');

  cachedClient = client;
  cachedDb = db;

  return { db, client };
}
