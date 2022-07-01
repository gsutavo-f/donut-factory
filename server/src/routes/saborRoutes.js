import express from "express";
import SaborController from "../controllers/saborController.js";
import saborController from "../controllers/saborController.js";

const router = express.Router();

router
   .get('/sabor/filial/:id', saborController.getListSaboresByFilial)
   .get('/sabor/select', SaborController.getSaboresForSelect)
   .get('/sabor', SaborController.getSabores)
   .post('/sabor', SaborController.createSabor)
   .put('/sabor/:id', SaborController.updateSabor)
   .delete('/sabor/:id', SaborController.deleteSabor);

export default router;