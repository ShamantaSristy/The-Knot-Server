const express = require('express')
const app = express()
const port = process.env.PORT ||5000
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sei3l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("theKnot").collection("services");
  const reviewCollection = client.db("theKnot").collection("reviews");
  const orderCollection = client.db("theKnot").collection("orders");

// service part
  app.post('/addService',(req,res) => {
    const newService = req.body;
    console.log("Image uploading",newService);
    serviceCollection.insertOne(newService)
    .then(result => {
      console.log("Service adding " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/services',(req,res) => {
    serviceCollection.find()
    .toArray((err, items) => {
      res.send(items);
      console.log(items);
    })
    
  });

// review part 
  app.post('/addReview',(req,res) => {
    const newReview = req.body;
    console.log("Review uploading",newReview);
    reviewCollection.insertOne(newReview)
    .then(result => {
      console.log("Review adding " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/reviews',(req,res) => {
    reviewCollection.find()
    .toArray((err, items) => {
      res.send(items);
      console.log(items);
    })
    
  });

// order part 
  app.post('/addOrder',(req,res) => {
    const newOrder = req.body;
    console.log("Order uploading",newOrder);
    orderCollection.insertOne(newOrder)
    .then(result => {
      console.log("Order adding " , result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/orders',(req,res) => {
    orderCollection.find()
    .toArray((err, items) => {
      res.send(items);
      console.log(items);
    })
    
  });

app.delete('/deleteItem/:id',(req,res) => {
    const Id = ObjectID(req.params.id);
    console.log("delete this",  Id);
    serviceCollection.deleteOne({_id: Id})
    .then(documents => {
      console.log(documents.deletedCount);
      res.send(documents)
    })
  });

  app.get('/', (req, res) => {
    res.send('we got something')
  })

  // client.close();
});




app.listen(port, () => {
  console.log("Connected to database")
})