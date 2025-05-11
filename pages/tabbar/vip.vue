<template>
	<view class="warp header_top">
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-status-bar />
		<view class="nav" style="width: 100%;height: 60rpx;"></view>
		<view class="logo">
			<image src="/static/images/vip/vip.png" mode=""></image>
		</view>
		<view class="card" @click="navTo(item.is_recommended,index)" hover-class="heartBeat" v-for="(item,index) in memberInfo" :key="index">
			<image src="/static/images/vip/huangguan.png" mode=""></image>
			<view class="center">
				<view class="text1">{{item.name}} <text>{{item.price | formatunit}}</text></view>
				<view class="text2">{{item.name}} {{i18n.nameinfo[0]}}<text>{{item.task_num}}</text>{{i18n.nameinfo[1]}}</view>
				<view class="text3">{{i18n.nametext}}</view>
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
			memberInfo:[]
		};
	},
	computed:{
		i18n(){
			return this.$t('pagesvip');
		},
		i18nbtn(){
			return this.$t('btncomfirm');
		}
	},
	onLoad() {
		this.getUserLevel();
	},
	methods: {
		async navTo(e,index) {
			if(e!==1){
				let res = await this.$http.accountInfo();
				if(res.result.balance < this.memberInfo[index].price){
					uni.showModal({
						title: '',
						content: this.i18n.modetitle,
						cancelText:this.i18nbtn[0],
						confirmText:this.i18nbtn[1],
						success(res) {
							if (res.confirm) {
								uni.navigateTo({url:'/pages/profile/selectmode'});
							}
						}
					});
					
				}else{
					uni.navigateTo({url:'/pages/profile/open-member'});
				}
			}else{
				uni.navigateTo({url:'/pages/vip/tasklist?level='+this.memberInfo[index].level});
			}
			/* let res = await this.$http.accountInfo();
			let data = res.result.user_member,that = this;
			let urlbool = data.some(function(item,index,arr){
				return item.level == that.memberInfo[e].level;
			});
			if(!urlbool){
				uni.navigateTo({url:'/pages/profile/selectmode'})
			} */
			// console.log(urljson)
		},
	    getUserLevel() {
			this.$http.requestajx('user_level','get',{}).then((res) => {
				// console.log(res);
				this.memberInfo = res.result;
			}).catch((error) => {
				console.log('错误重启');
			});
		}
	},
	onShow() {
		this.getUserLevel()
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
	width: 100%;
	padding: 0 20px;
	padding-bottom: 100px;
	.card {
		display: flex;
		position: relative;
		width: 100%;
		margin-bottom: 15px;
		padding-bottom: 10px;
		background: url(/static/images/vip/bgd.png) no-repeat;
		background-size: 100% 100%;
		box-shadow: 0px 0px 30rpx 0px rgba(253, 183, 34, 0.48);
		border-radius: 20rpx;
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
			/* background: url(/static/images/vip/icon_tuijian.png) no-repeat;
			background-size: 100% 100%; */
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
				text{ font-size: 28rpx;color: #FA4A80;margin-left: 15px;}
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
