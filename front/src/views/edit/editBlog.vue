<template>
  <div>
    <h1 h1>编辑博文</h1>
    <section>
      <Input prefix="ios-book" v-model="editHeading" placeholder="标题" style="width: 300px" />
    </section>
    <section>
      <QuillEditor ref="editQuill" v-model="editContent" :options="options"></QuillEditor>
    </section>
    <section>
      <Button @click="put" type="info">确认</Button>
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
      editContent: '',
      editHeading: '',
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
      this.$Spin.hide();
      this.$router.push('/');
    },
    async put() {
      const html = this.editQuill.root.innerHTML;
      if (this.editHeading === '') return this.$Message.info('标题不能为空！');
      if (html === '<p><br></p>') return this.$Message.info('内容不能为空！');
      this.$Spin.show();
      const id = location.hash.split('/')[3];
      await this.$axios.put(`/blog/${id}`, {
        heading: this.editHeading,
        content: html,
      });
      location.hash = '#/';
      this.$Spin.hide();
    },
    async get() {
      this.$Spin.show();
      const id = location.hash.split('/')[3];
      const { data } = await this.$axios.get(`/blog/${id}`);
      this.$Spin.hide();
      const heading = data[0].heading;
      const content = data[0].content;
      this.editHeading = heading;
      this.editQuill.root.innerHTML = content;
    },
  },
  computed: {
    editQuill() {
      return this.$refs.editQuill.quill;
    },
  },
  created() {
    this.get();
  },
};
</script>

<style></style>
