// Middleware para registrar solicitudes
const queryReport = async (req, res, next) => {
  console.log(`Solicitud a ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { queryReport };
