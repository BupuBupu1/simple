<template>
  <div>
    <Carousel v-model="current" loop autoplay :autoplay-speed="5000">
      <CarouselItem v-for="(item, index) in carousel" :key="item.id">
        <div
          class="img"
          :style="{
            backgroundImage: `url(http://127.0.0.1:91${item.img})`,
            backgroundSize: carousel[index].cover ? 'auto' : 'cover',
          }"
        ></div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      carousel: [],
    };
  },
  methods: {
    async getCarousel() {
      let { data } = await this.$axios.get('/carousel');
      this.carousel = data;
    },
  },
  created() {
    this.getCarousel();
  },
};
</script>

<style lang="scss" scoped>
.img {
  background-position: center;
  height: 500px;
}
@media screen and (max-width: 768px) {
  .img {
    height: 400px;
  }
}
@media screen and (max-width: 576px) {
  .img {
    height: 300px;
  }
}
</style>
