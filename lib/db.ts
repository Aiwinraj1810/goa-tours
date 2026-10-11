import dns from "node:dns";

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

// On some Windows setups Node only sees 127.0.0.1 as its DNS server, which
// breaks mongodb+srv:// lookups (querySrv ECONNREFUSED). Dev-only fallback.
function ensureDevDnsServers() {
  if (process.env.NODE_ENV === "production") return;

  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

async function getClient() {
  if (!globalForMongo.__mongoClientPromise) {
    ensureDevDnsServers();
    const client = new MongoClient(getMongoUri());
    globalForMongo.__mongoClientPromise = client.connect().catch((error) => {
      globalForMongo.__mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo.__mongoClientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(getMongoDbName());
}
