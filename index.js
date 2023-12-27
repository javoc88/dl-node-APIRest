require("dotenv").config();
const express = require('express');
const app = express();
const {getJoyas, buildQueryClause} = require("./consultas")

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});