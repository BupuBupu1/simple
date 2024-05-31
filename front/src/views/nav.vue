<template>
  <ul id="navBox">
    <li v-if="width > 600" id="nav">
      <Menu mode="horizontal" theme="light" :active-name="nav" @on-select="route">
        <MenuItem :name="1">
          <i class="iconfont iconxingxing"></i>
          <span>首页</span>
        </MenuItem>
        <MenuItem :name="2">
          <i class="iconfont icondangwugongkai"></i>
          <span>管理</span>
        </MenuItem>
        <MenuItem :name="3">
          <i class="iconfont iconxingxing"></i>
          <span>内容</span>
        </MenuItem>
        <MenuItem :name="4">
          <i class="iconfont icondangwugongkai"></i>
          <span>归档</span>
        </MenuItem>
      </Menu>
    </li>
    <li v-else id="smallNav">
      <div>
        <div id="now">
          <i :class="['iconfont', nowIcon]"></i>
          <span>{{ nowTitle }}</span>
        </div>
        <Icon @click="back" id="back" type="md-arrow-back" />
        <Icon @click="toggle" id="button" class="yellow" type="md-menu" />
      </div>
      <div id="smallNavBox" :style="{ height: openNav ? '175px' : '0px' }">
        <Menu mode="vertical" theme="light" :active-name="nav" @on-select="route">
          <MenuItem :name="1">
            <i class="iconfont iconxingxing"></i>
            <span>首页</span>
          </MenuItem>
          <MenuItem :name="2">
            <i class="iconfont icondangwugongkai"></i>
            <span>管理</span>
          </MenuItem>
          <MenuItem :name="3">
            <i class="iconfont iconxingxing"></i>
            <span>内容</span>
          </MenuItem>
          <MenuItem :name="4">
            <i class="iconfont icondangwugongkai"></i>
            <span>归档</span>
          </MenuItem>
        </Menu>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      openNav: false,
      width: 0,
      nav: 1,
      nowTitle: '',
      nowIcon: '',
    };
  },
  methods: {
    route(name) {
      switch (name) {
        case 1:
          if (location.hash === '#/home') return (this.openNav = false);
          this.$router.push('/home');
          break;
        case 2:
          if (location.hash === '#/back') return (this.openNav = false);
          this.$router.push('/back');
          break;
        case 3:
          if (location.hash === '#/edit') return (this.openNav = false);
          this.$router.push('/edit');
          break;
        case 4:
          if (location.hash === '#/archive') return (this.openNav = false);
          this.$router.push('/archive');
          break;
      }
    },
    back() {
      this.$router.go(-1);
    },
    toHome() {
      this.openNav = false;
      this.nowTitle = '首页';
      this.nowIcon = 'iconxingxing';
    },
    toBack() {
      this.openNav = false;
      this.nowTitle = '管理';
      this.nowIcon = 'icondangwugongkai';
    },
    toEdit() {
      this.openNav = false;
      this.nowTitle = '内容';
      this.nowIcon = 'iconxingxing';
    },
    toArchive() {
      this.openNav = false;
      this.nowTitle = '归档';
      this.nowIcon = 'icondangwugongkai';
    },
    toggle() {
      this.openNav = !this.openNav;
    },
  },
  watch: {
    $route(route) {
      const hash = route.path.split('/')[1];
      switch (hash) {
        case 'home':
          this.toHome();
          this.nav = 1;
          break;
        case 'back':
          this.toBack();
          this.nav = 2;
          break;
        case 'edit':
          this.toEdit();
          this.nav = 3;
          break;
        case 'archive':
          this.toArchive();
          this.nav = 4;
          break;
      }
    },
  },
  created() {
    const hash = location.hash.split('/')[1];
    switch (hash) {
      case 'home':
        this.nav = 1;
        this.nowTitle = '首页';
        this.nowIcon = 'iconxingxing';
        break;
      case 'back':
        this.nav = 2;
        this.nowTitle = '管理';
        this.nowIcon = 'icondangwugongkai';
        break;
      case 'edit':
        this.nav = 3;
        this.nowTitle = '内容';
        this.nowIcon = 'iconxingxing';
        break;
      case 'archive':
        this.nav = 4;
        this.nowTitle = '归档';
        this.nowIcon = 'icondangwugongkai';
        break;
    }
  },
  mounted() {
    this.width = document.body.clientWidth;
    window.addEventListener('resize', () => {
      this.width = document.body.clientWidth;
    });
  },
};
</script>

<style lang="scss" scoped>
#navBox {
  background: #df280f !important;
  position: relative;
}
#nav {
  background: #df280f !important;
  height: 59px;
  overflow: hidden;
}
#smallNav {
  & > div {
    background: #df280f !important;
    position: relative;
    height: 59px;
  }
  .ivu-menu-light {
    border-top: 3px solid #ffdf00 !important;
    width: auto !important;
  }
  .ivu-menu-item {
    padding: 4px 0 !important;
    text-align: center;
    background: #df280f !important;
    &:hover {
      border-bottom: none !important;
    }
  }
  .ivu-menu-item-active {
    border-bottom: none !important;
  }
  .ivu-menu-item-active:not(.ivu-menu-submenu):after,
  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0px;
  }
}
#now {
  color: #ffdf00;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
  i {
    font-size: 24px;
    font-weight: bold;
  }
  top: 11px;
}
#smallNavBox {
  transition: 0.3s;
  overflow: hidden;
}
#button {
  position: absolute;
  font-size: 40px;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
#back {
  color: #ffdf00;
  position: absolute;
  font-size: 40px;
  top: 10px;
  left: 15px;
  cursor: pointer;
}
</style>
