
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'simpleAPIForm', component: () => import('pages/simpleAPIForm.vue') },
      { path: '2048', component: () => import('pages/2048.vue') },
      { path: 'minesweeper', component: () => import('pages/minesweeper.vue') },
      { path: 'multiPageForm', component: () => import('pages/multiPageFrom.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
