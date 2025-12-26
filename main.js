// const {Client}=require('pg')
// const express=require('express')
// const app=express()
// app.use(express.json())
// const con=new Client({
//    host:"localhost",
//    user:"postgres",
//    port:5432,
//    password:"12345678",
//    database:"demodata"
//  })
// con.connect().then(()=>console.log("connected"))
// app.post('/postData',(req,res)=>{
//     const id=req.params.id;
//     const name=req.body.name;
//     const insert_query='INSERT INTO demotable (name,id) VALUES ($1,$2)'
//     con.query(insert_query,[name,id],(err,result)=>{
//     if(err){
//         res.send(err)
//     }else{
//         console.log(result);
//         res.send("POSTED DATA")
//     }

//     })
// })
//     app.get('/fetchData',(req,res)=>{
//         const fetch_query="select*from demotable"
//         con.query(fetch_query,(err,result)=>{
//             if(err){
//                 res.send(err)
//             }else{
//                 res.send(result.rows)
//             }
//         })
//     })
//     app.get('/fetchDatabyId/:id',(req,res)=>{
//         const id=req.params.id
//         const fetch_query="select*from demotable WHERE id=$1 "
//         con.query(fetch_query,[id],(err,result)=>{
//             if(err){
//                 res.send(err)
//             }else{
//                 res.send(result.rows)
//             }
//     })

//     })
//     app.put('/update/:id',(req,res)=>{
//          const id=req.params.id;
//          const name=req.body.name;
//           //const address=req.body.address;
//         const update_query="UPDATE demotable SET name=$1 WHERE id=$2"
//         con.query(update_query,[name,id],(err,result)=>{
//             if(err){
//                 res.send(err)
//             }else{
//                 console.log(result);
//                 res.send('UPDATED')
//             }
//         })
//         })
//          app.delete('/delete/:id',(req,res)=>{
//          const id=req.params.id
//         const delete_query='Delete from demotable WHERE id=$1' 
//         con.query(delete_query,[id],(err,result)=>{
//             if(err){
//                 res.send(err)
//             }else{
//                 //console.log('DELETE');
//                 res.send(result)
//             }
//         })
//         })
//     app.listen(3000,()=>{
//         console.log("server is running");
//     })
   

// con.query('select*from demotable',(err,res)=>{
//     if(!err){
//         console.log(res.rows)
//     }
//     else{
//         console.log(err.message)
//     }
//     con.end;
// })
const cors =require('cors')
//const dotenv=require('dotenv')
const dotenv=require('dotenv')
dotenv.config();
const { Client } = require('pg');
const express = require('express');
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
// const con = new Client({
//   host: "process.env.localhost",
//   user: "process.env.postgres",
//   port: process.env.5432,
//   password: "process.env.12345678",
//   database: "process.env.demodata"
// });


// const con = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: Number(process.env.DB_PORT),
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//     ssl: {
//     rejectUnauthorized: false,
//   }
// });
const con = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

con.connect()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error", err));


app.post('/postData', (req, res) => {
  const { id, name } = req.body;

  const insert_query = 
    'INSERT INTO demotable (id, name) VALUES ($1, $2)';

  con.query(insert_query, [id, name], (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({ message: "DATA INSERTED" });
    }
  });
});

app.get('/fetchData', (req, res) => {
  const fetch_query = 'SELECT * FROM demotable';

  con.query(fetch_query, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.get('/fetchDatabyId/:id', (req, res) => {
  const { id } = req.params;

  const fetch_query = 'SELECT * FROM demotable WHERE id=$1';

  con.query(fetch_query, [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});
app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>API Welcome</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: #e5e7eb;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: #020617;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          max-width: 500px;
          width: 100%;
        }
        h1 {
          margin-top: 0;
          color: #38bdf8;
        }
        ul {
          padding-left: 18px;
        }
        li {
          margin: 8px 0;
        }
        .method {
          font-weight: bold;
          color: #22c55e;
        }
        .path {
          color: #fbbf24;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Welcome to the API</h1>
        <p>The server is running successfully.</p>
        <h3>Available Endpoints</h3>
        <ul>
          <li><span class="method">GET</span> <span class="path">/health</span></li>
          <li><span class="method">POST</span> <span class="path">/postData</span></li>
          <li><span class="method">GET</span> <span class="path">/fetchData</span></li>
          <li><span class="method">GET</span> <span class="path">/fetchDatabyId/:id</span></li>
          <li><span class="method">PUT</span> <span class="path">/update/:id</span></li>
          <li><span class="method">DELETE</span> <span class="path">/delete/:id</span></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});


app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const update_query = 
    'UPDATE demotable SET name=$1 WHERE id=$2';

  con.query(update_query, [name, id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: "ID NOT FOUND" });
    } else {
      res.status(200).json({ message: "DATA UPDATED" });
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const delete_query = 
    'DELETE FROM demotable WHERE id=$1';

  con.query(delete_query, [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: "ID NOT FOUND" });
    } else {
      res.status(200).json({ message: "DATA DELETED" });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
