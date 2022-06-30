import mysql from"mysql";

const db = mysql.createConnection({
   user: 'root',
   host: 'localhost',
   password: 'password',
   database: 'donuts'
});

export default db;