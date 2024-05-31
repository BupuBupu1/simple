const koa = require('koa');
const serve = require('koa-static');

const app = new koa();
app.use(serve('./static'));
app.listen(91, () => console.log('running...'));
