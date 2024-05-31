<template>
  <div>
    <MyCarousel></MyCarousel>
    <BlogList></BlogList>
  </div>
</template>

<script>
import MyCarousel from './home/carousel';
import BlogList from './home/blogList';
export default {
  components: {
    MyCarousel,
    BlogList,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
