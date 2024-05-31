<template>
  <row>
    <Col :xs="1" :sm="1" :md="2" :lg="3" :xl="4"></Col>
    <Col :xs="22" :sm="22" :md="20" :lg="18" :xl="16">
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
      <Divider />
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
    </Col>
    <Col :xs="1" :sm="22" :md="2" :lg="3" :xl="4"></Col>
  </row>
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
      content: '',
      heading: '',
      author: '',
      options: {
        placeholder: '请输入正文...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 切换按钮
            [{ align: [] }], // 对齐方式
            ['blockquote'], // 文本块/代码块
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
      await this.$axios.put(`/blog/${this.id}`, {
        heading: this.editHeading,
        content: html,
      });
      location.hash = '#/';
      this.$Spin.hide();
    },
    async get() {
      this.$Spin.show();
      const { data } = await this.$axios.get(`/blog/${this.id}`);
      this.$Spin.hide();
      const heading = data[0].heading;
      const content = data[0].content;
      this.editHeading = heading;
      this.editQuill.root.innerHTML = content;
    },
  },
  computed: {
    quill() {
      return this.$refs.editor.quill;
    },
    editQuill() {
      return this.$refs.editQuill.quill;
    },
  },
  created() {
    if (this.edit) this.get();
  },
};
</script>

<style lang="scss"></style>
