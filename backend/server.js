// 1. IMPORTAR LAS HERRAMIENTAS
require('dotenv').config(); // Cargar las variables secretas del archivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. CONFIGURAR EL SERVIDOR
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares (Intermediarios)

app.use(express.json()); // Permite que el servidor entienda datos JSON (lo que enviará el frontend)
app.use(cors()); // Permite conexiones desde otros lados (como tu app de React)

// 3. CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado exitosamente a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error de conexión:', error));

// 4. RUTA DE PRUEBA (Para ver si funciona en el navegador)
app.get('/', (req, res) => {
  res.send('¡Hola! Tu servidor de finanzas está funcionando 🚀');
});

// RUTAS DE LA APLICACIÓN
const accountRoutes = require('./routes/accountRoutes');
app.use('/api/accounts', accountRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transaction', transactionRoutes);

const statsRoutes = require('./routes/statsRoutes');
app.use('/api/stats', statsRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 5. ENCENDER EL SERVIDOR
app.listen(PORT, () => {
  console.log(`📡 Servidor escuchando en el puerto ${PORT}`);
});
