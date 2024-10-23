const blogRouter = require('express').Router();

const { Op } = require('sequelize');
const { Blog, User } = require('../model');
const { findBlog, tokenExtractor } = require('../util/middlewares');

blogRouter.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    const searchQuery = `%${req.query.search}%`;
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: searchQuery,
          },
        },
        {
          author: {
            [Op.iLike]: searchQuery,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    order: [['likes', 'DESC']],
    where,
  });
  res.json(blogs);
});

blogRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.status(201).json(blog);
});

blogRouter.put('/:id', findBlog, async (req, res) => {
  const blogLike = req.body.likes;
  if (req.blog) {
    req.blog.likes = blogLike;
    await req.blog.save();
    res.json(req.blog);
  } else {
    throw new Error('Blog not found!');
  }
});

blogRouter.delete('/:id', tokenExtractor, findBlog, async (req, res) => {
  if (req.blog && req.decodedToken.id === req.blog.userId) {
    req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = blogRouter;
