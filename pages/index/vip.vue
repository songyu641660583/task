<template>
	<view class="warp header_top">
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-status-bar />
		<public-head title="VIP"></public-head>
		<view class="nav" style="width: 100%;height: 88rpx;"></view>
		<view class="logo">
			<image src="/static/images/vip/vip.png" mode=""></image>
		</view>
		<view class="card" @click="navTo('/pages/index/member-hall?level='+item.level+'&levelindex='+levelindex)" hover-class="heartBeat" v-for="(item,index) in memberInfo" :key="index">
			<image src="/static/images/vip/huangguan.png" mode=""></image>
			<view class="center">
				<text class="text1">{{item.name}}</text>
				<view class="text2">{{item.name}} {{i18n.nameinfo[0]}}<text>{{item.task_num}}</text>{{i18n.nameinfo[1]}}</view>
				<text class="text3">{{i18n.nametext}}</text>
			</view>
			<view class="right">
				<view class="r-btn">GO</view>
			</view>
			<view class="tip" v-if="item.is_recommended === 1">{{i18n.info}}</view>
		</view>
	</view>
</template>

<script>
import loading from "@/utils/mixin/loading.js"
export default {
	mixins:[loading],
	data() {
		return {
			memberInfo:[],
			levelindex:0
		};
	},
	computed:{
		i18n(){
			return this.$t('pagesvip');
		}
	},
	onLoad(e) {
		// console.log(e)
		this.levelindex = e.level;
		this.$http.requestajx('user_level','get',{}).then((res) => {
			// console.log(res);
			this.memberInfo = res.result;
		}).catch((error) => {
			console.log('错误重启');
		});
	},
	methods: {
		navTo(url) {
			uni.navigateTo({url})
		},
		async getUserLevel() {
			let res = await this.$http.userLevel()
			// console.log(res);
			this.memberInfo = res.result
		}
	},
	onShow() {
		// this.getUserLevel()
	}
};
</script>

<style lang="less">
	.logo {
		width: 188rpx;
		height: 94rpx;
		margin: 10rpx 0 52rpx 45rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
.warp {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 120rpx;
	.card {
		display: flex;
		position: relative;
		width: 690rpx;
		height: 232rpx;
		background: url(/static/images/vip/bgd.png) no-repeat;
		background-size: 100% 100%;
		box-shadow: 0px 0px 30rpx 0px rgba(253, 183, 34, 0.48);
		border-radius: 20rpx;
		margin-bottom: 68rpx;
		margin: 0 auto 30rpx;
		.tip {
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			width: 25px;
			height: 25px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: #161927;border: 2px solid rgba(253, 183, 34, 0.48);color: #fff;font-size: 10px;
		}
		image {
			width: 86rpx;
			height: 60rpx;
			margin: 38rpx 24rpx 0 40rpx;
		}
		.center {
			flex: 1;
			display: flex;
			flex-direction: column;
			.text1 {
				color: #000000;
				font-size: 34rpx;
				margin-top: 54rpx;
			}
			.text2 {
				color: #858585;
				font-size: 24rpx;
				margin-top: 26rpx;
				text {
					color: #ededed;
				}
			}
			.text3 {
				color: #86662a;
				font-size: 20rpx;
				margin-top: 10px;
			}
		}
		.right {
			display: flex;
			height: 100%;
			align-items: center;
			.r-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 112rpx;
				height: 48rpx;
				border-radius: 24rpx;
				border: solid 2rpx #7f725b;
				color: #7f725b;
				font-size: 36rpx;
				margin-right: 38rpx;
			}
		}
	}
}
</style>
