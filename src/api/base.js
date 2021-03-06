export default {
    baseUrl: 'http://localhost:3000',
    login: '/api/api/login',//登录
    register: '/api/api/register',//注册
    projectList: '/api/api/projectList',//表格数据
    search: '/api/api/search',//搜索
    selectItem: "/api/api/backend/itemCategory/selectItemCategoryByParentId",//类目选择
    upload: '/api/upload',//上传图片
    insertTbItem: '/api/api//backend/item/insertTbItem',//添加商品
    deleteItemById: '/api/api/backend/item/deleteItemById',//删除
    batchDelete: '/api/api/batchDelete',//批量删除  idArr
    updateTbItem: '/api/api/backend/item/updateTbItem',//修改商品
    selectItemParamAll: '/api/api/backend/itemParam/selectItemParamAll',//参数页面  参数列表
    insertItemParam: "/api/api/backend/itemParam/insertItemParam",//规格参数 添加 [itemCatId, content,specsName]
    delete: '/api/api/params/delete',//删除规格参数
}