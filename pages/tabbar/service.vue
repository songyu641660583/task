<template>
    <view>
		<!-- #ifdef H5 -->
        <web-view :webview-styles="webviewStyles"
		 :src="webviewsrc">
		 </web-view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			webviewsrc:'https://kefu.easemob.com/webim/im.html?configId=982d8f2d-06db-49ab-9e14-673c151172b6',
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		}
	},
    onReady() {
        // #ifdef APP-PLUS
        /* var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
        setTimeout(function() {
            wv = currentWebview.children()[0]
            wv.setStyle({top:150,height:300})
        }, 1000); //如果是页面初始化调用时，需要延时一下 */
		var e = 'https://kefu.easemob.com/webim/im.html?configId=982d8f2d-06db-49ab-9e14-673c151172b6';
		var height_t = uni.getSystemInfoSync().statusBarHeight + 50 + 'px';
		var pagepus = plus.webview.create(e,'test', {plusrequire:'none',zindex: 10,bottom:'0px',top:'0px'});
		var currentWebview = this.$mp.page.$getAppWebview();
			currentWebview.append(pagepus);
        // #endif
        }
    };
</script>