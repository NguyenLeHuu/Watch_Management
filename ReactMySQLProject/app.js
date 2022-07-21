const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user_watch',
  password: '123456',
  database: 'watch_management'
});

connection.connect(function(err){
  (err) ? console.log(err) : console.log(connection);
});

app.get('/api/products', (req, res) => {
  var sql = "SELECT A.*,B.categoryName FROM product A, category B WHERE A.categoryId = B.categoryId AND A.productStatus = 1 ORDER BY A.productId DESC";
  connection.query(sql, function(err, results) {  
    if (err) throw err;
    res.json({products: results});
  });
});

app.get('/api/brands', (req, res) => {
  var sql = "SELECT * FROM category";
  connection.query(sql, function(err, results) {  
    if (err) throw err;
    res.json({brands: results});
  });
});

app.get('/api/watchsByCategoryId', (req, res) => {console.log(req.body.categoryId);
  var sql = "SELECT A.*,B.categoryName FROM product A, category B WHERE A.categoryId = '"+req.body.categoryId+"' AND A.categoryId = B.categoryId  ORDER BY A.productId DESC";
  connection.query(sql, function(err, results) {  
    if (err) throw err;
    console.log(results);
    res.json({products: results});
  });
});


app.post('/api/insert', function(req, res) {
  var sql = "INSERT "
          + "INTO product(productName,productPrice,productQuantity,categoryId,image) "
          + "VALUES('"
          +   req.body.productName+ "','" 
          +   req.body.productPrice + "','" 
          +   req.body.productQuantity + "','" 
          +   req.body.categoryId + "','"
          +   req.body.image+"')";
  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({products: results});
  });
});

app.post('/api/insertBrand', function(req, res) {
  var sql = "INSERT "
          + "INTO category(categoryName) "
          + "VALUES('"
          +   req.body.categoryName+"')";
  connection.query(sql, function (err, results) {
    if(err) throw err;
    res.json({brands: results});
  });
});


app.post('/api/edit', (req, res) => {
  var sql = "UPDATE product SET "
          +   "productName='"+req.body.productName+"',"
          +   "productPrice='"+req.body.productPrice+"',"
          +   "productQuantity='"+req.body.productQuantity+"',"
          +   "image='"+req.body.image+"',"
          +   "categoryId='"+req.body.categoryId+"'"
          +   " WHERE productId='"+req.body.productId+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({products: results});
  });
});

app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM product "
          + "WHERE productId='"+req.body.productId+"'";
  connection.query(sql, function(err, results) {
    if (err) throw err;
    res.json({products: results});
  });
});

app.listen(4000, () => console.log('App listening on port 4000'));