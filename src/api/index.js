import { get, post } from '../utils/request'
import base from './base'

export default {
    /**
     * 登录  
     * 参数:username  password
     */
    getLogin(params) {
        return post(base.login, params)
    },
    /**
     * 注册
     */
    getRegister(params) {
        return post(base.register, params)
    },
    /**
     * 表格
     */
    getTable(params) {
        return get(base.projectList, params)
    },
    //搜索  参数  search
    getSearch(params) {
        return get(base.search, params)
    },
    //类目
    selectItem(params) {
        return get(base.selectItem, params)
    },
    // 添加商品
    insertTbItem(params) {
        return get(base.insertTbItem, params)
    },
    // 删除
    deleteItemById(params) {
        return get(base.deleteItemById, params)
    },
    // 批量删除  参数:idArr
    batchDelete(params) {
        return get(base.batchDelete, params)
    },
    // 修改商品
    updateTbItem(params) {
        return get(base.updateTbItem, params)
    },
    // 参数页面  参数列表
    selectItemParamAll(params) {
        return get(base.selectItemParamAll, params)
    },
    // 规格参数 添加 [itemCatId, content,specsName]
    insertItemParam(params) {
        return get(base.insertItemParam, params)
    },
    // 规格参数删除
    delete(params) {
        return get(base.delete, params)
    }
}