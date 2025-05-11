<template>
	<view style="overflow: hidden;">
		<view class="login_content">
			<block v-if="pagefalse"><view class="pagelogin_info">请在手机端打开</view></block>
			<block v-else>
				<view class="header_pos">
					<view class="status_bar"></view>
					<view class="head_content">
						<view class="login_lang">
							<view class="lang_flag">
								<label @click="langlist">
									<image :src="$configurl.ossBaseUrl+langflagimg" mode="widthFix"></image> {{langflagtxt}}
								</label>
							</view>
							<view class="lang_list" :class="{active:langshow}">
								<view class="list_after" v-show="langshow">
									<view class="langul" v-if="munelang.length > 0">
										<view class="lang_flag" v-for="(item,index) in munelang" :key="index" :class="{active:mune_index===index}">
											<view @click="munebtn(index)">
												<image :src="$configurl.ossBaseUrl+item.image" mode="widthFix"></image> {{item.lang}}
											</view> 
										</view>
									</view>
								</view>
							</view>
						</view>
						<view></view>
					</view>
				</view>
			
				<view class="form_content">
						<view class="input">
							<image src="/static/images/login_Img/icon_avatar.png" style="width: 24rpx;height: 28rpx;"></image>
							<view class="line"></view>
							<input type="text" :placeholder="i18n.username" v-model="account" placeholder-style="font-size:30rpx;color:#a3a3a3" />
						</view>
						<view class="input">
							<image src="/static/images/login_Img/icon_mima.png" style="width: 24rpx;height: 32rpx;"></image>
							<view class="line"></view>
							<input
								:type="pwdType"
								:placeholder="i18n.pass_word"
								:value="inputValue"
								@input="changeValue"
								style="font-size: 22rpx;width: 200rpx;"
								placeholder-style="font-size:30rpx;color:#a3a3a3"
							/>
							<view class="eye" @click="changeType">
								<image src="/static/images/login_Img/icon_biyan.png" style="width: 30rpx;height: 15rpx;" v-if="isShoweye"></image>
								<image src="/static/images/login_Img/icon_eye.png" style="width: 30rpx;height: 20rpx;" v-else></image>
							</view>
						</view>
						<view class="login_reg">
							<text @click="navTo('/pages/login/register')">{{i18n.register}}</text>
						</view>
						<view class="login_btn">
							<view class="login_submit"><button @click="loginsubmit">{{i18n.btn}}</button></view>
							<view class="forget"  @click="btn_on">{{i18n.wordinfo}} ？</view>
							<!-- #ifdef H5 -->
								<view class="login_download">
									<button @click="href_download">APP</button>
								</view>
							<!-- #endif -->
						</view>
					</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pagefalse:false,
			langflagimg:'',
			langflagtxt:'',
			langshow:false,
			mune_index:0,
			munelang:[],
			pwdType: 'password',
			isShoweye: true,
			account: '',
			inputValue: ''
		};
	},
	computed:{
		i18n(){
			return this.$t('login');
		},
		i18nlang(){
			return this.$t('langtext');
		},
		toastinfo(){
			return this.$t('toastinfo');
		}
	},
	methods: {
		navTo(url) {
			if (url === 'pages/tabbar/index') {
				return uni.switchTab({
					url: '/pages/tabbar/index'
				});
			}
			uni.navigateTo({ url });
		},
		changeType() {
			this.isShoweye = !this.isShoweye;
			if (this.pwdType === 'password') return (this.pwdType = 'text');
			this.pwdType = 'password';
		},
		langlist(){
			this.langshow = !this.langshow;
		},
		munebtn(e){
			this.mune_index = e;
			var that = this;
			uni.setStorage({
			    key: 'locale_key',
			    data: e,
			    success: function () {
					var edition = ['zh','en','ru','ph','kr','my','pt','tr','es','in','idsa','vn','th','sa'];
					that.$i18n.locale = edition[parseInt(e)];
					uni.setStorageSync('ajaxmess', that.$t('ajaxmess'));
					that.$http.requestajx('country','get',{}).then((res) => {
						// console.log(res);
						let data = res.result;
						that.munelang = data;
						that.langflagimg = data[e].image;
						that.langflagtxt = data[e].lang;
						that.langshow = false;
					}).catch((error) => {
						console.log('错误重启');
					});
			    }
			});
		},
		async btn_on(){
			// #ifdef H5
				let winhref = window.open('','_blank');
			// #endif
				let res = await this.$http.customerUrl()
			// #ifdef APP-PLUS
				plus.runtime.openURL(res.result)
			// #endif
			// #ifdef H5
				winhref.location = res.result;
			// #endif
		},
		async loginsubmit() {
			const that = this;
			let res = await this.$http.login({
				account: this.account,
				password: this.inputValue
			});
			uni.setStorageSync('userToken', res.result.token);
			this.totat(this.toastinfo[2]);
			setTimeout(() => {
				uni.hideToast();
				uni.switchTab({
					url: '/pages/tabbar/index',
					success() {
						that.$t('tabbarfin').map(function(item,index){
							uni.setTabBarItem({ index: index, text: item});
						});
					}
				});
				// that.$socketinit.socketload();
			}, 1500);
		},
		changeValue(e) {
			this.inputValue = e.target.value;
		},
		href_download(){
			// #ifdef H5
				let winhref = window.open('','_blank');
			// #endif
			this.$http.requestajx('help/app_download_url','get',{}).then(function(res){
				let data = res.result;
				// #ifdef APP-PLUS
					plus.runtime.openURL(data)
				// #endif
				// #ifdef H5
					winhref.location = data;
				// #endif
			});
		}
	},
	onLoad() {
		 // uni.removeStorageSync('locale_key');
		 // #ifdef H5
		 let that = this;
		 uni.getSystemInfo({
		     success: function (res) {
		 		if(res.windowWidth > 650){
		 			that.pagefalse = true;
		 		}
		     }
		 });
		 // #endif
		let localkey = uni.getStorageSync('locale_key');
		if(localkey === ""){
			this.munebtn(0);
		}else{
			this.munebtn(localkey);
		}
		
	}
};
</script>

