import express from "express";
import ClienteController from "../controllers/clienteController.js";

const router = express.Router();

router
   .get('/cliente/select', ClienteController.getClientesForSelect)
   .get('/cliente', ClienteController.getClientes)
   .post('/cliente', ClienteController.createCliente)
   .put('/cliente/:id', ClienteController.updateCliente)
   .delete('/cliente/:id', ClienteController.deleteCliente);

export default router;