<template>
	<view class="account header_top">
		<public-head :title="i18n.title"></public-head>
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="acc_form">
			<form @submit="formSubmit">
				<!-- <view class="form_item active" @click="grad_picker">
					<view class="form_title">选择国家</view>
					<view class="form_input text-right">
						{{countryicon}} <uni-icons :size="17" class="uni-icon-wrapper" color="#c5c5c5" type="arrowright" />
					</view>
				</view> -->
				<view class="form_item">
					<view class="form_title"><text>*</text> {{i18n.formname}}</view>
					<view class="form_input">
						<input type="text" name="name" :value="info.name" :placeholder="i18n.formname" placeholder-class="place" />
					</view>
				</view>
				<view class="form_item">
					<view class="form_title"><text>*</text>{{i18n.bankphone}}</view>
					<view class="form_input">
						<input type="number" name="phone" :value="info.phone" :placeholder="i18n.bankphonetxt" placeholder-class="place" />
					</view>
				</view>
				<view class="form_item">
					<view class="form_title"><text>*</text>{{i18n.formbank}}</view>
					<view class="form_input">
						<input type="text" name="taskname" :value="taskname || info.bank_name" :placeholder="i18n.formbank" placeholder-class="place" />
					</view>
				</view>
				<view class="form_item">
					<view class="form_title"><text>*</text>{{i18n.formacc}}</view>
					<view class="form_input">
						<input type="text" name="account" :value="info.account" :placeholder="i18n.formacctxt" placeholder-class="place" />
					</view>
				</view>
				
				
				<!-- <view class="form_item">
					<view class="form_title"><text>*</text>{{i18n.kaibank}}</view>
					<view class="form_input">
						<input type="text" name="bank_address" :value="info.bank_address" :placeholder="i18n.kaibanktxt" placeholder-class="place" />
					</view>
				</view>
				
				<view class="form_item">
					<view class="form_title"><text>*</text>{{i18n.bank_number}}</view>
					<view class="form_input">
						<input type="text" name="bank_number" :value="info.bank_number" :placeholder="i18n.bank_number" placeholder-class="place" />
					</view>
				</view> -->
				<!-- <view class="form_item active" @click="grad_picker">
					<view class="form_title"><text>*</text>{{i18n.formbank}}</view>
					<view class="form_input">
						<input type="text" name="taskname" :value="taskname || info.bank_name" disabled :placeholder="i18n.formbank" placeholder-class="place" />
					</view>
				</view> -->
			<!-- 	<view class="form_item" :class="{'active':infoPass}">
					<view class="form_title"><text>*</text>{{i18n.bankword}}</view>
					<view class="form_input">
						<input type="number" password :value="infoPass" :disabled="!!infoPass" maxlength="6" name="trade_pass" :placeholder="i18n.bankwordtxt" placeholder-class="place" />
					</view>
				</view> -->
				<view class="form_item" :class="{'active':info.usdt_address}">
					<view class="form_title">{{i18n.address}}</view>
					<view class="form_input">
						<input type="text" name="usdt_address" :value="info.usdt_address" :placeholder="i18n.address" placeholder-class="place" :disabled="!!info.usdt_address" />
					</view>
				</view>
				<view class="form_info">{{i18n.bankinfo}}</view>
				<view class="form_btn">
					<button form-type="submit">{{i18n.formbtn}}</button>
				</view>
			</form>
		</view>
		<picker-show :pickerlist="array" @btnconfirm="bindconfirm" ref="showpicker"></picker-show>
		<!-- <button class="btn" @click="confirm"> {{i18n.formbtn}}</button> -->
	</view>
</template>

<script>
	import loading from "@/utils/mixin/loading.js"
	export default {
		mixins:[loading],
		data() {
			return {
				info:'',
				infoPass:'',
				isclick:true,
				array:['中国','Englist','Russia','马来西亚'],
				taskname:'',
				countryicon:'',
				bank_code:''
			};
		},
		computed:{
			i18n(){
				return this.$t('account');
			}
		},
		methods: {
			formSubmit(e){
				if(this.isclick){
					this.isclick = false;
				}else{
					return this.isclick;
				}
				 let formdata = e.detail.value,that = this;
				 this.$http.requestajx('account/bank','put',{
					 name: formdata.name,
					 account: formdata.account,
					 phone:formdata.phone,
					 bank_number:formdata.bank_number,
					 bank_address:formdata.bank_address,
					 usdt_address:formdata.usdt_address,
					 upi:formdata.upi,
					 bank_name:formdata.taskname,
					 trade_pass: formdata.trade_pass
				 }).then((res) => {
				 	this.totat(this.i18n.totatinfo);
				 	setTimeout(() => {
				 		uni.hideToast();
				 		uni.navigateBack()
				 	}, 1500);
				 });
				 setTimeout(()=>{
				 	that.isclick = true;
				 },5000);
			},
			bindconfirm(e,index){
				 this.taskname = e;
				 this.bank_code = this.countryicon[index].code;
			},
			grad_picker(){
				
				this.$http.requestajx('country/bank_code','get',{country_id:1}).then((res) => {
					let data = res.result;
					if(data.length < 1){
						return this.totat(this.i18n.totaterror);
					}
					this.countryicon = data;
					this.array = data.map(function(item){
						return item.name;
					});
					this.$refs.showpicker.picker_open();
				});
				
			},
			async accoutinfo(){
				let res = await this.$http.accountInfo();
				this.info = res.result.info;
				this.infoPass = !res.result.trade_pass ? null : "11111";
			},
			async getBankList() {
				let res = await this.$http.bankList()
				// console.log(res);
				this.array = res.result
			}
		},
		onLoad() {
			this.accoutinfo();
		},
		onShow() {
			// this.getBankList()
		}
	}
</script>

<style lang="less">
.account{background-color: #f7f9fc;min-height: 100vh;}
.acc_form{ padding-top: 12px;}
.form_item{position: relative;height: 45px;display: flex;align-items: center;font-size: 28rpx;background-color: #FFFFFF;margin-bottom: 1px;
	.form_title{ position: absolute;left: 15px;color: #2d2933;max-width: 110px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
		text{ color: #f62f3d;}
	}
	.form_input{ width: 100%;padding-left: 120px;padding-right: 15px;color: #333;
		.place{color: #c5c5c5;font-size: 28rpx;}
		&.text-right{ text-align: right;}
		input{ padding-left: 10px;}
	}
	&.active{ margin-bottom: 12px;margin-top: 12px;background-color: #F5F5F5;color: #848080;}
}
.form_info{ font-size: 12px;color: #f62f3d;margin-top: 30px;padding: 0 15px;line-height: 17px;}
.form_btn{padding: 30px 15px 60px;width: 100%;
		button{ width: 100%;height: 40px;background-color: #1b2664;border-radius: 20px;font-size: 30rpx;color: #FFFFFF;}
	}
</style>