<style lang="less">
.login_content{ padding-top: 5vh;}
.pagelogin_info{ position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;font-size: 40rpx;}
.form_content{ padding: 0 50px;margin-top: 90px;}
.input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fafafa;
	border-radius: 40px;
	width: 100%;
	height: 80rpx;
	margin-bottom: 17px;
	image {
		width: 24rpx;
		height: 34rpx;
		margin-left: 26rpx;
		margin-right: 22rpx;
	}
	.line {
		width: 2rpx;
		height: 28rpx;
		background-color: #a9a9a9;
		margin-right: 33rpx;
	}
	uni-input {
		display: flex;
		align-items: center;
		flex: auto;
	}
	.eye {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 10px;
	}
}
.login_reg{ text-align: right;font-size: 28rpx;color: #7a2b86;}
.head_pos{position: fixed;top: 0;left: 0;width: 100%;z-index: 999;background-color: rgb(28, 26, 78);color: #fff;
	.head_content{ padding-left: 20px;padding-right: 15px;width: 100%;height: 45px;display: flex;align-items: center;justify-content: space-between;}
}
.login_lang{ width: 100%;padding-left: 20px;position: relative;margin-top: 15px;
	.lang_flag{text-align: left;
		image{ width: 25px;height: 16px;vertical-align: middle;margin-right: 5px;margin-bottom: 3px;}
	}
	.lang_list{position: absolute;top: 25px;left: 10px;right: 10px;z-index: 99;transition: all .3s ease-in;opacity: 0;
		.list_after::after{
			content: "";position: absolute;top: 0;left: 18px;margin-top: -10px;
			    border-width: 5px;border-style: solid;border-color: transparent transparent #2e4f79 transparent;
		}
		.langul{background-color: #2e4f79;display: flex;flex-wrap: wrap;border-radius: 5px;overflow: hidden;}
		.lang_flag{text-align: left;color: #FFFFFF;width: 50%;padding: 10px;
			&.active{background-color: #2d486a;}
		}
		&.active{ opacity: 1;}
	}
	
}
.login_btn{ padding-top: 75px;}
.login_submit{
	button{background-image: linear-gradient(120deg, #fe9643 0%, #f57033 100%), linear-gradient(#1b2664, #1b2664);font-size: 30rpx;color: #FFFFFF;
	background-blend-mode: normal, normal;box-shadow: 0px 4px 11px 1px rgba(236, 80, 17, 0.29);border-radius: 44px;height: 88rpx;line-height: 88rpx;}
}
.forget{ padding-top: 26px;padding-bottom: 24px;color: #a3a3a3;font-size: 28rpx;text-align: center;}
.login_download{
	button{background-image: linear-gradient(120deg, #658dc5 0%, #4f6faf 100%), linear-gradient(#1b2664, #1b2664);background-blend-mode: normal, normal;
	box-shadow: 0px 4px 11px 1px rgba(60, 98, 173, 0.29);border-radius: 44px;font-size: 30rpx;color: #FFFFFF;height: 88rpx;line-height: 88rpx;}
}
.pwd_login {
	font-size: 28rpx;
	color: #a3a3a3;
	text-align: center;
	margin-top: 44rpx;
}
.protocol {
	position: absolute;
	bottom: 120rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 26rpx;
	color: #ababab;
	.protocol_text2 {
		font-size: 26rpx;
		color: #080d5d;
		margin-top: 10rpx;
		text:nth-child(2) {
			color: #ababab;
			margin: 0 6rpx;
		}
	}
}
.other {
	display: flex;
	justify-content: space-between;
	width: 539rpx;
	margin: 34rpx auto 0;
	padding: 0 14rpx;
	text {
		font-size: 28rpx;
		color: #a3a3a3;
	}
}
.lang_content{ padding: 24rpx;}
	.lang_head{ font-size: 40rpx;margin-bottom: 20rpx;padding: 0 20rpx;}
	.lang_mune{ display: flex;flex-wrap: wrap;margin-top: 50rpx;
		.mune_item{padding: 30rpx 15rpx;box-sizing: border-box;
			text{ border: 1px solid #D6D6D6;font-size: 26rpx;border-radius: 10px;padding: 5px 10px;box-sizing: border-box;
				&.active{border-color: #1B2664;background-color: #1B2664;color: #FFFFFF;}
			}
		}
	}
	.lang_bottom{ position: absolute;left: 0;bottom: 20vh;width: 100%;padding: 0 38rpx;
		.bottom_info{ font-size: 30rpx;color: #D6D6D6;text-align: center;margin-bottom: 20px;}
		button{ width: 100%;background-color: #1b2664;border-radius: 30px;}
	}
</style>
