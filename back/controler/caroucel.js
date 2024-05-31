const fs = require('fs');
const { carousel } = require('../model/global');
const carouselMethods = require('../model/caroucel');
Object.assign(carousel, carouselMethods);

module.exports = {
  async add(ctx) {
    const randomName = getImg(ctx);
    const res = await carousel.insert(`/img/${randomName}`);
    ctx.body = res;
  },
  async delete(ctx) {
    let { img } = await carousel.delete(ctx.params.id);
    ctx.body = true;
  },
  async put(ctx) {
    const randomName = getImg(ctx);
    const res = await carousel.put(ctx.params.id, `/img/${randomName}`);
    ctx.body = res;
  },
  async putCover(ctx) {
    const id = ctx.params.id;
    const cover = ctx.params.cover;
    const res = await carousel.putCover(id, cover);
    ctx.body = res;
  },
  async selectAll(ctx) {
    let res = await carousel.selectAll();
    ctx.body = res;
  },
};

function getImg(ctx) {
  const srcFile = ctx.request.files.img;
  const randomName = new Date().getTime() + '.' + srcFile.name.split('.')[1];
  const tgtPath = `static/img/${randomName}`;
  const tgtContent = fs.readFileSync(srcFile.path);
  fs.writeFileSync(tgtPath, tgtContent);
  fs.unlinkSync(srcFile.path);
  return randomName;
}
