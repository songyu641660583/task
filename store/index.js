import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
	info:{},
	level:'',
	balanceprice:0,
	socketuid:'',
	socketjson:[],
	socketjsonlist:[],
	sockettotal:null,
	msgnumindex:0,//系统推送未查看消息
	onlinebool:false,//是否在线
	allonline:uni.getStorageSync('allonline') || 0,//后台信息
	socketonline:uni.getStorageSync('socketonline') || 0 //上级信息
}
const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
if(module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutations', './actions','./getters'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        const newMutations = require('./mutations').default
        const newActions = require('./actions').default
        const newGetters = require('./getters').default
        // 加载新模块
        store.hotUpdate({
            mutations: newMutations,
            actions:newActions,
            getters:newGetters
        })
    })
}
export default store; 