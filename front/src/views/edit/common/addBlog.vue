<template>
  <div>
    <h1 h1>添加博文</h1>
    <section>
      <Input prefix="ios-book" v-model="heading" placeholder="标题" style="width: 300px" />
    </section>
    <section>
      <Input prefix="ios-contact" v-model="author" placeholder="作者" style="width: 300px" />
    </section>
    <section>
      <QuillEditor ref="editor" v-model="content" :options="options"></QuillEditor>
    </section>
    <section>
      <Button @click="post" type="success">提交</Button>
    </section>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    QuillEditor: quillEditor,
  },
  data() {
    return {
      content: '',
      heading: '',
      author: '',
      options: {
        placeholder: '请输入正文...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 切换按钮
            [{ align: [] }], // 对齐方式
            [{ header: 1 }, { header: 2 }], // 用户自定义按钮值
            ['image'],
          ],
        },
      },
    };
  },
  methods: {
    async post() {
      const html = this.quill.root.innerHTML;
      if (this.heading === '') return this.$Message.info('标题不能为空！');
      if (html === '<p><br></p>') return this.$Message.info('内容不能为空！');
      this.$Spin.show();
      await this.$axios.post('/blog', {
        heading: this.heading,
        author: this.author || '布尔什维克',
        content: html,
      });
      this.$router.push('/home');
    },
  },
  computed: {
    quill() {
      return this.$refs.editor.quill;
    },
  },
};
</script>

<style></style>
