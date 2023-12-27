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

// Cláusulas 
const buildQueryClauses = (queryStrings) => {
  let clauses = "";
  const { limits, page, order_by } = queryStrings;

  clauses = order_by ? `ORDER BY ${order_by.split("_")[0]} ${order_by.split("_")[1]}` : "";
  clauses += limits ? ` LIMIT ${limits}` : "";
  clauses += page && limits ? ` OFFSET ${page * limits - limits}` : "";

  return clauses;
};


// const nombreFuncion = (queryStrings) => {
//   let clausula = "";
//   const { limits, page, order_by } = queryStrings;
//   if (order_by) {
//     const [campo, ordenamiento] = order_by.split("_");
//     clausula = `ORDER BY ${campo} ${ordenamiento}`;
//   }
//   if (limits) {
//     clausula += " LIMIT " + limits;
//   }
//   if (page && limits) {
//     const offset = page * limits - limits;
//     clausula += " OFFSET " + offset;
//   }
//   return clausula;
// };

module.exports = {getJoyas, buildQueryClauses}
