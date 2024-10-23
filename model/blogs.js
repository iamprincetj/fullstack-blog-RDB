const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');
const { INTEGER } = require('sequelize');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: INTEGER,
      validate: {
        isGreaterThan1991(value) {
          if (value < 1991) {
            throw new Error('year must be >= 1991');
          }
        },
        isLessThanCurrentYear(value) {
          if (value > new Date().getFullYear()) {
            throw new Error('Year must be in the past');
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

module.exports = Blog;
