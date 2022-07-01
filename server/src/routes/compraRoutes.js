import express from "express";
import CompraController from "../controllers/compraController.js";

const router = express.Router();

router
   .get('/compra', CompraController.getCompras)
   .post('/compra', CompraController.createCompra)
   .delete('/compra/:id', CompraController.deleteCompra);

export default router;