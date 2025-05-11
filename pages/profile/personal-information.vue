<template>
	<view class="header_top">
		<loading-plus v-if="isShow"></loading-plus>
		<public-head :title="i18n.title"></public-head>
		<view class="app_top">
			<uni-list>
				<uni-list-item :title="i18n.uesrname" :showArrow="true" :clickable="true" :isBorder="true" :rightText="info.nickname" @click="navTo('/pages/profile/modify-name')"></uni-list-item>
				<uni-list-item :title="i18n.sex" :showArrow="true" :clickable="true" :isBorder="true" :rightText="i18n.sexarray[index]"  style="position: relative;">
					<picker @change="bindPickerChange" :value="index" :range="i18n.sexarray" style="position: absolute;width: 100%;height: 100%;" @click="pickerlang">
					</picker>
				</uni-list-item>
				<uni-list-item :title="i18n.iphone" :showArrow="true" :clickable="true" :isBorder="true" :rightText="info.phone"></uni-list-item>
				<uni-list-item :title="i18n.account[0]" :showArrow="true" :clickable="true" :isBorder="true" :rightText="info.info.account || i18n.account[1]" @click="navTo('/pages/profile/account')"></uni-list-item>
			</uni-list>
		</view>
		<view class="personal_list">
			<view class="list_item" v-for="(item,index) in datamember" :key="index">
				<view class="list_title">
				  <view class="title">{{item.user_level.name}}</view>
				  <view class="title_num">{{i18npro.munejson[3]}}：<text class="color_red">{{item.receive_count}}</text></view>
				</view>
				<view class="list_txt">{{i18npro.timedate}}：<text class="color_red">{{item.effective_time}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index:0,
			array:['保密','男','女'],
			info:{
				avatar:'',
				info:{}
			},
			isShow:true,
			datamember:[]
		};
	},
	methods: {
		navTo(url) {
			uni.navigateTo({ url });
		},
		async bindPickerChange(e){
			this.index = e.target.value;
			let res = await this.$http.accountGender({
				gender: e.target.value
			})
			 
		},
		pickerlang(){
			// #ifdef H5
			document.getElementsByClassName('uni-picker-header')[0].children[0].innerText = this.i18n_confirm[0];
			document.getElementsByClassName('uni-picker-header')[0].children[1].innerText = this.i18n_confirm[1];
			// #endif
		},
		async getAccountInfo() {
			let res = await this.$http.accountInfo();
			this.info = res.result;
			this.index = res.result.gender;
			
			this.$http.requestajx('account/member_data','get',{}).then((data) => {
				console.log(data)
				this.datamember = data.result;
			});
		},
		// async changeAvatar() {
		// 	uni.chooseImage({
		// 		success:async chooseImageRes => {
		// 			const tempFilePaths = chooseImageRes.tempFilePaths;
		// 			let result = await this.$http.uploadFile(tempFilePaths[0],{})
		// 			this.info.avatar = result.result.uri
		// 			await this.$http.accountAvatar({
		// 				avatar:this.info.avatar
		// 			})
		// 		}
		// 	})
			
		// }
	},
	computed:{
		// avatar() {
		// 	if ( null === this.info.avatar) return
		// 	return this.info.avatar.search('http') == -1 ? "https://douyin-like.oss-cn-hongkong.aliyuncs.com/"+this.info.avatar : this.info.avatar
		// }
		i18n(){
			return this.$t('personal');
		},
		i18npro(){
			return this.$t('pagesprofile');
		},
		i18n_confirm(){
			return this.$t('btncomfirm');
		}
	},
	onShow() {
		
		this.getAccountInfo()
		setTimeout(()=>{
			this.isShow = false
		},500)
	}
};
</script>

<style lang="less">
.app_top{
	/* #ifdef APP-PLUS */
	padding-top: 60px;
	 /* #endif */
}
.personal_list{border-top: 10px solid #f7f9fc;padding: 10px 15px 0;}
	.list_item{ margin-bottom: 10px;padding: 15px 10px 15px 0;
		.list_title{display: flex;justify-content: space-between;margin-bottom: 10px;
			.title{ font-size: 30rpx;color:#333333;}
			.title_num{font-size: 24rpx;color: #999999;}
		}
		.list_txt{ font-size: 24rpx;color: #999999;}
		.color_red{color:#ff4949;}
		&+.list_item{border-top: 1px solid #f1f1f1;}
	}
	.avatar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 180rpx;
		text {
			margin-left: 44rpx;
			color: #080d5d;
			font-size: 56rpx;
			width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		image {
			width: 129rpx;
			height: 129rpx;
			border-radius: 50%;
			margin-right: 43rpx;
		}
	}
.border {
	width: 750rpx;
	height: 22rpx;
	background-color: #f7f9fc;
}
</style>
