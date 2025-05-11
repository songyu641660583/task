<template>
	<view style="overflow: hidden;">
		<view class="input">
			<image src="/static/images/login_Img/icon_mima.png" style="width: 24rpx;height: 32rpx;"></image>
			<view class="line"></view>
			<input type="password" v-model="password" :placeholder="i18n.listtext[0]" style="font-size: 22rpx;" placeholder-style="font-size:30rpx;color:#a3a3a3"/>
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_mima.png" style="width: 24rpx;height: 32rpx;"></image>
			<view class="line"></view>
			<input type="password" v-model="password_confirmation" :placeholder="i18n.listtext[1]" style="font-size: 22rpx;" placeholder-style="font-size:30rpx;color:#a3a3a3"/>
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_iphone.png" ></image>
			<view class="line"></view>
			<input type="number" :placeholder="i18n.listtext[2]" v-model="phone" placeholder-style="font-size:30rpx;color:#a3a3a3"/>
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_shuru.png" style="width: 29rpx;height: 36rpx;"></image>
			<view class="line"></view>
			<input type="text" :placeholder="i18n.listtext[3]" v-model="code" placeholder-style="font-size:30rpx;color:#a3a3a3" style="width: 150rpx;" />
			<view  :class="isClick?'getCode':'getCoder'" @click="getVerCode">
				<block v-if="isClick">
					{{i18n.telyan}}
				</block>
				<block v-else>
					{{verCodeText}}
				</block>
			</view>
		</view>
		<view class="login_btn" @click="resetPass">{{i18n.btn}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:'',
				password_confirmation:'',
				phone:'',
				code:'',
				verCodeText:'获取验证码',
				isClick:true,
				isClickNum:0
			};
		},
		computed:{
			i18n(){
				uni.setNavigationBarTitle({
					title: this.$t('pass_word').title
				});
				return this.$t('pass_word');
			},
			toastinfo(){
				return this.$t('toastinfo');
			}
		},
		methods:{
			async resetPass() {
				let res = await this.$http.resetPass({
					password:this.password,
					password_confirmation:this.password_confirmation,
					phone:this.phone,
					code:this.code,
				})
				this.totat(this.toastinfo[3]);
				setTimeout(()=>{
					uni.hideToast()
					uni.navigateBack()
				},1500)
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
				let res = await this.$http.getCode(this.phone,{type:4})
				// console.log(res);
				if(res.code == 4000) {
					console.log(1);
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
			}
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
		margin: 230rpx auto 0;
		image{
			width: 24rpx;
			height: 34rpx;
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
</style>
