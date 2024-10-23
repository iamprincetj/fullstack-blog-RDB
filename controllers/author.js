const authorRouter = require('express').Router();
const { Blog } = require('../model');
const { sequelize } = require('../util/db');

authorRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'article'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  });

  res.json(blogs);
});

module.exports = authorRouter;
