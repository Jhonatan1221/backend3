const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: ["http://localhost:3000"], // Permitir solo solicitudes desde el frontend local
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Si usas cookies o autenticación basada en sesiones
  })
);


// Configurar puerto y middlewares
const PORT = process.env.PORT || 3001;
app.use(express.json());

// Rutas
app.use("/api", userRouter);

// Endpoint raíz
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running...", version: "1.0.0" });
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
