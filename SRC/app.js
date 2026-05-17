import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { ProductModel } from "./models/product.model.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import { connectDB } from "./config/db.js";

const app = express();

const PORT = 8080;

// Configurar Handlebars
app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views");

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Conexión MongoDB
connectDB();

// Rutas API
app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

// Rutas vistas
app.use("/", viewsRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);
app.set("io", io);
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await ProductModel.find().lean();

  socket.emit("products", products);
});
