const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : process.env.PORT,
    user : '',
    password : '',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }); 

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res, )})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.port}`);
})

