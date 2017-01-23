// ========================
// INITIAL SETUP
// ========================

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pgp = require('pg-promise');
const bcrypt = require('bcrypt');
const uuid = require('uuid');


// Connect to PostgreSQL Database:
// let db = pgp('insiten_db');


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('listening on *:3000');
});
