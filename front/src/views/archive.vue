<template>
  <Row id="archive">
    <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="6"></Col>
    <Col :xs="22" :sm="22" :md="20" :lg="18" :xl="12">
      <router-view></router-view>
    </Col>
    <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="6"></Col>
  </Row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#archive {
  margin-top: 20px;
}
</style>
