import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


const messages = {
    zn: {
        message: {
            home: {
                ego: "易购后台管理平台",
                commodity: '商品管理',
                params: '规格参数',
                advertising: '广告分类',
                personalCenter: '个人中心',
                orderManagement: '订单管理',
                orderList: "订单列表",
                production: '生产管理',
                productionList: '生产列表',
                AuditManagement: '审核管理',
                returnManagement: '退货管理',
            }
        }
    },
    en: {
        message: {
            home: {
                ego: "ego",
                commodity: 'commodity manage',
                params: 'params',
                advertising: 'advertising',
                personalCenter: "personal center",
                orderManagement: 'order management',
                orderList: 'orderList',
                production: 'production',
                productionList: 'productionList',
                AuditManagement: 'Audit management',
                returnManagement: 'return management',
            }
        }
    },

}

const i18n = new VueI18n({
    locale: 'zn',
    messages
})

export default i18n