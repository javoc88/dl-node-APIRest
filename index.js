require("dotenv").config();
const express = require("express");
const app = express();
const {
  getJoyas,
  buildQueryClauses,
  prepareHATEOAS,
  getFilteredJoyas,
  getJoyaById,
} = require("./consultas");
const { queryReport } = require("./middleware/index")

const PORT = process.env.PORT;

// Solicitud GET /joyas
app.get("/joyas", queryReport, async (req, res) => {
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

// Solicitud GET /joyas/joya/:id
app.get("/joyas/joya/:id", queryReport, async (req, res) => {
  try {
    const { id } = req.params;
    const joya = await getJoyaById(id);

    if (!joya) {
      return res.status(404).json({ message: "Joya no encontrada" });
    }

    res.json({ joya });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Solicitud GET /joyas/filtros
app.get("/joyas/filtros", queryReport, async (req, res) => {
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
