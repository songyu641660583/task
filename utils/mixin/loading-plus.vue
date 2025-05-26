<template>
	<view class="bgd">
		<uni-load-more status="loading"   :content-text="{contentrefresh: i18n2.text}"></uni-load-more>
	</view>
</template>

<script>
export default {
  computed: {
 
     i18n2() {
      return this.$t('pageloading')
    }
  }
}
</script>

<style lang="less">
	.bgd {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		background-color: #fff;
		color: #080d5d;
	}
</style>
