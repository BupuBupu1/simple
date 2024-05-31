const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = new Sequelize('koa', 'root', '2050haha', {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected!!!!!!!!!!!!!!');
  })
  .catch((err) => {
    console.log(err)
    console.error('Connect failed');
  });

// 创建modal
const Blog = sequelize.define('Blog', {
  heading: 'VARCHAR(300)',
  content: 'LONGTEXT',
  author: {
    type: 'VARCHAR(100)',
    defaultValue: '布尔什维克',
  },
  type: {
    type: 'VARCHAR(100)',
    defaultValue: 'history',
  },
});
const carousel = sequelize.define(
  'carousel',
  {
    img: DataTypes.STRING,
    cover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'carousel',
  }
);
sequelize.sync();

module.exports = { Blog, carousel };
