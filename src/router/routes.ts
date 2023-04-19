import { RouteRecordRaw } from 'vue-router';
import { Route } from 'src/models/route';

const routes: RouteRecordRaw[] = [];
for (const [key, value] of Object.entries(
  JSON.parse(localStorage.getItem('routes') || '{}')
)) {
  const route = value as Route;
  routes.push({
    path: route.path,
    component: () => import('layouts/MainLayout.vue'),
    meta: { isPublic: route.isPublic },
    children: [
      {
        path: '',
        name: key,
        component: () => import(`../pages/${route.component}.vue`),
      },
    ],
  });
}

// Always leave this as last one,
// but you can also remove it
routes.push({
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue'),
});
export default routes;
