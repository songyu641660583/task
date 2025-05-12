<template>
	<view class="warp header_top">
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-status-bar />
		<public-head title="VIP"></public-head>
		<!-- <view class="nav" style="width: 100%;height: 88rpx;"></view>
		<view class="logo">
			<image src="/static/images/vip/vip.png" mode=""></image>
		</view> -->
		<view class="card" hover-class="heartBeat" v-for="(item,index) in memberInfo" :key="index">
		 <view class="head">
         <view class="head-left">
				  	<image :src="item.img" mode=""></image>
					  <text class="text1">{{item.name}}</text>
				 </view>	
				 <view class="head-right" @click="navTo('/pages/index/member-hall?level='+item.level+'&levelindex='+levelindex)">
					  <view class="do-work">{{i18n.doWork}}</view>
						<!-- <view class="do-work">升级</view> -->
				 </view>
		 </view>
			<view class="center">
				<view class="text2"><text class="name">{{item.name}}</text> {{i18n.nameinfo[0]}}<text class="num">{{item.task_num}}</text>{{i18n.nameinfo[1]}}</view>
				<text class="text3">{{i18n.nametext}}</text>
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
			this.memberInfo = res.result.map((item, index) => ({
				...item,
				img: `/static/images/index/vip-icon${index}.png`
			}))
			console.log('this.memberInfo', this.memberInfo)
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
		padding: 20rpx 20rpx 30rpx;
		position: relative;
		width: 690rpx;
		background-color: #fff;
		// background: url(/static/images/vip/bgd.png) no-repeat;
		// background-size: 100% 100%;
		box-shadow: 0 2px 5px 1px rgba(0,0,0,.12);
		border-radius: 20rpx;
		margin-bottom: 68rpx;
		margin: 30rpx auto 0;
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-left {
				padding: 8rpx 16rpx;
				display: flex;
			  align-items: center;
				background: #3d5cff;
				border-radius: 50px;
				font-family: DIN;
				font-weight: 600;
				font-size: 26rpx;
				color: #fff;
				image {
					width:38rpx;
					height: 38rpx;

				}
			}

			&-right {
				padding: 15rpx 30rpx;
    background: #3d5cff;
    border-radius: 50px 0 0 50px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #fff;
			}
		}
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
				.name {
						color: #e20e0e;
				}
				.num {
			  	font-size: 28rpx;
					color: #e20e0e;
				}
			}
			.text3 {
				color: #86662a;
				font-size: 24rpx;
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
