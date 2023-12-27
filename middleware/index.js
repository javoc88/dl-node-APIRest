// Middleware para registrar solicitudes
const queryReport = async (req, res, next) => {
  console.log(`Solicitud ${req.method} ${req.originalUrl} con fecha ${new Date()}`);
  next();
};

module.exports = { queryReport };
