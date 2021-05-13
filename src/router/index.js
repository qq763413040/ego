import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Error from '../views/Error'
import Login from '../views/Login'


//----------------------
import Order from "../views/OrderManage"
const OrderList = () =>
  import('../views/OrderManage/order-list')
const ProductManage = () =>
  import('../views/OrderManage/product-manage')
const ProductionList = () =>
  import('../views/OrderManage/product-manage/production-list')
const ReviewManage = () =>
  import('../views/OrderManage/product-manage/review-manage')
const ReturnGoods = () =>
  import('../views/OrderManage/return-goods')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product')
      },
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert')
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        children: [
          {
            path: '/order/orderList',
            name: 'OrderList',
            component: OrderList
          },
          {
            path: '/order/product',
            name: 'ProductManage',
            component: ProductManage,
            children: [
              {
                path: '/order/product/productionList',
                name: 'ProductionList',
                component: ProductionList
              },
              {
                path: '/order/product/review',
                name: 'ReviewManage',
                component: ReviewManage
              },
            ]
          },
          {
            path: '/order/returng',
            name: 'ReturnGoods',
            component: ReturnGoods
          }

        ]
      },

    ],
    meta: {
      isLogin: true
    },
    redirect: '/product'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    component: Error
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
