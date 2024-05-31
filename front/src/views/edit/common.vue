<template>
  <div>
    <Carrousel></Carrousel>
    <Divider />
    <AddBlog></AddBlog>
    <Divider />
    <EditBlogTips></EditBlogTips>
  </div>
</template>

<script>
import AddBlog from './common/addBlog';
import Carrousel from './common/caroucel';
import EditBlogTips from './common/editBlogTips';
export default {
  components: {
    AddBlog,
    Carrousel,
    EditBlogTips,
  },
};
</script>

<style></style>
