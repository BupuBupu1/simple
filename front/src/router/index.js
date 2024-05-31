import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '../views/home.vue';
import back from '../views/back.vue';
import edit from '../views/edit.vue';
import editCommon from '../views/edit/common.vue';
import editBlog from '../views/edit/editBlog.vue';

import archive from '../views/archive.vue';
import archiveIndex from '../views/archive/archiveIndex.vue';
import theArchive from '../views/archive/theArchive.vue';
import blog from '../views/archive/blog.vue';

const routes = [
  { path: '/home', component: home },
  { path: '/back', component: back },
  {
    path: '/edit',
    component: edit,
    children: [
      { path: '/edit', component: editCommon },
      { path: '/edit/:mode/:id', component: editBlog },
    ],
  },
  {
    path: '/archive',
    component: archive,
    children: [
      { path: '/archive', component: archiveIndex },
      { path: '/theArchive/:type', component: theArchive },
      { path: '/archive/:type/:id', component: blog },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
