<template>
  <div id="back">
    <row>
      <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="4"></Col>
      <Col :xs="22" :sm="22" :md="20" :lg="18" :xl="16">
        <ul>
          <li><h2>打开编辑模式</h2></li>
          <li><i-Switch v-model="edit" /></li>
        </ul>
      </Col>
      <Col :xs="1" :sm="22" :md="2" :lg="3" :xl="4"></Col>
    </row>
  </div>
</template>

<script>
import Carousel from './back/caroucel';
import Blog from './back/blog';
export default {
  components: {
    Blog,
    Carousel,
  },
  computed: {
    edit: {
      get() {
        return sessionStorage.edit === 'true';
      },
      set(val) {
        sessionStorage.edit = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
#back {
  padding-top: 20px;
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    margin: 0 10px;
  }
}
h2 {
  color: black;
}
</style>
