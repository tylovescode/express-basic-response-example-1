'use strict';

// EXAMPLE 1: Use logging to explore request object
// ================================================

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// our app will use bodyParser to try to 
// parse JSON and/or URL encoded data from
// request bodies. If you don't add 
// body parsing middleware, even if the raw
// request contains, say, a JSON body,
// `req.body` will be empty in the request handler
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// we'll run all requests to `/example-1` through this 
// function
const logRequest = (req, res, next) => {
  const logObj = {
    time: (new Date()).toTimeString(),
    method: req.method,
    hostname: req.hostname,
    path: req.path,
    "content type": req.get('Content-Type'),
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body)
  }
  Object.keys(logObj).forEach(key => console.log(`request ${key}: ${logObj[key]}`));
  // we'll learn more about middleware later in this course, but for now
  // know that calling `next()` causes the next function in the middleware stack
  // to be called
  next();
};

// app.all captures all requests to `/`, regardless of
// the request method.
app.all('/', logRequest);
// GET requests to the root of the server
app.get('/', (req, res) => res.send('a okay'));
// POST requests to the root of the server
app.post('/', (req, res) => res.status(201).send('a okay'));

// listen for requests
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
