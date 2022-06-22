const express = require('express');
const path = require('path');
const fs = require('fs');

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
  console.info(`${req.method} request received for tips`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);