import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>;
};

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing required environment variable: MONGODB_URI");
  return uri;
}

function getMongoDbName() {
  const name = process.env.MONGODB_DB_NAME;
  if (!name) throw new Error("Missing required environment variable: MONGODB_DB_NAME");
  return name;
}

async function getClient() {
  if (!globalForMongo.__mongoClientPromise) {
    const client = new MongoClient(getMongoUri());
    globalForMongo.__mongoClientPromise = client.connect();
  }
  return globalForMongo.__mongoClientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(getMongoDbName());
}
