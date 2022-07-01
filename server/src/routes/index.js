import express from "express";
import funcionarios from "./funcionarioRoutes.js";
import filiais from "./filialRoutes.js";
import sabores from "./saborRoutes.js";

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
      filiais,
      sabores
   );
}

export default routes;