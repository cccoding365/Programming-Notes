var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'xcbdh.top',
  user: 'root',
  password: 'HCCmysql220284.',
  database: 'collect_site'
});

connection.connect();

connection.query('SELECT * FROM `favorite_site`', function (error, results, fields) {
  if (error) throw error;
  console.log('The results is: ', results);
});