<template>
	<view class="header_top que_back">
		<public-head :title="i18n.title"></public-head>
		<view class="profile_content">
			<view class="que_form">
				<!-- <view class="title">{{i18n.fromaddress}}</view>
				<view class="form_item">
					<input type="text" v-model="form.address" :placeholder="i18n.placeAddress" placeholder-class="place" />
				</view> -->
				<view class="title">{{i18n.fromprice}} <text class="exchangeRate">≈{{exchangeRate}} USDT</text></view>
				<view class="form_item">
					<input type="number" v-model="form.money" :placeholder="i18n.placeprice" placeholder-class="place" />
				</view>
				<view class="title">{{i18n.fromimg}}</view>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"></u-upload>
				<!-- <u-upload ref="uUpload" :action="$configurl.apiBaseUrl+action" :auto-upload="true" max-count="3" :custom-btn="true" @on-change="upload_data"></u-upload> -->
			</view>
			<div class="submit_btn">
			  <u-button  :disabled="subbtn_disabled" :ripple="true"  class="btn" @click="onSubmit">
				  <text style="color: #FFFFFF;">{{i18n.sub}}</text>
			  </u-button>
			</div>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				payload:'',
				fileList1:[],
				form:{
					address:'',
					money:''
				},
				imagesrc:'',
				action: 'upload',
				filesArr: []
			}
		},
		computed:{
			i18n(){
				return this.$t('upvoucher')  
			},
			exchangeRate(){
				return this.form.money * this.payload.usdtExchangeRate;
			},
			subbtn_disabled(){
			  return !this.fileList1.length || !this.form.money;
			}
		},
		onLoad(e) {
			this.payload = JSON.parse(e.payload);
		},
		methods:{
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: 'loading'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					this.$http.uploadajax('upload',lists[i].url,{},'image').then((res) => {
						// const result = await this.uploadFilePromise(lists[i].url)
						let result = res.result.uri;
						let item = this[`fileList${event.name}`][fileListLen]
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: result
						}))
						fileListLen++
					});
					
				}
			},
			onSubmit(){
				let that = this;
				const form = this.form;
				this.$http.requestajx('user_recharge/usdtRecharge','post',{
					address:form.address,
					credential: this.fileList1[0].url,
					amount:form.money
				}).then((res) => {
					that.totat(res.message)
					setTimeout(function(){
						uni.navigateBack()
					},300)
				}).catch(({ res }) => {
					that.totat(res.message)
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.que_back{ min-height: 100vh;background-color: #efefef;}
	.profile_content{ padding: 0 15px;}
	.title{ font-size: 28rpx;color: #999;padding: 10px 0;}
	.form_item{ background-color: #fff;border-radius: 5px;width: 100%;padding: 10px;font-size: #303133;
		textarea{ text-align: left;height: 100px;font-size: 28rpx;color: #0c0c0c;font-family: sans-serif;}
		text{ font-size: 28rpx;color: #bbb;}
	}
	.place{ font-size: 14px;}
	.upload{ width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;border-radius: 10rpx;background-color: #FFFFFF;
		position: relative;
		&::after,&::before{ width: 1px;height: 25px;content: " ";position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);background-color: #ccc;}
		&::before{ width: 25px;height: 1px;}
	}
	.exchangeRate{ font-size: 10px;color: #ff0000;margin-left: 10px;}
	.submit_btn{ position: fixed;left: 0;bottom: 0;width: 100%;padding: 15px;box-shadow: 0 -10rpx 40rpx 0 rgba(0,0,0,0.04);background-color: #fff;box-sizing: border-box;
	    .btn{font-size: 32rpx;background-color: #080d5d;border-radius: 30px;}
	}
	
</style>