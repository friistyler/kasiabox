// server/index.js

const express = require("express");
const path = require("path");
const { simGen } = require("../lib/sim");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/csv", (req, res) => {

  var overrides = {
                  "antal": parseInt(req.query.antal), 
                  "start": parseInt(req.query.start), 
                  "antaltegn": parseInt(req.query.antaltegn)
                };
  

  var state = {...req.query, ...overrides}

  for (let sim of simGen(state)) {
    res.write(sim+"\n");
  }
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

