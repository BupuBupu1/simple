<template>
  <Select v-model="type" style="width:150px">
    <Option value="history" key="history">历史</Option>
    <Option value="people" key="people">人物</Option>
    <Option value="work" key="work">著作</Option>
  </Select>
</template>

<script>
export default {
  props: {
    id: '',
  },
  data() {
    return {
      type: '',
    };
  },
  methods: {
    async getBlog(id) {
      const { data } = await this.$axios.get(`/blog/${id}`);
      this.type = data[0].type;
    },
  },
  watch: {
    async type(type, old) {
      if (!old) return;
      await this.$Spin.show();
      await this.$axios.put(`/blog/${type}/${this.id}`);
      this.$Spin.hide();
    },
  },
  mounted() {
    this.getBlog(this.id);
  },
};
</script>

<style></style>
