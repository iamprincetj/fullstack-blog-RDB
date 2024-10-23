const express = require('express');
const app = express();
require('express-async-errors');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { errorHandler, tokenExtractor } = require('./util/middlewares');
const authorRouter = require('./controllers/author');
const readingRouter = require('./controllers/readingList');
const logoutRouter = require('./controllers/logout');

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingRouter);
app.use('/api/logout', logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log('Server running on PORT', PORT);
  });
};

start();