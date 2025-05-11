import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import store from './store/index.js'
import http from './service/methods.js'
import './utils/mixin/toast.js'
import configurl from './service/config.js'
import VueI18n from 'vue-i18n' 
import langjs from 'common/language/language.js'
import socketinit from 'common/socket/socketio.js'
import VueClipboard from 'vue-clipboard2';


Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(VueI18n);
Vue.use(VueClipboard);
Vue.use(uView);
// http请求
Vue.prototype.$http = http;

//vuex
Vue.prototype.$store = store;
Vue.prototype.$configurl = configurl;
Vue.prototype.$socketinit = socketinit;

// 引入全局加载动画
import loadingPlus from "@/utils/mixin/loading-plus.vue"
import nerworkError from "@/components/network-error/network-error.vue"
Vue.component('loading-plus', loadingPlus)
Vue.component('network-error', nerworkError)


// 全局过滤器(单位)
Vue.filter('formatunit', (val) => {
	return Number(val) + "$"
})


// 全局过滤器(价格)
Vue.filter('formatPrice', (val) => {
	return Number(val).toFixed(2) + "$"
})

// #ifdef APP-PLUS
uni.getSystemInfo({
		success: (res) => {
			if (res.platform == 'android') {
				let main = plus.android.runtimeMainActivity();
				plus.runtime.quit = function(){
					main.moveTaskToBack(false);
				};
				plus.nativeUI.toast = (function(str){
					if(str == '再按一次退出應用'){
						main.moveTaskToBack(false);
						return false;
					}else{
						uni.showToast({
							title: uni.getStorageSync('ajaxmess').checkout,
							icon:'none',
						})
					}
				});
			}
		},
	})
	
// #endif
const i18n = new VueI18n({
  locale: 'zh', 
  messages: langjs
})
Vue.prototype._i18n = i18n;
const app = new Vue({
	i18n,
	...App
})

app.$mount()
