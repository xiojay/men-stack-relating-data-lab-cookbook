const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const authController = require('./controllers/auth');
const foodsController = require('./controllers/foods');
const usersController = require('./controllers/users');
const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000
const app = express();

dotenv.config()
mongoose.connect(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passUserToView);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  })
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`)
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use('/auth', authController);

app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);

app.use('/users', usersController);

app.listen(port, () => {
  console.log('Server is running on port 3000')
});