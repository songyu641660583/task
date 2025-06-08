<template>
	<view class="header_top">
		<public-head headshow :title="i18n.title"></public-head>
		<form @submit="formSubmit">
			<view class="Delivery">
				<view class="Delivery-title">
					<image src="/static/images/profile/order1.png" mode=""></image>
					<text>{{i18n.title}}</text>
				</view>
				<view class="d-list">
					<view class="l-left">{{i18n.pyaname1}}:&nbsp;{{bankInfo.bank_name}}</view>
					<view class="l-right" @click="clip(bankInfo.bank_name)">{{i18n.pyacopy}}</view>
				</view>
				<view class="d-list">
					<view class="l-left">{{i18n.pyaname2}}:&nbsp;{{bankInfo.name}}</view>
					<view class="l-right" @click="clip(bankInfo.name)">{{i18n.pyacopy}}</view>
				</view>
				<view class="d-list">
					<view class="l-left">{{i18n.pyaname3}}:&nbsp;{{bankInfo.bank_account}}</view>
					<view class="l-right" @click="clip(bankInfo.bank_account)">{{i18n.pyacopy}}</view>
				</view>
				<view class="bank_form">
					<view class="form_item">
						<view class="form_title"><text>{{i18n.pyaform2}}</text></view>
						<view class="form_input">
							<input type="number" v-model="pyamoney" name="amount" :placeholder="i18n.pyaform2_txt" placeholder-class="place_txt" />
						</view>
					</view>
					<view class="upload">
						<view class="upload-title">{{i18nimg.uploadimg}}</view>
						<view class="pic">
							<view class="pic1" @click="uploadImg">
								<image src="/static/images/profile/icon_camera.png" ></image>
								<text>{{i18nimg.uploadimg1}}</text>
							</view>
							<view class="pic2" v-show="imageshow" :style="{'background-image':'url('+img2+')'}">
								<image src="/static/images/profile/icon_guanbi.png" class="del" @click="delImg"></image>
							</view>
						</view>
					</view>
					<view class="form_item">
						<view class="form_title">{{i18n.pyaform1}}</view>
						<view class="form_input">
							<input type="text" :value="countrytxt" disabled class="active" :placeholder="i18n.pyaform1_txt" placeholder-class="place_txt"
							   name="level" @click="grad_picker" />
						</view>
					</view>
					<!-- <view class="form_item">
						<view class="form_title">{{i18n.pyaform2}}</view>
						<view class="form_input">
							<input type="number" v-model="pyamoney" name="amount" :placeholder="i18n.pyaform2_txt" />
						</view>
					</view> -->
					<view class="form_item">
						<view class="form_title">{{i18n.pyaform3}}</view>
						<view class="form_input">
							<input type="text" name="bank" :placeholder="i18n.pyaform3_txt" />
						</view>
					</view>
					<view class="form_item">
						<view class="form_title">{{i18n.pyaform4}}</view>
						<view class="form_input">
							<input type="text" name="name" :placeholder="i18n.pyaform4_txt" />
						</view>
					</view>
					<view class="form_item">
						<view class="form_title">{{i18n.pyaform5}}<!-- ：<text class="money">{{exchangerate}}</text> --></view>
						<view class="form_input">
							<input type="number" name="remittance" :placeholder="i18n.pyaform5_txt" />
						</view>
					</view>
					<view class="form_item">
						<view class="form_title">{{i18n.pyaform6}}</view>
						<view class="form_input">
							<input type="text" name="bank_name" :placeholder="i18n.pyaform6_txt" />
						</view>
					</view>
				</view>
			</view>
			<view class="bank_btn">
				<button class="btn" form-type="submit">{{i18n.pyaformbtn}}</button>
			</view>
		</form>
		<picker-show :pickerlist="tasklist" @btnconfirm="bindconfirm" ref="showpicker"></picker-show>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				isclick:true,
				imageshow:false,
				img1:'',
				img2:'',
				bankInfo:{},
				tasklist:[],
				pickerarr:'',
				pyamoney:'',
				countryjson:'',
				countrytxt:'',
				countrymoney:''
			};
		},
		computed:{
			i18n(){
				return this.$t('bankpay');
			},
			i18nimg(){
				return this.$t('submittask');
			},
			i18n_share(){
				return this.$t('invitation');
			},
			exchangerate(){
				return Number(this.pyamoney)*Number(this.countryjson.exchange_rate);
			}
		},
		onLoad(options) {
			this.loadjosn();
		},
		methods: {
			loadjosn(){
				const that = this;
				this.$http.requestajx('country/country_bank','get',{country_id:10}).then((res) => {
					// console.log(res)
					that.bankInfo = res.result.bank;
					that.countryjson = res.result.country;
					that.countrytxt = res.result.country.name;
				})
				
			},
			uploadImg() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], 
					sourceType: ['album'],
				    success: (res) => {
				        const tempFilePaths = res.tempFilePaths,
								filesize = res.tempFiles[0].size / 1024 / 1024;
								if(filesize > 20){
									that.totat(that.i18nimg.modelinfo);
									return false;
								}
						 uni.showLoading({mask:true});
						that.$http.uploadajax('upload',tempFilePaths[0],{},'image').then((res) => {
							// console.log(res);
							that.img1 = res.result.uri;
							that.img2 = res.result.full_uri;
							that.imageshow = true;
							uni.hideLoading(); 
						});
				    }
				});
				   
				   
			},
			delImg() {
				this.img2 = ""
				this.img1 = ""
				this.imageshow = false;
			},
			async formSubmit(e){ 
				if(this.isclick){
					this.isclick = false;
				}else{
					return this.isclick;
				}
				let formdata = e.detail.value,that = this;
				 this.$http.requestajx('user_recharge/bank_recharge','post',{
					country_id:Number(this.countryjson.id),
					amount:Number(formdata.amount),
					voucher:this.img1,
					name:formdata.name,
					bank:formdata.bank,
					bank_name:formdata.bank_name,
					remittance:Number(formdata.remittance)
				}).then((data) => {
					if(data.code === 200){
						that.totat('Aplikasi dikirim');
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}else{
						that.totat(data.message);
					}
					
				 }).catch((error) => {
					console.log(error);
				 });
				 setTimeout(()=>{
				 	that.isclick = true;
				 },5000);
			},
			clip(res) {
				let that = this;
				// #ifdef H5
				this.$copyText(res).then( data => {
					that.totat(that.i18n_share.copysucc);
				});
				// #endif
				// #ifndef H5
					uni.setClipboardData({
						data: res,
						success: () => {
							that.totat(that.i18n_share.copysucc);
						}
					})
				// #endif
			},
			bindconfirm(e,listid){
				this.countrytxt = e;
				this.countryjson = this.pickerarr[listid];
				this.getReceivingBank(this.countryjson);
			},
			grad_picker(){
				let that = this;
				this.$http.requestajx('country','get',{}).then((res) => {
					let data = res.result;
					that.pickerarr = data;
					that.tasklist = data.map((item)=>{
						return item.name;
					});
					that.$refs.showpicker.picker_open();
				});
				
			}
		}
		
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}
	.bank_form{ padding: 10px 20px 0 5px;}
	.form_item{
		margin-bottom: 22px;
		.form_title{ font-size: 30rpx;color: #333;margin-bottom: 18rpx;
			text{ color:#f98166;font-size: 13px;}
		}
		input{	height: 35px;border-radius: 3px;border: solid 1px #e8e8e8;color: #333;padding: 0 8px;
			&.active{ background-color: #F5F5F5;color: #848080;
				.place_txt{color: #848080;}
			}
		}
		.place_txt{ font-size: 30rpx;color: #c1c1c1;}
		.money{ color:#f62f3d;font-size: 28rpx;}
	}
		.Delivery {
			width: 710rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 20rpx;
			margin: 40rpx auto 0;
			overflow: hidden;
			padding: 0 14rpx;
			.Delivery-title {
				display: flex;
				align-items: center;
				margin: 30rpx 0 18rpx 6rpx;
				
				image {
					width: 34rpx;
					height: 34rpx;
				}
				
				text {
					font-size: 34rpx;
					font-weight: 800;
					margin-left: 26rpx;
				}
			}
			.d-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 88rpx;
				.l-left {
					display: flex;
					align-items: center;
					margin-left: 10rpx;
					color: #333;
					font-size: 30rpx;
					input {
						margin-left: 20rpx;
						width: 380rpx;
					}
				}
				.l-right {
					margin-right: 40rpx;
					color: #999;
					font-size: 30rpx;
				}
			}
		}
		.upload {
			border-top: 10rpx solid #f5f7fd;
			padding: 30rpx 0;
			color:#333;
			font-size: 30rpx;
			.pic {
				width: 600rpx;position: relative;
				height: 338rpx;
				background-color: #ffffff;
				margin: 30rpx auto 0;
				box-sizing: content-box;
				.pic1 {
					border: dashed 1px #cccccc;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 600rpx;
					height: 338rpx;
					position: relative;
					z-index: 1;
					image {
						width: 86rpx;
						height: 70rpx;
					}
					text {
						color: #debc7d;
						font-size: 30rpx;
						margin-top: 32rpx;
					}
				}
				.pic2 {
					position: absolute;left: 0;top: 0;z-index: 99;
					width: 100%;
					height: inherit;
					background-size: 100% 100%;
					image{
						width: 596rpx;
					}
					.del {
						position: absolute;
						top: -14rpx;
						right: -14rpx;
						width: 30rpx;
						height: 30rpx;
						z-index: 10;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
		.bank_btn {padding: 60px 0;}
</style>