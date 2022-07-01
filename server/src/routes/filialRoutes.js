import express from "express";
import FilialController from "../controllers/filialController.js";

const router = express.Router();

router
   .get('/filial', FilialController.getFiliais)
   .post('/filial/sabor', FilialController.addSaborFilial)
   .post('/filial', FilialController.createFilial)
   .put('/filial/:id', FilialController.updateFilial)
   .delete('/filial/:id', FilialController.deleteFilial);

export default router;