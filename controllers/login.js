const loginRouter = require('express').Router();
const { User, Session } = require('../model');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { tokenExtractor } = require('../util/middlewares');

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  const passwordCorrect = req.body.password === 'secret';

  if (!(user && passwordCorrect)) {
    res.status(400).json({
      error: 'incorrect username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  const session = await Session.create({ token });

  user.sessionId = session.id;
  user.save();

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
