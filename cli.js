require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

const getBlogs = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('SELECT * from blogs', {
      type: QueryTypes.SELECT,
    })
    blogs.forEach((value) => {
      console.log(`${value.author}: '${value.title}', ${value.likes} likes`)
    })
    await sequelize.close()
  } catch (e) {
    console.error('Failed to connect to database', e)
  }
}

getBlogs()
