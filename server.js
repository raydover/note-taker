const express = require('express');
const path = require('path');
const fs = require('fs');
const { uuid } = require('./utils/id.js');
const database = require ('./db/notes.json')

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
  fs.readFile(path.join(__dirname, './db/notes.json'), 'utf-8', (error, data) => {
    if (error) throw error;
    res.json(JSON.parse(data));
  });
});

// POST Route for a new Note
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const createdNote = {title, text, id: uuid(),};
    database.push(createdNote);
    let storedNotes = JSON.stringify((database), null, 2);
    fs.writeFile(`./db/notes.json`, storedNotes, () => {
      const response = {
        body: createdNote,
      }
      res.json(response);
    })
  };;
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);