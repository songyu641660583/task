<template>
	<view class="header_top">
		<view class="help-list animated fadeIn faster">
			<loading-plus v-if="isShow"></loading-plus>
			<public-head :headshow="false" :title="i18n.munelist[1]" backcolor="rgba(255,255,255,.1)" color_icon="#fff"></public-head>
			<view class="help_content">
				<rich-text :nodes="richjson"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			richjson: '',
			current: 0,
			isShow:true
		};
	},
	computed:{
		i18n(){
			return this.$t('index');
		}
	},
	methods: {
		helpjson(){
			this.$http.requestajx('help/privacy_policy','get',{}).then((res) => {
				// console.log(res)
				this.richjson = res.result;
			}).catch((error) => {
				console.log(error);
			 });
		}
	},
	onShow() {
		this.helpjson();
		setTimeout(()=>{
			this.isShow = false
		},1000)
	}
};
</script>

<style lang="less">
page{ background: url('/static/images/profile/backbanner.jpg') no-repeat; background-size: 100% cover;}
.help_content{color: #FFFFFF;font-size: 24rpx;line-height: 25px;}

.tui-content {
	padding: 20rpx 30rpx;
	background-color: #fff;
	color: #999999;
	font-size: 24rpx;
	line-height: 33rpx;
}
</style>
