// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://abelcna2002:kUVInOSbpzoIoUf6@nbadatabase.y2adabb.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
  if (!client.isConnected()) await client.connect();
  const db = client.db('NBAdatabase');
  return { db, client };
}
