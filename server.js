const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const authController = require('./controllers/auth');
const foodsController = require('./controllers/foods');
const usersController = require('./controllers/users');
const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passUserToView);

app.use('/auth', authController);

app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);

app.use('/users', usersController);

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});