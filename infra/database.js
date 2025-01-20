import { Client } from "pg";

async function query(sql) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(sql);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

function getSSLValues() {
  process.env.NODE_ENV === "production" ? true : false;
}

export default {
  query,
  getNewClient,
};
