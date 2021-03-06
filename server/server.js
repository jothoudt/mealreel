const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const searchRouter =require('./routes/search.router');
const detailsRouter =require('./routes/details.router');
const saveRouter = require('./routes/save.router');
const favoriteRouter= require('./routes/favorite.router');
const randomRouter=require('./routes/random.router');
const userRecipeRouter=require('./routes/userRecipe.router');
const myRecipeRouter=require('./routes/myRecipe.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/details', detailsRouter);
app.use('/api/save', saveRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/random', randomRouter);
app.use('/api/userrecipes/', userRecipeRouter);
app.use('/api/myrecipes/', myRecipeRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
