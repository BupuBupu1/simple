<template>
  <section>
    <input id="post" class="file" type="file" @change="post" />
    <input id="put" class="file" type="file" @change="put" />
    <h1 h1>添加轮播图</h1>
    <div style="display: flex">
      <Button @click="toPost" style="margin: 0 auto" type="success">添加</Button>
    </div>
    <Divider />
    <h1 h1>编辑轮播图</h1>
    <Row type="flex" justify="start" align="middle">
      <Col v-for="(item, index) in carousel" class="carousel" :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :key="index">
        <Row type="flex" justify="space-around" align="middle">
          <Col push="1" class="num">{{ index + 1 }}</Col>
          <Col>
            <div
              @click="toPut(item.id)"
              :style="{ backgroundImage: `url(http://127.0.0.1:91${item.img})` }"
              class="img"
            ></div>
          </Col>
          <Col pull="1" class="buttons">
            <Button @click="toPut(item.id)" type="info">修改</Button>
            <Button @click="del(item.id)" type="error" style="background: #dd290f">
              删除
            </Button>
            <i-Switch
              size="large"
              v-model="carousel[index].cover"
              true-color="#dd290f"
              @on-change="
                (e) => {
                  putCover(item.id, e);
                }
              "
            >
              <span slot="open">人民</span>
              <span slot="close">领袖</span>
            </i-Switch>
          </Col>
        </Row>
        <Divider :class="{ invisible: carousel.length === index + 1 }" dashed />
      </Col>
    </Row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      toPostcarouselId: '',
      toPutcarouselId: '',
      carousel: [],
    };
  },
  methods: {
    toPost(id) {
      document.querySelector('#post').click();
      this.toPostcarouselId = id;
    },
    async post(e) {
      this.$Spin.show();
      const fd = new FormData();
      fd.append('img', e.target.files[0]);
      await this.$axios.post('/carousel', fd);
      this.$Spin.hide();
      this.getcarousel();
    },
    async del(id) {
      this.$Spin.show();
      await this.$axios.delete(`/carousel/${id}`);
      this.$Spin.hide();
      this.getcarousel();
    },
    toPut(id) {
      document.querySelector('#put').click();
      this.toPutcarouselId = id;
    },
    async put(e) {
      await this.$Spin.show();
      const fd = new FormData();
      fd.append('img', e.target.files[0]);
      await this.$axios.put(`/carousel/${this.toPutcarouselId}`, fd);
      await this.$Spin.hide();
      this.getcarousel();
    },
    async putCover(id, cover) {
      this.$Spin.show();
      const bool = cover ? 1 : 0;
      await this.$axios.put(`/carousel/${id}/${bool}`);
      this.$Spin.hide();
    },
    async getcarousel() {
      this.$Spin.show();
      const { data } = await this.$axios.get('/carousel');
      this.carousel = data;
      this.$Spin.hide();
    },
    getImg(file) {
      const fd = new FormData();
      fd.append('img', file.files[0]);
    },
  },
  created() {
    this.getcarousel();
  },
};
</script>

<style lang="scss" scoped>
.num {
  font-size: 20px;
  font-weight: bold;
}
.img {
  width: 150px;
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  & > * {
    margin: 5px 0;
  }
}
.ivu-divider {
  margin: 15px 0;
}
.invisible {
  display: none;
}
</style>
