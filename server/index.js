const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.port
const CONNECTION_INFO = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'react_sql',
  insecureAuth : true
}

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM PRODUCTS"
const connection = mysql.createConnection(CONNECTION_INFO)
// const pool = mysql.createPool(CONNECTION_INFO)

app.use(cors())
app.use(bodyParser.json())
connection.connect(err => {
  if (err) return err
})

app.get('/', (req, res) => {
  res.send('Hello World! I am awake')
})

app.post('/products/add', (req, res) => {
  const { name, price } = req.body
  const INSERT_PRODUCTS_QUERY = `INSERT INTO PRODUCTS (NAME, PRICE) VALUE ('${name}', ${price})`
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) return res.send(err)
    console.log(results)
    return res.send(`You add product successful`)
  })
})
app.get('/products', (req, res) => {
  connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) return res.send(err)
    // else here
    return res.json({
      data: results
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port 3000!`))