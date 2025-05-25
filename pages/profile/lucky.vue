<template>
	<view class="lucky header_top">
		<public-head :title="i18n.title"></public-head>
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="module" style="padding-bottom: 60rpx">
			<div class="zhuanpan">
				<LuckyWheel ref="myLucky" width="350px" height="350px" :blocks="blocks" :buttons="buttons" :prizes="prizes"
					@start="startCallback" @end="endCallback"></LuckyWheel>
			</div>
			<button class="btn" @click="startCallback">{{ i18n.start }}</button>
			<view class="lucky-total">{{ i18n.luckyBalance }}：{{ userInfo.draw_num }}</view>
		</view>
		<view class="module">
			<view class="module-title">{{ i18n.linkText }}</view>
			<view class="link-value">{{ linkValue }}</view>
			<view class="load-btn" @click="onCopyResult">{{ i18n.codebtn }}</view>
		</view>
		<view class="module">
			<view class="module-title">{{ i18n.ruleText }}</view>
			<view class="module-value">{{ i18n.ruleValue }}</view>
		</view>
	</view>
</template>

<script>
import prizeArrow from '@/static/images/lucky/arrow.png'
import prizeBlock from '@/static/images/lucky/block.png'
import loading from "@/utils/mixin/loading.js"
import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel.vue'

