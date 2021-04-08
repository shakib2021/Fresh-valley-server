const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const ObjectI= require('mongodb').ObjectID
let Id=require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port =  5000

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('bson')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v8ylu.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ProductCollection = client.db("freshdb").collection("products");
  const OrdersCollection = client.db("freshdb").collection("Orders");

   app.post("/saveorder",(req,res)=>{

    let order=req.body;
    OrdersCollection.insertOne(order)

   })
   app.get('/saveorders',(req,res)=>{

    OrdersCollection.find()
    .toArray((error,doc)=>{

      res.send(doc)
    })
  

   })
 
 
  app.get('/allProduct',(req,res) => {
       
ProductCollection.find()
.toArray((error, product) => {
 res.send(product)
})
 })

 
  

   app.post('/addProduct',(req,res)=>{
       let product=req.body;
 ProductCollection.insertOne(product)
       
     
   })
    app.delete('/deleteproduct/:id',(req,res)=>{

     let id=ObjectI(req.params.id)
     ProductCollection.findOneAndDelete({_id:id})
     .then(result=>console.log(result))
    console.log(id)
  
    })


  console.log("database connected")


});

app.listen(process.env.PORT|| port)