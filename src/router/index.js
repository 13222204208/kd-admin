import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },



  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'AdminList',
        component: () => import('@/views/admin/index'),
        meta: { title: '后台帐号', icon: 'el-icon-user-solid' }
      },
      {
        path: 'create',
        name: 'CreateAdmin',
        component: () => import('@/views/admin/create'),
        meta: { title: '添加后台帐号', icon: 'tree' },
        hidden: true
      },

      {
        path: 'edit',
        name: 'EditAdmin',
        component: () => import('@/views/admin/edit'),
        meta: { title: '编辑后台帐号', icon: 'tree' },
        hidden: true
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-user' }
      },

    ]
  },

  {
    path: '/real-name',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'RealNameList',
        component: () => import('@/views/real-name/index'),
        meta: { title: '实名认证', icon: 'el-icon-tickets' }
      }
    ]
  },


  {
    path: '/user-guide',
    component: Layout,
    children: [
      {
        path: 'content',
        name: 'UserGuide',
        component: () => import('@/views/user-guide/index'),
        meta: { title: '服务协议', icon: 'el-icon-male' }
      }
    ]
  },


  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表', icon: 'table' },
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/order/edit'),
        name: 'EditOrder',
        meta: { title: '回复订单', noCache: true, activeMenu: '/order/index' },
        hidden: true
      },
    ]
  },

  {
    path: '/goods-type',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'GoodsTypeList',
        component: () => import('@/views/goods-type/index'),
        meta: { title: '物品类型', icon: 'el-icon-s-goods' },
      },
      {
        path: 'create',
        name: 'CreateGoodsType',
        component: () => import('@/views/goods-type/create'),
        meta: { title: '添加物品类型', icon: 'tree' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/goods-type/edit'),
        name: 'EditGoodsType',
        meta: { title: '编辑物品类型', noCache: true, activeMenu: '/goods-type/index' },
        hidden: true
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
