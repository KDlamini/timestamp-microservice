// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//first API endpoint...
app.get("/api/timestamp", (req, res) => {
  let date = new Date();

  res.json({"unix": date.getTime(), "uct": date.toUTCString()});
});

// second API endpoint with paramters...
app.get("/api/timestamp/:date_str", function (req, res) {
  const { date_str } = req.params;

  let date = new Date(isNaN(date_str) ? date_str : parseInt(date_str));

  if (date === null) {
    res.json({"unix": null, "uct": "Invalid date"});
  } else {
    res.json({"unix": date.getTime(), "uct": date.toUTCString()});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