const prizes = [
	{
		background: '#FCDB89',
		index: 1,
		fonts: [
			{
				fontColor: 'red',
				text: '$10',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FDF4C2',
		index: 2,
		fonts: [
			{
				fontColor: 'red',
				text: '$15',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FCDB89',
		index: 3,
		fonts: [
			{
				fontColor: 'red',
				text: '$20',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FDF4C2',
		index: 4,
		fonts: [
			{
				fontColor: 'red',
				text: '$30',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FCDB89',
		index: 5,
		fonts: [
			{
				fontColor: 'red',
				text: '$50',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FDF4C2',
		index: 6,
		fonts: [
			{
				fontColor: 'red',
				text: '$100',
				top: '0px',
				lineHeight: '30px',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FCDB89',
		index: 7,
		fonts: [
			{
				fontColor: 'red',
				text: '$500',
				top: '0px',
				lineHeight: '30px',
				fontWeight: '600',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FDF4C2',
		index: 8,
		fonts: [
			{
				fontColor: 'red',
				text: '$1000',
				top: '0px',
				lineHeight: '30px',
				fontWeight: '600',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FCDB89',
		index: 9,
		fonts: [
			{
				fontColor: 'red',
				text: '$2000',
				top: '0px',
				lineHeight: '30px',
				fontWeight: '600',
				width: '60px',
				height: '55px',
			},
		],
	},
	{
		background: '#FDF4C2',
		index: 10,
		fonts: [
			{
				fontColor: 'red',
				text: 'vip1',
				top: '0px',
				lineHeight: '30px',
				fontWeight: '600',
				width: '60px',
				height: '55px',
			},
		],
	},
]
const prizeList = [
	{
		index: 1,
		name: '十等奖',
		jp: '$10',
		value: 10,
	},
	{
		index: 2,
		name: '九等奖',
		jp: '$15',
		value: 15,
	},
	{
		index: 3,
		name: '八等奖',
		jp: '$20',
		value: 20,
	},
	{
		index: 4,
		name: '七等奖',
		jp: '$30',
		value: 30,
	},
	{
		index: 5,
		name: '六等奖',
		jp: '$50',
		value: 50,
	},
	{
		index: 6,
		name: '五等奖',
		jp: '$100',
		value: 100,
	},
	{
		index: 7,
		name: '四等奖',
		jp: '$500',
		value: 500,
	},
	{
		index: 8,
		name: '三等奖',
		jp: '$1000',
		value: 1000,
	},
	{
		index: 9,
		name: '二等奖',
		jp: '$2000',
		value: 2000,
	},
	{
		index: 10,
		name: '一等奖',
		jp: 'vip',
		value: 0,
	},
]
let isEnd = true
export default {
	mixins: [loading],
	components: { LuckyWheel },
	data() {
		return {
			info: '',
			linkValue: '',
			blocks: [
				{
					padding: '42px',
					imgs: [{ src: prizeBlock, top: '0px', width: '350px', height: '350px' }],
				},
			],
			buttons: [
				{
					radius: '35%',
					background: 'transparent',
					pointer: true,
					imgs: [{ src: prizeArrow, top: '-78px', width: '90px', height: '118px' }],
				},
			],
			prizes,
			userInfo: {}
		}
	},
	computed: {
		i18n() {
			return this.$t('lucky')
		}
	},
	created() {
		this.getInfo()
	},

	methods: {
		async getInfo() {
			let res = await this.$http.accountInfo()
			this.userInfo = res.result
		},
		startCallback() {
			if (!isEnd) {
				return
			}
			isEnd = false
			const myLucky = this.$refs.myLucky

			if (this.userInfo.draw_num === 0) {
				isEnd = true
				uni.showModal({
				content: this.i18n.noNum,
				confirmText:this.i18n.formbtn,
				success(res) {
					if(res.confirm) {
						uni.hideToast()
					}
				}
			})
			  return;
			}

			myLucky.play()
			this.userInfo.draw_num--
			this.$http.getLucky().then(res => {
				setTimeout(() => {
					myLucky.stop((res.result.award_id && res.result.award_id - 1) || 0)
					isEnd = true
				}, 3000)
			})

		},

		async endCallback(result) {
			const priceDetail = prizeList[result.index - 1]
			uni.showModal({
				content: this.i18n.windmodal[0] + priceDetail.jp,
				confirmText: this.i18n.windmodal[1],
				success(res) {
					if (res.confirm) {
						uni.hideToast()
					}
				}
			})
		},
		onCopyResult() {
			uni.setClipboardData({
				data: this.linkValue
			})
		},
	},

	onLoad(options) {
		this.info = options
		this.linkValue += options.id
	},
	async onShow() {
		let res = await this.$http.promotionCopy()
		console.log('res', res)
		this.linkValue = res.result.tg_url
	},
}
</script>

<style lang="less">
.lucky {
	padding-bottom: 40rpx;
	background-color: #f7f9fc;
	min-height: 100vh;

	.section-wrap {
		padding: 0 15rpx;
	}

	.lucky-total {
		color: #ACACAC;
		text-align: center;
		margin-top: 20rpx;
	}

	.module {
		margin: 20rpx;
		padding: 25rpx;
		border-radius: 20rpx;
		box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
		background-color: #fff;

		&-title {
			font-weight: 600;
			font-size: 32rpx;
		}

		&-value {
			font-size: 28rpx;
			color: #333;
			margin-top: 30rpx;
		}
	}

	.zhuanpan {
		margin-top: 30px;
		position: relative;
		z-index: 1;
	}

	.zhuanpan::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, rgba(255, 80, 80, 0.3) 0%, rgba(255, 80, 80, 0) 70%);
		animation: glow 2s ease-in-out infinite;
		z-index: -1;
	}

}

.btn {

	margin: 40rpx auto;
	background-color: #E93436;
}

.link-value {
	margin-top: 24rpx;
	background: #f8f9fa;
	border-radius: 8px;
	padding: 12px 16px;
	font-size: 14px;
	color: #555;
	border: 1px solid #e9ecef;
	word-break: break-all;
	margin-bottom: 16px;
	position: relative;
}

.load-btn {
	background: linear-gradient(135deg, #4a80f0, #6a5acd);
	color: white;
	border-radius: 8px;
	padding: 12px 0;
	text-align: center;
	font-size: 15px;
	font-weight: 500;
	transition: all 0.3s ease;
	box-shadow: 0 2px 6px rgba(74, 128, 240, 0.2);
}
</style>