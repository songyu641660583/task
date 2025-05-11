<template>
	<view class="header_top">
		<loading-plus v-if="isShow"></loading-plus>
			<public-head :title="i18n.title" :btntxt="i18n.titlebtn" v-on:initbtn="btn_on"></public-head>
			<scroll-view scroll-x  class="member-list">
				<view
					class="member-item"
					v-for="(item, index) in memberList"
					:key="index"
					:style="{ background: index === currentIndex ? 'url(/static/images/profile/pic_02.png)' : '', 'background-size': index === currentIndex ? '100% 100%' : '' }"
					@click="itemClick(index,item.level,item.status)"
				>
					
					<view v-if="item.status">
						<image :src="index === currentIndex ? '/static/images/profile/btn_vip.png' : '/static/images/profile/VIP.png'" mode=""></image>
						<view :style="{ color: index === currentIndex ? '' : '#1b2664' }" class="uni-ellipsis">{{ item.name }}</view>
						<view :style="{ color: index === currentIndex ? '' : '#1b2664' }">{{item.price | formatunit}}</view>
						<view class="opendate">{{i18n.paydata}}:{{memberteam(item.day,item.hour,item.minute)}} H</view>
					</view>
					<view v-else >
						<image src="/static/images/profile/VIP.png" mode="" class="gray"></image>
						<view style="color: #999;">{{ item.name }}</view>
						<view style="color: #999;">{{ item.price | formatPrice }}</view>
						<view class="opendate">{{i18n.paydata}}:{{memberteam(item.day,item.hour,item.minute)}} H</view>
					</view>
				</view>
			</scroll-view>
			
		<view class="pay-mode">
			<view class="title">{{i18npay.formprice}}：<text class="color_red">{{changeprice.balance | formatPrice}}</text></view>
		</view>
		<button class="btn" @click="opensubmit">{{i18n.paybtn}}</button>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			isclick:true,
			memberList: [],
			currentIndex: -1,
			checked1: false,
			checked2: false,
			scrollLeft:'200rpx',
			isShow:true,
			status:0,
			vip:'',
			price:''
		};
	},
	computed:{
		...mapGetters(['changeprice']),
		i18n(){
			return this.$t('openmember');
		},
		i18npay(){
			return this.$t('withdrawalpay');
		}
	},
	methods: {
		opensubmit(){
			let that = this;
			if(this.currentIndex === -1) {
				return this.totat(this.i18n.totatinfo[1]);
			}
			if(this.isclick){
				this.isclick = false;
			}else{
				return this.isclick
			}
			this.$http.requestajx('user_recharge/level','post',{level:this.memberList[this.currentIndex].level}).then(function(res){
					let code = res.code;
					if(code === 200){
						let price = Number(that.changeprice.balance) - Number(that.memberList[that.currentIndex].price);
						if(price >= 0){
							that.changeprice.balance = Math.floor(price * 100) / 100;
						}
						that.totat(that.i18n.totatsucc);
					}
			});
			setTimeout(()=>{
				that.isclick = true;
			},5000);
			
		},
		itemClick(index,level,status) {
			if(!status) return this.totat(this.i18n.totatinfo[0]);
			this.currentIndex = index;
			this.$store.commit('getLevel',level)
			this.vip = this.memberList[index].name
			this.price = this.memberList[index].price
		},
		radioClick(index) {
			this.status = index
			if(index === 1) {
				this.checked1 = !this.checked1
				this.checked2 = false
				
			}else {
				this.checked2  = !this.checked2
				this.checked1 = false
			}
		},
		navTo() {
			if(this.currentIndex === -1) {
				return this.totat(this.i18n.totatinfo[1]);
			}
			if(this.checked1 === false && this.checked2 === false) {
				return this.totat(this.i18n.totatinfo[2]);
			}
			if(this.status === 2) {
				uni.navigateTo({
					url:'/pages/profile/scancode-pay'
				})
			} else {
				uni.navigateTo({
					url:'/pages/profile/bank-pay?vip='+this.vip+'&price='+this.price
				})
			}
		},
		memberteam(day,hour,minute){
			let datetime = Math.floor(Number(day*24 + hour + minute/60)*100)/100;
			return datetime;
		},
		userLevelRecharge() {
			let that = this;
			this.$http.requestajx('user_level/recharge','get',{}).then(function(res){
					// console.log(res)
				that.memberList = res.result
			});
			this.$http.requestajx('account/info','get',{}).then((res) => {//个人信息
				that.$store.commit('changeInfo', res.result);
			});
		},
		btn_on(){
			uni.navigateTo({
				url: '/pages/profile/pay-record'
			});
		}
	},
	onShow() {
		this.userLevelRecharge();
		
		setTimeout(()=>{
			this.isShow = false
		},500)
	}
};
</script>

<style lang="less">
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
	
    filter: gray;
}
.member-list {
	width: 100%;
	height: 300rpx;
	white-space: nowrap;
	background-color: #fff;
	.member-item {
		display: inline-block;
		width: 250rpx;
		height: 160rpx;
		border-radius: 15rpx;
		box-shadow: 0px 6px 32px 0px rgba(0, 35, 68, 0.14);
		margin-left: 20rpx;
		margin-right: 10rpx;
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
		font-size: 32rpx;
		margin-bottom: 44rpx;
		
	}
	.color_red{ color:#f62f3d;font-size: 32rpx;}
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
