<template>
  <row>
    <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="4"></Col>
    <Col :xs="22" :sm="22" :md="20" :lg="18" :xl="16">
      <Breadcrumb>
        <BreadcrumbItem to="/archive">归档</BreadcrumbItem>
        <BreadcrumbItem :to="nowTo">{{ nowStr }}</BreadcrumbItem>
        <BreadcrumbItem>{{ heading }}</BreadcrumbItem>
      </Breadcrumb>
      <h1 h1>{{ heading }}</h1>
      <div v-html="content"></div>
    </Col>
    <Col :xs="1" :sm="22" :md="2" :lg="3" :xl="4"></Col>
  </row>
</template>

<script>
export default {
  data() {
    return {
      heading: '',
      content: '',
      nowStr: '',
      nowTo: '',
    };
  },
  methods: {
    async get() {
      this.$Spin.show();
      const id = location.hash.split('/')[3];
      const { data } = await this.$axios.get(`/blog/${id}`);
      this.$Spin.hide();
      this.heading = data[0] ? data[0].heading : '';
      this.content = data[0] ? data[0].content : '该博文正在书写中...';
    },
    getHash() {
      switch (location.hash.split('/')[2]) {
        case 'history':
          this.nowStr = '历史';
          break;
        case 'people':
          this.nowStr = '人物';
          break;
        case 'work':
          this.nowStr = '著作';
          break;
      }
      this.nowTo = `/theArchive/${location.hash.split('/')[2]}`;
    },
  },
  created() {
    this.get();
    this.getHash();
  },
};
</script>

<style lang="scss" scoped>
::v-deep img {
  max-width: 100% !important;
}
::v-deep p,
h1,
h2 {
  word-break: break-all !important;
}
[h1] {
  font-size: 30px;
  font-weight: bold;
}
</style>
