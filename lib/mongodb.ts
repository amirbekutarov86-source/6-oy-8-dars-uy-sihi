import { MongoClient, type Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI .env faylida topilmadi");

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 4000,
    }).connect();
  }

  try {
    const client = await global._mongoClientPromise;
    return client.db(process.env.MONGODB_DB || "appliances");
  } catch (error) {
    global._mongoClientPromise = undefined; // keyingi so'rovda qayta urinadi
    throw error;
  }
}
