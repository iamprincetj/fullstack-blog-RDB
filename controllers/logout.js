const { User } = require('../model');
const { tokenExtractor } = require('../util/middlewares');

const logoutRouter = require('express').Router();

logoutRouter.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  console.log(user.sessionId, req.sessionToken);
  user.sessionId = null;
  await user.save();
  req.sessionToken.destroy();
  res.status(204).end();
});

module.exports = logoutRouter;
