<template>
		<view class="wallet header_top">
		<public-head :title="i18n.title"></public-head>
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="module">
		   <view @click="handleLink('pay')">充值</view>
		</view>
		<view class="module">
			<view @click="handleLink('withdraw')">提现</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['changeprice']),
			i18n() {
				return this.$t('wallet')
			}
	},
		methods: {
			handleLink(type){
				if(this.changeprice.verify_status === 1){
						uni.showModal({
						content: this.i18n.navmodal[0],
						confirmText:this.i18n.navmodal[1],
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/profile/real-auth'
								})
							}
						}
					})
					return
				}
				if(this.changeprice.verify_status === 2){
					uni.showToast({
							title: this.i18n.verifing,
							icon:'none',
						})
					return
				}
				if (type === 'pay') {
					uni.navigateTo({
						url: '/pages/profile/selectmode'
					})
				} else if (type === 'withdraw') {
					uni.navigateTo({
						url: '/pages/profile/withdrawal'
					})
				}
			},
		}
	}
</script>

<style lang="less">
.wallet {
	background-color: #f7f9fc;
	min-height: 100vh;
}
	.module {
		margin: 20rpx;
		padding: 25rpx;
		border-radius: 20rpx;
		box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
		background-color: #fff;
	}
</style>
