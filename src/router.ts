import Vue from 'vue';
import Router from 'vue-router';
import RVForm from './views/Form.vue';
import RVLocalTable from './views/LocalTable.vue';
import RVService from './views/ServiceTable.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'from',
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ToolBar.vue'),
    },
  ],
});
