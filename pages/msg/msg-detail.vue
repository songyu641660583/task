<template>
	<view class="header_top">
		<public-head :title="i18n.titletxt" ></public-head>
		<view class="c-title">
			<view class="title">{{msgDetail.title}}</view>
			<view class="time">{{i18n.timeinfo}}{{msgDetail.created_at}}</view>
		</view>
		<view class="c-content" style="overflow-x: hidden;">
			<rich-text :nodes="msgDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgDetail:''
			};
		},
		computed:{
			i18n() {
			  return this.$t('msgdetail')  
			}  
		},
		methods: {
			async getDetail(id) {
				let res = await this.$http.notifyDetail({id})
				this.msgDetail = res.result;
				this.loadmsg();
			},
			async loadmsg(){
				const that = this;
				let res = await this.$http.userNotify({
					type: 1,
					page: 1
				});
				let msgdata = res.result.data,num = 0;
				for(const item of msgdata){
					if(item.is_read === 0){
						num++
					}
				}
				this.$store.commit('msgnum',num);
				if(num>0){
					uni.setTabBarBadge({
						index: 4,
						text: ''+num
					});
				}else{
					uni.removeTabBarBadge({
						index:4
					})
				}
			}
		},
		onLoad(options) {
			this.getDetail(options.id)
		}
	}
</script>

<style lang="less">
page {
	border-top: 4rpx solid #f5f7fd;
	padding: 0 38rpx;
}
.c-title {
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 176rpx;
	border-bottom: 1px solid #f0f0f0;
	margin-bottom: 50rpx;
	.title {
		color: #313131;
		font-size: 32rpx;
		margin-bottom: 28rpx;
	}
	.time {
		color: #b4b7be;
		font-size: 24rpx;
	}
}
.c-content {
	color: #787878;
	font-size: 26rpx;
	line-height: 45rpx;
}
</style>
