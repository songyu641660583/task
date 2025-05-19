<template>
	<view class="header_top">
		<loading-plus v-if="isShow"></loading-plus>
		<public-head :title="i18n.selectmode"></public-head>
		<view class="pay-mode">
			<view class="mode" v-for="(item,index) in munelist" :key="index" @click="muneclick(index)">
				<view class="mode-left">
					<image :src="item.imgsrc" mode="" style="width: 36rpx;height: 36rpx;"></image>
					<text>{{i18n[item.name]}}</text>
				</view>
				<image src="/static/images/profile/btn_01_right.png" mode="" style="width: 18rpx;height: 30rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			munelist:[{imgsrc:'/static/images/profile/code.png',name:"usdtpay"}],
			// munelist:[{imgsrc:'/static/images/profile/btn_card.png',name:"onlinepay"},{imgsrc:'/static/images/profile/code.png',name:"usdtpay"}],
			isShow:true
		};
	},
	computed:{
		i18n(){
			return this.$t('payselect');
		}
	},
	methods: {
		muneclick(index){
			// if(index > 0){
				let that = this;
				this.$http.requestajx('user_recharge/online_recharge_status','get',{}).then(function(res){
						let code = res.code;
						if(code === 200){
							if(res.result === 1){
								uni.navigateTo({
								    url: '/pages/wallet/scancode-pay'
								});
							}else{
								that.totat(that.i18n.modeinfo);
							}
						}
				});
			// }else{
			// 	uni.navigateTo({
			// 	    url: '/pages/profile/bank-pay'
			// 	});
			// }
		}
	},
	onShow() {
		setTimeout(()=>{
			this.isShow = false
		},500)
	}
};
</script>

<style lang="less">

.member-list {
	width: 100%;
	height: 300rpx;
	white-space: nowrap;
	background-color: #fff;
	.member-item {
		display: inline-block;
		width: 230rpx;
		height: 160rpx;
		border-radius: 15rpx;
		box-shadow: 0px 6px 32px 0px rgba(0, 35, 68, 0.14);
		margin-left: 40rpx;
		margin-right: 20rpx;
		margin-top: 100rpx;
		text-align: center;
		.opendate{ color:#333333;padding-top: 5px;}
		image {
			width: 32rpx;
			height: 28rpx;
			margin-top: 14rpx;
		}
		view {
			color: #ffffff;
			font-size: 22rpx;
		}
		view:nth-child(2) {
			margin: 10rpx 0;
		}
	}
}
.pay-mode {
	width: 100%;
	padding: 0 48rpx;
	margin-top: 60rpx;
	.title {
		color: #818181;
		font-size: 30rpx;
		margin-bottom: 44rpx;
		
	}
	.color_red{ color:#f62f3d;font-size: 28rpx;}
	.mode {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 88rpx;
		.mode-left {
			display: flex;
			align-items: center;
			image {
				width: 44rpx;
				height: 28rpx;
				margin-right: 20rpx;
			}
			text {
				color: #3b3b3b;
				font-size: 28rpx;
			}
		}
	}
}
.btn {
	margin-top: 400rpx;
}
</style>
