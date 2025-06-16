<template>
	<view class="help_back header_top">
		<web-view style="width:100vw;height:100vh" src="https://wa.me/447350248091"></web-view>
		   <view  class="loading-wrap" v-if="loading">
		      <!-- 自定义加载动画 -->
		      <uni-load-more status="loading"></uni-load-more>
		      <text>页面加载中...</text>
		    </view>
		<!-- 	<view class="help-list animated fadeIn faster">
			<loading-plus v-if="isShow"></loading-plus>
			<public-head :headshow="false" :title="i18n.munelist[0]" backcolor="rgba(255,255,255,.1)" color_icon="#fff"></public-head>
			<view class="help_content">
				<rich-text :nodes="richjson"></rich-text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				richjson: '',
				current: 0,
				isShow: true,
				loading: true
			};
		},
		computed: {
			i18n() {
				return this.$t('index');
			}
		},
		created() {
			setTimeout(() => {
				this.loading = false
			}, 3000)
		},
		methods: {
			helpjson() {
				this.$http.requestajx('help/usage_agreement', 'get', {}).then((res) => {
					// console.log(res)
					this.richjson = res.result;
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		onShow() {
			// this.helpjson();
			// setTimeout(()=>{
			// 	this.isShow = false
			// },1000)
		}
	};
</script>

<style lang="less">
	.help_back {
		// background: url('/static/images/profile/backbanner.jpg') no-repeat;
		// background-size: 100% 100%;
		min-height: 100vh;
		.loading-wrap {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  height: 100vh;
		  background-color: #fff;
		}
	}

	.help_content {
		padding: 23px 23px 70px;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 25px;
	}

	.tui-content {
		padding: 20rpx 30rpx;
		background-color: #fff;
		color: #999999;
		font-size: 24rpx;
		line-height: 33rpx;
	}
</style>