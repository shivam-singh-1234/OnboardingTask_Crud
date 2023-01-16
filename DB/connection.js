var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'voucherdb'
});

db.connect(function(err) {
  if (err) throw err;
console.log("db Connected!");
})


module.exports=db;