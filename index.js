const express = require('express')
const app = express()
const port = process.env.PORT ||5000
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sei3l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("theKnot").collection("services");


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

app.delete('/deleteImage/:id',(req,res) => {
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