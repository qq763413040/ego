import api from '../../api'
import jwt from 'jwt-decode'
import router from '../../router'
import element from 'element-ui'

export default {
    namespaced: true,
    state: {
        userInfo: {
            username: '',
            token: '',
            isLogin: false
        }
    },
    mutations: {
        setUserInfo(state, params) {
            state.userInfo = params
        }
    },
    actions: {
        getLoginActions({ commit }, { username, password }) {
            api.getLogin({ username, password }).then((res) => {
                if (res.status === 200) {
                    let temp = {
                        username: jwt(res.data).username,
                        token: res.data,
                        isLogin: true,
                    };
                    // 存入vuex
                    commit('setUserInfo', temp);
                    // 存入本地
                    localStorage.setItem("userInfo", JSON.stringify(temp));

                    // 成功提示
                    element.Message.success(
                        "恭喜你，登录成功",
                    );

                    // 跳转
                    setTimeout(() => {
                        router.push("/");
                    }, 600);
                } else {
                    // 错误提示
                    element.Message.error("账号或密码错误");
                }
            });
        }

    }
}