const express = require('express'); // our express server
const bodyParser = require('body-parser'); // requiring the body-parser
const mongoose = require('mongoose');
const cors = require('cors');

const db = require('./models/');

const PORT = process.env.PORT || 3001; // port that the server is running on => localhost:3000

const app = express(); // generate an app object

app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

function success(res, payload) {
  return res.status(200)
    .json(payload);
}

app.get('/songs', async (req, res, next) => {
  try {
    const songs = await db.Song.find({});
    return success(res, songs);
  } catch (err) {
    next({ status: 400, message: 'failed to get todos' });
  }
});

app.get('/songs/:id', async (req, res, next) => {
  try {
    const song = await db.Song.findById(req.params.id);
    return success(res, song);
  } catch (err) {
    next({ status: 400, message: 'failed to update todo' });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400)
    .json({
      status: err.status || 400,
      message: err.message || 'there was an error processing request',
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

mongoose.connect('mongodb+srv://vova:vova@karaokesongs.nvpbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  // connecting to the mongodb database name: "todo-app" locally
  keepAlive: true, // keeping the connection alive
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('debug', true); // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise; //
