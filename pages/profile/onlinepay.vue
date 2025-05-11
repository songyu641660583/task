<template>
	<view class="header_top">
		<public-head :title="i18ntxt.onlinepay"></public-head>
		<form @submit="formSubmit">
			<view class="bank_form">
				<view class="form_item">
					<view class="form_title">{{i18n.formtitle1}}</view>
					<view class="form_input">
						<input type="text" :value="countrytxt" disabled class="active" :placeholder="i18n.formtitle1_txt" placeholder-class="place_txt"
						   name="level" @click="grad_picker" />
					</view>
				</view>
				<view class="form_item">
					<view class="form_title">{{i18npay.pyaform2}}</view>
					<view class="form_input">
						<input type="number" v-model="amount" :placeholder="i18npay.pyaform2_txt" />
					</view>
					<!-- <view class="form_limit">(10-5000)</view> -->
				</view>
				<view class="form_item">
					<view class="count-vip">
						<text :class="{active:moneyindex==index}" v-for="(item,index) in moneylist" :key="index" @click="remoney(index)">{{item | formatunit}}</text>
					</view>
				</view>
				<!-- <view class="form_item">
					{{i18n.formprice}}：<text class="color_red">{{changeprice.balance | formatPrice}}</text>
				</view>
				<view class="form_item">
					{{i18n.priceinfo}}：<text class="color_red">{{exchangerate}}</text>
				</view> -->
				<view class="select_pay">
					<view class="paylist">
						<block v-for="(item,index) in checklist" :key="index">
							<view class="list_item" @click="radioClick(index)">
								<view class="item_title">
									<radio value="" color="#080d5d" style="transform: scale(.8);margin-left: 5px;" :checked="index===checkIndex"/>{{i18ntxt.onlinepay}} {{item.code}}
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="submit_btn">
				<button class="btn" @click="formSubmit">{{i18n.formbtn}}</button>
			</view>
			
		</form>
		<picker-show :pickerlist="tasklist" @btnconfirm="bindconfirm" ref="showpicker"></picker-show>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			isclick:true,
			tasklist:[],
			pickerarr:'',
			countryjson:'',
			countrytxt:'',
			amount:'',
			moneyindex:null,
			moneylist:[100000,300000,800000,1500000,3000000,9000000,15000000,30000000,50000000],
			checkIndex: 0,
			checklist:[]
		};
	},
	computed: {
		...mapGetters(['changeprice']),
		exchangerate(){
			return Math.floor(Number(this.amount)*Number(this.countryjson.exchange_rate)*100)/100 || '';
		},
		i18n(){
			return this.$t('withdrawalpay');
		},
		i18npay(){
			return this.$t('bankpay');
		},
		i18ntxt(){
			return this.$t('payselect');
		}
	},
	methods: {
		loadcountry(){
			const that = this;
			this.$http.requestajx('country','get',{}).then((res) => {
				let data = res.result;
				that.pickerarr = data;
				that.tasklist = data.map((item)=>{
					return item.name;
				});
				that.countrytxt = that.tasklist[10];
				that.countryjson = that.pickerarr[10];
			});
			 this.$http.requestajx('user_recharge/online_recharge','get').then((res) => {
				 let data = res.result;
				let arr = data.map(function(item,index,arr){
					 return {title:item.split('-')[0],code:item.split('-')[1]};
				 })
				 that.checklist = arr;
			 }).catch((error) => {
				console.log(error);
			 });
		},
		bindconfirm(e,listid){
			this.countrytxt = e;
			this.countryjson = this.pickerarr[listid];
			
		},
		remoney(e){
			this.moneyindex = e;
			this.amount = this.moneylist[e];
		},
		radioClick(index){
			this.checkIndex = index;
		},
		grad_picker(){
			this.$refs.showpicker.picker_open();
		},
		formSubmit(){
			if(this.isclick){
				this.isclick = false;
			}else{
				return this.isclick;
			}
			let that = this;
			 this.$http.requestajx('user_recharge/onlineRecharge','post',{
				country_id:this.countryjson.id,
				amount:Number(this.amount)
			}).then((res) => {
				// console.log(JSON.stringify(res))
				// #ifdef APP-PLUS
					plus.runtime.openURL(encodeURI(res.result.pay_url));
				// #endif
				// #ifdef H5
					location.assign(res.result.pay_url);
				// #endif
				
			 }).catch((error) => {
				console.log(error);
			 });
			 setTimeout(()=>{
			 	that.isclick = true;
			 },5000);
		}
	},
	onLoad() {
		this.loadcountry();
		
	}
};
</script>

