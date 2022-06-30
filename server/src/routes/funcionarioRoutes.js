import express from "express";
import FuncionarioController from "../controllers/funcionarioController.js";

const router = express.Router();

router
   .get('/funcionario', FuncionarioController.getFuncionarios)
   .post('/funcionario', FuncionarioController.createFuncionario)
   .put('/funcionario/:id', FuncionarioController.updateFuncionario)
   .delete('/funcionario/:id', FuncionarioController.deleteFuncionario);

export default router;