const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Todo server is running');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vrj5k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const todoCollection = client.db('todoApp').collection('todoList');

    // post todo to the server
    app.post('/todo', async (req, res) => {
      const todo = req.body;
      const result = await todoCollection.insertOne(todo);
      res.send(result);
    });

    // get todo form server
    app.get('/todo', async (req, res) => {
     
      const cursor = todoCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });


    app.put('/update/:id', async (req, res) => {
      const id = req.params;
      const {inProgress,done,todo} = req.body;
      const filter = { _id: ObjectId(id) };
     
            const updatedDoc = {
              $set: {
                  done:done,
                inProgress: inProgress,
                todo:todo
                },
            };
            const updateTodo = await todoCollection.updateOne(filter, updatedDoc);

            res.send(updateTodo);
    });
    
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log('listening port', port);
});