<style lang="less">
page {
	border-top: 4rpx solid #f7f9fc;
}
.bank_form{ padding: 20px 30px 0;}
.form_item{margin-bottom: 22px;
	.form_title{ font-size: 30rpx;color: #333;margin-bottom: 18rpx;}
	input{	height: 35px;border-radius: 3px;border: solid 1px #e8e8e8;color: #333;padding: 0 8px;
		&.active{ background-color: #F5F5F5;color: #848080;
			.place_txt{color: #848080;}
		}
	}
	.place_txt{ font-size: 30rpx;color: #c1c1c1;}
	.color_red{ color:#f62f3d;font-size: 28rpx;}
}
.form_limit{ margin-top: 10px;color: #aaaaaa;}
.count-vip{
	text{ display: inline-block;background-color: #f8f8f8;padding: 5px 16px;margin-right: 10px;margin-bottom: 8px;
			border-radius: 10px;color: #333;font-size: 14px;
		&.active{background-color: #007aff;color: #FFFFFF;}
	}
}
.select_pay{
	.paylist{ }
	.list_item{ display: flex;justify-content: space-between;align-items: center;padding: 5px 0;
		image{ width: 25px;height: 25px;margin-right: 5px;vertical-align: middle;margin-bottom: 3px;}
		.item_title{font-size:26rpx;color:#333333;display: flex;align-items: center;}
		.item_txt{ font-size: 22rpx;color: rgba(51,51,51,0.6);}
	}
}
.account {
	display: flex;
	align-items: center;
	width: 100%;
	height: 94rpx;
	margin-top: 88rpx;
	.account-left {
		width: 70rpx;
		height: 70rpx;
		margin: 0 26rpx 0 46rpx;
	}
	.account-center {
		height: 94rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.c-text1 {
			color: #262626;
			font-size: 32rpx;
		}
		.c-text2 {
			color: #808080;
			font-size: 28rpx;
			margin-top: 26rpx;
		}
	}
	.account-right {
		width: 12rpx;
		height: 22rpx;
		margin-right: 50rpx;
	}
}
.money {
	width: 100%;
	height: 146rpx;
	padding: 0 58rpx;
	margin-top: 76rpx;
	.money-title {
		color: #333333;
		font-size: 28rpx;
		margin-bottom: 26rpx;
	}
	.money-con {
		display: flex;
		height: 88rpx;
		align-items: center;
		border-bottom: 1px solid #ececec;
		.rmb {
			font-size: 66rpx;
			color: #333;
		}
		input {
			font-size: 50rpx;
			color: #333;
		}
	}
}
.tip1 {
	display: flex;
	align-items: center;
	width: 100%;
	height: 36rpx;
	padding-left: 58rpx;
	margin-top: 66rpx;
	.t-text1 {
		color: #333333;
		font-size: 26rpx;
	}
	.t-text2 {
		color: #f9103c;
		font-size: 34rpx;
	}
}
.tip2 {
	display: flex;
	width: 100%;
	height: 36rpx;
	margin-top: 50rpx;
	padding: 0 30rpx 0 58rpx;
	image {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		margin-right: 12rpx;
	}
	.t-text1 {
		flex: 1;
		color: #b3b3b3;
		font-size: 24rpx;
		line-height: 32rpx;
	}
}
.submit_btn{
		padding: 50px 0 30px;
}
</style>
