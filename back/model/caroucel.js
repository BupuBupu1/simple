const { putCover } = require('../controler/caroucel');

module.exports = {
  async insert(path) {
    await this.create({
      img: path,
    });
    return true;
  },
  async delete(id) {
    const res = await this.findAll({
      where: {
        id: id,
      },
    });
    await this.destroy({
      where: {
        id: id,
      },
    });
    return res[0];
  },
  async put(id, img) {
    let res = await this.update(
      {
        img: img,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res[0];
  },
  async putCover(id, cover) {
    let res = await this.update(
      {
        cover: cover,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res[0];
  },
  async selectAll() {
    const carousel = await this.findAll({ attributes: ['id', 'img', 'cover'] });
    return carousel;
  },
};
