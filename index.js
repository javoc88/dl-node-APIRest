require("dotenv").config();
const express = require('express');
const app = express();
const {getJoyas, buildQueryClauses, prepareHATEOAS} = require("./consultas")

const PORT = process.env.PORT;

// Solicitud GET
app.get('/joyas', async (req, res) => {
  try {
    const queryStrings = req.query;
    const clauses = buildQueryClauses(queryStrings);
    const joyasData = await getJoyas(clauses);
  } catch (error) {
    // Manejar errores
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});