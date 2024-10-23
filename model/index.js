const Blog = require('./blogs');
const ReadingList = require('./readingList');
const Session = require('./sessions');
const User = require('./users');

User.hasMany(Blog);
Blog.belongsTo(User);

Session.hasMany(User);
User.belongsTo(Session);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readinglists' });

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
