const readingRouter = require('express').Router();
const { ReadingList, User } = require('../model');
const { tokenExtractor } = require('../util/middlewares');

readingRouter.post('/', async (req, res) => {
  const body = req.body;
  const readingList = await ReadingList.create(body);
  res.status(201).json(readingList);
});

readingRouter.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (readingList.userId !== req.decodedToken.id) {
    return res.status(404).json({
      error: 'not authenticated',
    });
  }
  readingList.read = req.body.read;
  await readingList.save();
  res.json(readingList);
});

module.exports = readingRouter;
