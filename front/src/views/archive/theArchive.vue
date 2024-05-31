<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/archive">归档</BreadcrumbItem>
      <BreadcrumbItem :to="nowTo">{{ nowStr }}</BreadcrumbItem>
    </Breadcrumb>
    <List item-layout="vertical">
      <ListItem v-for="item in data" :key="item.id">
        <ListItemMeta :avatar="item.avatar">
          <template #title>
            <div>
              <span style="cursor: pointer;" @click="toViewBlog(item.id)">
                {{ item.heading }}
              </span>
            </div>
          </template>
          <template #description>
            <div>
              <strong style="color: #df280f; margin-right:10px">{{ item.author }}</strong>
              <span>{{ item.updatedAt === item.createdAt ? '发布于' : '编辑于' }}</span>
              <span>
                {{ item.updatedAt === item.createdAt ? getBlogTime(item.createdAt) : getBlogTime(item.updatedAt) }}
              </span>
            </div>
          </template>
        </ListItemMeta>
        <template v-if="editMode" #action>
          <li @click="toEdit(item.id)" class="blue">
            <Icon type="ios-paper" />
            <span>修改</span>
          </li>
          <li class="red">
            <Icon @click="del(item.id)" type="ios-trash" />
            <span @click="del(item.id)">删除</span>
          </li>
          <MySelect :id="item.id"></MySelect>
        </template>
        <template #extra>
          <div style="cursor: pointer;" @click="toViewBlog(item.id)" v-html="item.firstImg"></div>
        </template>
        <div v-html="item.preview"></div>
      </ListItem>
      <div v-if="nodata" style="margin-top: 20px">
        <h1 h1>此分类暂无内容！</h1>
      </div>
    </List>
  </div>
</template>

<script>
import MySelect from '../home/select';
export default {
  components: {
    MySelect,
  },
  data() {
    return {
      data: [],
      nowStr: '',
      nowTo: '',
      nodata: false,
    };
  },
  methods: {
    async getTypeBlog() {
      this.$Spin.show();
      const type = location.hash.split('/')[2];
      const res = await this.$axios.get(`/blog/type/${type}`);
      if (res.data.length === 0) this.nodata = true;
      this.data = res.data.reverse();
      const getFilstImg = /<img.*?>/;
      const replace = /<img.*?>/g;
      const devide = /(<h1>|<h2>|<p>).*?(<\/h1>|<\/h2>|<\/p>)/g;
      this.data.forEach((item, i, arr) => {
        const first = item.content.match(getFilstImg);
        arr[i].firstImg = first ? first[0] : null;
        let preview = item.content.replace(replace, '[图片]');
        preview = preview.match(devide);
        const html1 = preview[0] || '';
        const html2 = preview[1] || '';
        const html3 = '<p>. . .</p>';
        if (preview[2]) preview = html1 + html2 + html3;
        else preview = html1 + html2;
        arr[i].preview = preview;
      });
      this.$Spin.hide();
    },
    async toEdit(id) {
      this.$Spin.show();
      this.$router.push(`/edit/edit/${id}`);
      this.$Spin.hide();
    },
    async toViewBlog(id) {
      const type = location.hash.split('/')[2];
      this.$router.push(`/archive/${type}/${id}`);
    },
    async del(id) {
      this.$Spin.show();
      await this.$axios.delete(`/blog/${id}`);
      this.getTypeBlog();
    },
    getBlogTime(tiem) {
      return new Date(tiem).toLocaleString();
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
  computed: {
    editMode() {
      return sessionStorage.edit === 'true';
    },
  },
  created() {
    this.getTypeBlog();
    this.getHash();
  },
};
</script>

<style lang="scss" scoped>
::v-deep img {
  max-width: 100% !important;
  min-width: 30% !important;
}
.ivu-list-item {
  margin: 20px 0 !important;
}
.ivu-icon {
  font-size: 25px;
  color: #444444 !important;
}
.ivu-list-item {
  word-break: break-all !important;
}
::v-deep .ivu-list-item-extra {
  max-width: 40% !important;
  display: flex;
  align-items: center;
}
::v-deep .ivu-list-item-main {
  & > div:nth-of-type(2) {
    max-height: 200px;
    overflow: hidden;
  }
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
@media screen and (max-width: 576px) {
  ::v-deep .ivu-list-item-extra {
    max-width: 100% !important;
  }
}
</style>
