const { Client } = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'https://localhost:5432/topsecret';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

client.connect()

module.exports = client;

// clear
