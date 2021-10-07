const mysql = require('mysql');

const { MYSQL_CONFIG } = require('../config/db')

var connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect();



// function execSQL(sql, callback) {
//   connection.query(sql, callback);
// }

function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
  return promise
}



module.exports = {
  execSQL
}