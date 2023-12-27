require("dotenv").config();
const { Pool } = require("pg");

// Configuración de credenciales
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true,
});

const getJoyas = async (extras, values) => {
  const consulta = `SELECT * FROM inventario ${extras}`;
  const { rows } = await pool.query(consulta, values)
  return rows
};
