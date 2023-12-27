require("dotenv").config();
const express = require("express");
const app = express();
const { getJoyas, buildQueryClauses, prepareHATEOAS, getFilteredJoyas } = require("./consultas");

const PORT = process.env.PORT;

// Solicitud GET /joyas
app.get("/joyas", async (req, res) => {
  try {
    const queryStrings = req.query;
    const clauses = buildQueryClauses(queryStrings);
    const joyasData = await getJoyas(clauses);
    const data = prepareHATEOAS(joyasData);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Solicitud GET /joyas/filtros
app.get("/joyas/filtros", async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    const joyasFiltradas = await getFilteredJoyas(
      precio_min,
      precio_max,
      categoria,
      metal
    );

    res.json({ joyasFiltradas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
