const Router = require('koa-router');
const router = new Router();

const blog = require('./controler/blog');
const carousel = require('./controler/caroucel.js');

module.exports = router
  .post('/blog', blog.post)
  .delete('/blog/:id', blog.delete)
  .put('/blog/:id', blog.put)
  .put('/blog/:type/:id', blog.putType)
  .get('/blog', blog.selectAll)
  .get('/blog/some/:num', blog.getSomeBlogs)
  .get('/blog/type/:type', blog.getType)
  .get('/blog/:id', blog.select)

  .post('/carousel', carousel.add)
  .delete('/carousel/:id', carousel.delete)
  .put('/carousel/:id', carousel.put)
  .put('/carousel/:id/:cover', carousel.putCover)
  .get('/carousel', carousel.selectAll);
