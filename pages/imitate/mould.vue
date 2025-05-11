<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="mould_content">
			<web-view class="mould_scroll" :webview-styles="webviewStyles" src="/hybrid/html/mould.html"></web-view>
		</view>
		<!-- #endif -->
		<!-- <iframe :src="weburl" style="width: 120%;"></iframe> -->
		<view class="im_button">
			<view class="left">
				<view class="item">
					<image src="/static/images/imitate/im_chat.png" mode="widthFix"></image>
					<view class="title">Chat ngay</view>
				</view>
				<view class="item">
					<image src="/static/images/imitate/im_btn1.png" mode="widthFix"></image>
					<view class="title">Thêm vào Giỏ hàng</view>
				</view>
			</view>
			<view class="right">
				Mua ngay
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				weburl:'http://www.baidu.com/'
			}
		},
		onLoad(e) {
			
			let option = JSON.parse(e.data)
			uni.setStorageSync('webboon',false)
			// #ifdef H5
			this.web_view()
			// #endif
			
			
			// #ifdef APP-PLUS
			this.load_view()
			// #endif
		},
		methods:{
			web_view(weburl){//h5版
				window.postMessage('发送消息',weburl)
			},
			load_view(){ //APP版
				var e = 'https://www.koala-qt.com/app/home';
				var height_t = uni.getSystemInfoSync().statusBarHeight + 'px';
				var pagepus = plus.webview.create(e,'test', {plusrequire:'none',zindex: 10,bottom:'50px',top:0});
				var currentWebview = this.$mp.page.$getAppWebview();
					currentWebview.append(pagepus);
			}
		}
	}
</script>

<style lang="scss">
	.mould_content{ width: 100%;height: 100vh;overflow: hidden;
		.mould_scroll{
			/* 隐藏y轴滚动条 */
			margin-right: -20px; 
			padding-right: 20px;
		}
	}
	.im_button{ position: fixed;bottom: 0;left: 0;right: 0;display: flex;align-items: center;background-color: #ee4d2d;z-index: 999;
		.left{ background-color: #00bfa5;color: #FFFFFF;display: flex;align-items: center;text-align: center;flex: 1.2;
			image{ width: 24px;}
			.item{ padding: 5px 0;flex: 1;font-size: 12px;
				&+.item{border-left: 1px solid #08ad96;flex: 1.2;}
			}
		}
		.right{ flex: 1;color: #FFFFFF;text-align: center;
			button{ background-color: #ee4d2d;color: #FFFFFF;width: 100%;border-radius: 0;}
		}
	}
	::-webkit-scrollbar {
	    display: none;
	}
</style>
