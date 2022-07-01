import express from "express";
import funcionarios from "./funcionarioRoutes.js";
import filiais from "./filialRoutes.js";

function routes(app) {
   app.route('/').get((req, res) => {
      res.status(200).send(
         {
            title: "This is your server :)"
         }
      );
   });

   app.use(
      express.json(),
      funcionarios,
      filiais
   );
}

export default routes;