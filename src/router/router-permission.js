import router from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogin)) {
        next()

    } else {
        if (store.state.loginModule.userInfo.token) {
            next()
        } else {
            next('/login')
        }
    }

})