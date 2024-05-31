module.exports = {
  async post(heading, author, content) {
    await this.create({
      heading: heading,
      author: author,
      content: content,
    });
  },
  async delete(id) {
    let res = await this.destroy({
      where: {
        id: id,
      },
    });
    return res;
  },
  async put(id, heading, content) {
    let res = await this.update(
      {
        heading: heading,
        content: content,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res[0];
  },
  async select(id) {
    const blog = await this.findAll({
      where: {
        id: id,
      },
    });
    return blog;
  },
  async selectAll() {
    const blogs = await this.findAll();
    return blogs;
  },
  async getType(type) {
    return await this.findAll({
      where: {
        type: type,
      },
    });
  },
  async getSomeBlogs(num) {
    let res = await this.findAll();
    res.reverse();
    res = res.slice(num, num + 2);
    return res || '已加载全部博文';
  },
  async putType(id, type) {
    const res = await this.update(
      {
        type: type,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res;
  },
};
