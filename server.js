const express = require('express');
const path = require('path');

const { uuid } = require('./utils/id.js');
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route from Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public.index.html'));
});

// GET Route for Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the Notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new Note
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { text, title } = req.body;

  if (req.body) {
    const newNotes = {
      note,
      text,
      id: uuid(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);