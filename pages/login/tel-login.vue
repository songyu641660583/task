<template>
	<view style="overflow: hidden;">
		<view class="input">
			<image src="/static/images/login_Img/icon_iphone.png" ></image>
			<view class="line"></view>
			<input type="number" :placeholder="i18n.username" v-model="phone" placeholder-style="font-size:30rpx;color:#a3a3a3"/>
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_shuru.png" style="width: 29rpx;height: 36rpx;"></image>
			<view class="line"></view>
			<input type="text" :placeholder="i18n.telcode" v-model="code" placeholder-style="font-size:30rpx;color:#a3a3a3" style="width: 150rpx;" />
			<view  :class="isClick?'getCode':'getCoder'" @click="getVerCode">
				<block v-if="isClick">
					{{i18n.telyan}}
				</block>
				<block v-else>
					{{verCodeText}}
				</block>
			</view>
		</view>
		<view class="login_btn" @click="login">{{i18n.btn}}</view>
		<view class="pwd_login" @click="navTo('/pages/login/pwd-login')">{{i18n.btninfo}}</view>
		<view class="protocol">
			<text class="protocol_text1">{{i18n.info}}</text>
			<view class="protocol_text2">
				<text>《{{i18n.newsinfo[0]}}》</text>
				<text>{{i18n.andtext}}</text>
				<text>《{{i18n.newsinfo[1]}}》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				code:'',
				verCodeText:'获取验证码',
				isClick:true,
				isClickNum:0
			};
		},
		computed:{
			i18n(){
				return this.$t('login');
			},
			toastinfo(){
				return this.$t('toastinfo');
			}
		},
		methods:{
			navTo(url){
				uni.navigateTo({url})
			},
			async getVerCode () {
				if(!this.phone) {
					return this.totat(this.toastinfo[0]);
				}
				this.isClick = false
				this.isClickNum ++
				if(this.isClickNum > 1) return
				// console.log(this.phone);
				let intervalTime = 60;
				let res = await this.$http.getCode(this.phone,{type:1})
				if(res.code == 4000) {
					// console.log(1);
					this.isClick = true
					this.totat(`${res.message}`)
					this.isClickNum = 0
					return 
				}
				this.totat(this.toastinfo[1]);
				let timer = setInterval(()=>{
					this.verCodeText = `${intervalTime}s`
					intervalTime --
					if(intervalTime < 0) {
						this.verCodeText = "获取验证码"
						this.isClick = true
						this.isClickNum = 0
						clearInterval(timer)
					}
				},1000)
			},
			async login() {
				let res = await this.$http.phoneLogin({
					phone: this.phone,
					code: this.code
				});
				console.log(res);
				uni.setStorageSync('userToken', res.result.token);
				this.totat(this.toastinfo[2]);
				setTimeout(() => {
					uni.hideToast();
					uni.switchTab({
						url: '/pages/tabbar/index'
					});
				}, 1500);
			},
		}
	}
</script>

<style lang="less">
	.input{
		display: flex;
		align-items: center;
		background-color: #fafafa;
		border-radius: 40px;
		width: 540rpx;
		height: 80rpx;
		margin: 200rpx auto 0;
		image{
			width: 24rpx;
			height: 28rpx;
			margin-left: 26rpx;
			margin-right: 22rpx;
		}
		.line{
			width: 2rpx;
			height: 28rpx;
			background-color: #a9a9a9;
			margin-right: 33rpx;
		}
		uni-input{
			display: flex;
			align-items: center;
		}
		.getCode{
			width: 170rpx;
			height: 62rpx;
			background-color: #080d5d;
			border-radius: 31rpx;
			color: #fff;
			font-size: 26rpx;
			line-height: 62rpx;
			text-align: center;
			margin-left: 107rpx;
		}
		.getCoder {
			width: 170rpx;
			height: 62rpx;
			background-color: #ccc;
			border-radius: 31rpx;
			color: #fff;
			font-size: 26rpx;
			line-height: 62rpx;
			text-align: center;
			margin-left: 107rpx;
		}
	}
	.login_btn{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #080d5d;
		border-radius: 40px;
		width: 540rpx;
		height: 80rpx;
		margin: 80rpx auto 43rpx;
		color: #fff;
		font-size: 30rpx;
	}
	.pwd_login{
		font-size: 28rpx;
		color: #a3a3a3;
		text-align: center;
	}
	.protocol{
		position: absolute;
		bottom: 120rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 26rpx;
		color: #ababab;
		.protocol_text2{
			font-size: 26rpx;
			color: #080d5d;
			margin-top: 10rpx;
			text:nth-child(2){
				color: #ababab;
				margin: 0 6rpx;
			}
		}
		
	}
</style>
