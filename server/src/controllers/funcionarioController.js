import db from '../config/dbConnection.js';

class FuncionarioController {

   static getFuncionarios(req, res) {
      db.query(
         "select * from funcionario",
         (err, result) => {
            if (err) {
               console.log(err);
            } else {
               res.send(result);
            }
         }
      );
   }

   static createFuncionario(req, res) {
      const {
         name,
         cpf,
         position,
         salary,
         codFilial
      } = req.body;

      db.query(
         "insert into funcionario (nome, cpf, cargo, salario, codfilial, dataemissao) values (?,?,?,?,?,?)",
         [name, cpf, position, salary, codFilial, new Date()],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

   static updateFuncionario(req, res) {
      const {id} = req.params;
      const {salary} = req.body;

      db.query(
         "update funcionario set salario = ? where id = ?",
         [salary, id],
         (err) => {
            if (err) {
               res.status(400).send({message: `${err.message} - Funcionario not found`});
            } else {
               res.status(200).send({message: "Value Updated"});
            }
         }
      );
   }

   static deleteFuncionario(req, res) {
      const {id} = req.params;

      db.query(
         "delete from funcionario where id = ?",
         id,
         (err) => {
            if (err) {
               res.status(400).send({message: `${err.message} - Funcionario not found`});
            } else {
               res.status(200).send({message: "Value Deleted"});
            }
         }
      );
   }

}

export default FuncionarioController;