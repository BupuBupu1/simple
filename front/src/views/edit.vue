<template>
  <row style="padding: 20px 0 40px 0">
    <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="4"></Col>
    <Col :xs="22" :sm="22" :md="20" :lg="18" :xl="16">
      <router-view></router-view>
    </Col>
    <Col :xs="1" :sm="22" :md="2" :lg="3" :xl="4"></Col>
  </row>
</template>
<script>
import EditBlog from './edit/editBlog';
import Common from './edit/common';
export default {
  components: {
    EditBlog,
    Common,
  },
};
</script>

<style></style>
