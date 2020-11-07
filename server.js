require('./config/config');
require('./models/db');
require('./config/passportConfig');
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
const cors = require('cors'),
port = 3080;
const passport = require('passport');
const rtsIndex = require('./routes/index.router');

//middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use(passport.initialize());
app.use('/api', rtsIndex);

//errorhandler
app.use((err, req, res, next)=> {
  if(err.name == 'ValidationError') {
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).sennd(valErrors);
  }
});
/* const users = []; */
/* app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
}); */

app.listen(process.env.PORT, () => {
    console.log(`Server listening on the port::${process.env.PORT}`);
});