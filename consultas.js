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
  const { rows } = await pool.query(consulta, values);
  return rows;
};

// Inicialización de cláusula de consultas
const buildQueryClauses = (queryStrings) => {
  let clauses = "";
  const { limits, page, order_by } = queryStrings;

  clauses = order_by
    ? `ORDER BY ${order_by.split("_")[0]} ${order_by.split("_")[1]}`
    : "";
  clauses += limits ? ` LIMIT ${limits}` : "";
  clauses += page && limits ? ` OFFSET ${page * limits - limits}` : "";

  return clauses;
};

// Función para preparar una estructura HATEOAS
const prepareHATEOAS = (joyas) => {
  const result = joyas.map((j) => {
    return {
      name: j.nombre,
      href: `/joyas/joya/${j.id}`,
    };
  });
  const totalJoyas = joyas.length;
  const totalStock = joyas.reduce((a, b) => a + b.stock, 0);
  const HATEOS = {
    totalJoyas,
    totalStock,
    result,
  };
  return HATEOS;
};

// Función para filtrar las joyas
const getFilteredJoyas = async (precioMin, precioMax, categoria, metal) => {
  const filters = [];
  const values = [];

  if (precioMin) {
    filters.push('precio >= $1');
    values.push(parseInt(precioMin));
  }

  if (precioMax) {
    filters.push('precio <= $2');
    values.push(parseInt(precioMax));
  }

  if (categoria) {
    filters.push('categoria = $3');
    values.push(categoria);
  }

  if (metal) {
    filters.push('metal = $4');
    values.push(metal);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  const consulta = `SELECT * FROM inventario ${whereClause}`;
  const { rows } = await pool.query(consulta, values);
  return rows;
};

module.exports = { getJoyas, buildQueryClauses, prepareHATEOAS, getFilteredJoyas };
