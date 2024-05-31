<template>
  <div style="margin-top: 20px">
    <List border size="large">
      <ListItem>
        <a @click="getType('history')">
          <Icon type="ios-book" />
          <span>历史</span>
        </a>
      </ListItem>
      <ListItem>
        <a @click="getType('people')">
          <Icon type="ios-people" />
          <span>人物</span>
        </a>
      </ListItem>
      <ListItem>
        <a @click="getType('work')">
          <Icon type="ios-hammer" />
          <span>著作</span>
        </a>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getType(type) {
      location.hash = `#/theArchive/${type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.ivu-list-item {
  background: #df280f !important;
  & * {
    color: #ffdf00 !important;
    font-size: 20px !important;
  }
  i {
    margin-right: 5px;
  }
}
</style>
