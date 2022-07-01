import db from '../config/dbConnection.js';

class FilialController {

   static getFiliais(req, res) {
      db.query(
         "select * from filial",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static getFiliaisForSelect(req, res) {
      db.query(
         "select id as value, nome as label from filial",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static createFilial(req, res) {
      const {name, address} = req.body;

      db.query(
         "insert into filial (nome, endereco) values (?,?)",
         [name, address],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

   static updateFilial(req, res) {
      const {address} = req.body;
      const {id} = req.params;

      db.query(
         "update filial set endereco = ? where id = ?",
         [address, id],
         (err) => {
            if (err) {
               res.status(400).send({message: `${err.message} - Filial not found`});
            } else {
               res.status(200).send({message: "Value Updated"});
            }
         }
      );
   }

   static deleteFilial(req ,res) {
      const {id} = req.params;

      db.query(
         "delete from funcionario where codfilial = ?",
         id,
         (err) => {
            if (err) {
               res.status(500).send({message: `${err.message} - Error deleting funcionarios of filial`});
            } else {
               db.query(
                  "delete from filial_sabordonut where codfilial = ?",
                  id,
                  (err) => {
                     if (err) {
                        res.status(500).send({message: `${err.message} - Error deleting filial_sabordonut`});
                     } else {
                        db.query(
                           "delete from filial_compra where codfilial = ?",
                           id,
                           (err) => {
                              if (err) {
                                 res.status(500).send({message: `${err.message} - Error deleting filial_compra`});
                              } else {
                                 db.query(
                                    "delete from filial where id = ?",
                                    id,
                                    (err) => {
                                       if (err) {
                                          res.status(500).send({message: `${err.message} - Error deleting filial`});
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
               );
            }
         }
      );
   }

   static addSaborFilial(req, res) {
      const {codFilial} = req.body;
      const {codSabor} = req.body;

      db.query(
         "insert into filial_sabordonut (codfilial, codsabor) values (?,?)",
         [codFilial, codSabor],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

}

export default FilialController;