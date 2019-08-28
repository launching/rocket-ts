import Vue from 'vue';
import Router from 'vue-router';
import RVForm from './views/Form.vue';
import RVLocalTable from './views/LocalTable.vue';
import RVService from './views/ServiceTable.vue';
import RVLogin from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: RVLogin,
    },
    {
      path: '/',
      name: 'form',
      component: RVForm,
    },
    {
      path: '/localtable',
      name: 'localtable',
      component: RVLocalTable,
    },
    {
      path: '/servicetable',
      name: 'servicetable',
      component: RVService,
    },
    {
      path: '/toolbar',
      name: 'toolbar',
      component: () => import(/* webpackChunkName: "about" */ './views/ToolBar.vue'),
    },
  ],
});
