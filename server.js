const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//const $ = require('jQuery');
const app = express();
app.use(express.static('public'));
 
const MONGO_URL = 'mongodb://test:test@ds117858.mlab.com:17858/heroku_1763t2g1';
// `mongodb://test:test@ds121543.mlab.com:21543/heroku_h1lksrdg`;

let db = null;
let collection = null;
let collectionForum = null;

async function startServer(){
db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
collection = db.collection('food');
collectionForum = db.collection('forum');


}

startServer();


async function onLookupWord(req, res) {
   const routeParams = req.params;
   console.log(routeParams);

      
   const word = routeParams.word;

   
   const query =   { $or: [{food: word}, {recipeSuggestion: word}] };

   const results = await collection.find(query, function(err, cursor) {
     return cursor.batchSize(10).toArray();
   });
 
           console.log(results);

 
   const formattedResults = results.map(function(result) {
     return {
       markerName: result.food,
       recipeSuggestion: result.recipeSuggestion
     }
   });

    const response = {
      word: word,
      associated: formattedResults
    };

    res.json(response);
}
  app.get('/lookup/:word' , onLookupWord);


  async function getForum(req, res) {
     const routeParams = req.params;
     const word = routeParams.word;


     const results = await collectionForum.find(function(err, cursor) {
      console.log(cursor.toArray());
       return cursor.toArray();
      
     });

     console.log(results);

     const formattedResults = results.map(function(result) {
       return {
         question: result.question,
         answer: result.answer

       }
     });

      console.log(formattedResults);
      const response = {

        forumSheet: formattedResults
      };

      res.json(response);
  }
    app.get('/getForum/', getForum);

    app.post('/onPost', jsonParser, function (req, res) {
        const body = req.body;
        const message = body.message;
        collectionForum.insertOne({"question": message, "answer": "unanswered"});
        res.send(message);
        app.get('/getForum/', getForum);
        });



// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
