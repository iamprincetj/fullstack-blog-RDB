const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Blog, User, Session } = require('../model');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findByPk(decodedToken.id, {
      include: {
        model: Session,
      },
    });
    if (token === user.session?.token) {
      req.decodedToken = decodedToken;
      req.sessionToken = user.session;
    } else {
      res.status(400).json({ error: 'token missing' });
    }
  } else {
    res.status(400).json({ error: 'token missing' });
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.name);

  if (err.name === 'SequelizeValidationError') {
    const errorList = err.errors.map((error) => error.message);
    return res.status(400).json({ error: errorList });
  }

  res.status(500).json({ error: err.message });
};

const findBlog = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  req.blog = blog;
  next();
};

module.exports = {
  tokenExtractor,
  errorHandler,
  findBlog,
};
