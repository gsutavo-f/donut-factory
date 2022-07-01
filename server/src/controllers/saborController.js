import db from '../config/dbConnection.js';

class SaborController {

   static getSabores(req, res) {
      db.query(
         "select * from sabordonut",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static getSaboresForSelect(req, res) {
      db.query(
         "select id as value, nome as label from sabordonut",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static getListSaboresByFilial(req, res) {
      const {id} = req.params;
      db.query(
         "select fs.codsabor as value, s.nome as label from filial_sabordonut fs inner join sabordonut s on s.id = fs.codsabor where fs.codfilial = ?",
         id,
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static createSabor(req, res) {
      const {
         name,
         price,
         ingredient,
         type
      } = req.body;

      db.query(
         "insert into sabordonut (nome, preco, ingrediente, tipo) values (?,?,?,?)",
         [name, price, ingredient, type],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

   static updateSabor(req, res) {
      const {id} = req.params;
      const {price} = req.body;
      db.query(
         "update sabordonut set preco = ? where id = ?",
         [price, id],
         (err) => {
            if (err) {
               res.status(400).send({message: `${err.message} - Sabor not found`});
            } else {
               res.status(200).send({message: "Value Updated"});
            }
         }
      );
   }

   static deleteSabor(req, res) {
      const {id} = req.params;
      db.query(
         "delete from filial_sabordonut where codsabor = ?",
         id,
         (err) => {
            if (err) {
               res.status(500).send({message: `${err.message} - Error deleting filial_sabordonut`});
            } else {
               db.query(
                  "delete from sabordonut where id = ?",
                  id,
                  (err) => {
                     if (err) {
                        res.status(500).send({message: `${err.message} - Error deleting sabordonut`});
                     } else {
                        res.status(200).send({message: "Value Deleted"});
                     }
                  }
               );
            }
         }
      );
   }

}

export default SaborController;