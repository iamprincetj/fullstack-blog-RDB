const userRouter = require('express').Router();
const { Op } = require('sequelize');
const { User, Blog, Session } = require('../model');

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['sessionId'] },
    include: {
      model: Blog,
    },
  });
  res.json(users);
});

userRouter.get('/:id', async (req, res) => {
  let where = {};

  if (req.query.read) {
    const searchQuery = req.query.read;
    where = {
      read: {
        [Op.eq]: searchQuery,
      },
    };
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['sessionId'] },
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: {
        attributes: ['id', 'read'],
        where,
      },
    },
  });
  if (!user) {
    return res.status(404).json({
      error: 'user not found',
    });
  }

  const addedData = {
    ...user.toJSON(),
    readings: user.readings.map((read) => {
      const { readingList, ...readWithoutReadingList } = read.toJSON();
      const returnedData = {
        ...readWithoutReadingList,
        readinglists: [
          {
            read: readingList.read,
            id: readingList.id,
          },
        ],
      };
      return returnedData;
    }),
  };

  res.json(addedData);
});

userRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

userRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = userRouter;
