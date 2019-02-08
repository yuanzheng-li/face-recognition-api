require('./load-env');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it is working');
});
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db));
app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db));
app.put('/image', auth.requireAuth, image.handleImage(db));
app.post('/imageurl', auth.requireAuth, image.handleApiCall);

app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`);
});
