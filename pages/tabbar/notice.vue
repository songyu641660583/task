<template>
		<view class="notice header_top">
		<public-head :title="i18n.title"></public-head>
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="title">{{i18n.title}}</view>
		<view class="content" v-html="info.value"></view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				info: {}
			}
		},
		computed: {
			i18n() {
				return this.$t('notice')
			}
	},
	created(){
		this.getOtherSettings()
	},
	methods: {
		  async getOtherSettings() {
      let res = await this.$http.getOtherSettings()
      this.info = res.result.filter(item => (item.name === 'site_notice'))[0]
    },
	},
	}
</script>

<style lang="less">
.notice {
	background-color: #f7f9fc;
	height: 100vh;
}
	.title {
		text-align: center;
		    font-weight: 600;
		    font-size: 32rpx;
		    color: #333;
		    padding: 20rpx 0;
		    text-align: center;
	}
	.content {
		    padding: 0 20rpx;
		    font-weight: 500;
			line-height: 36rpx;
		    font-size: 28rpx;
		    color: #333;
	}
</style>
