<template>
	<view class="open_rbag_model" v-if="openrbagmodelshow" @touchmove.prevent.stop>
		<image class="rbag_conbg" src="/static/images/modal/openrbag.png"></image>
		<view class="rbag_conbg open_rbag_con">
			<view class="open_title">— {{defaultData.title}} —</view>
			<view class="rbag_detail">
				<view class="open_money">
					<view class="danwei">{{defaultData.money | formatPrice}}</view>
				</view>
				<view class="open_tips">{{defaultData.info}}</view>
			</view>
			<view class="lookbag_box">
				<view class="lookbag_btn">
					<view class="text" @click.stop="hideopenbtn()">{{defaultData.btntxt}}</view>
				</view>
			</view>
			<view class="hide_btn" @click.stop="hideopenbtn()">
				<icon type="cancel" color="#fbd977" size="28" />
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		props:{
			defaultData:{
				type:Object,
				default:{
					title:'恭喜您获得',
					money:'12.151元',
					info:'已存入钱包，可直接体现',
					btntxt:'朕知道了'
				}
			}
		},
		data() {
			return {
				num: 12.68,
				bag1animation: {},
				openbrnanimation: {},
				rbagmodelshow: false,
				openrbagmodelshow: false,
			};
		},
		created: function() {
			// this.imageanimation();
			this.openbtn()
		},
		methods: {
			// 侧边红包 => 动画
			imageanimation: function() {
				var that = this;
				var next = true;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.bag1animation = animation
				setInterval(function() {
					if (next) {
						animation.rotate(36).step();
						next = !next;
					} else {
						animation.rotate(6).step();
						next = !next;
					}
					that.bag1animation = animation.export()
				}, 1100)
			},
			// 侧边红包 => 点击
			openrbagbtn: function() {
				this.rbagmodelshow = true;
			},

			// 红包封面 => 关闭按钮
			hidebtn: function() {
				this.rbagmodelshow = false;
			},
			// 红包封面 => 開红包按钮
			openbtn: function() {
				var that = this;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				that.openbrnanimation = animation;
				// animation.rotate3d(0,1,0,360).step();
				animation.rotateY(360).step();
				that.openbrnanimation = animation.export();
				setTimeout(function() {
					that.rbagmodelshow = false;
					that.openrbagmodelshow = true;
					that.openbrnanimation = {};
				}, 1000);
			},

			// 打开红包  => 关闭按钮
			hideopenbtn: function() {
				this.openrbagmodelshow = false;
				this.$emit('cancel')
			},
			// 打开红包  => 查看钱包
			lookbagbrn: function() {

			}
		}
	}
</script>

<style lang="scss">
	.open_rbag_model {
		width: 300px;
		height: 200px;
		background-color: rgba(0,0,0,0.3);
		z-index: 1000;
		.rbag_conbg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 300px;
			margin: auto;
			z-index: 1001;
		}
		.open_rbag_con {
			z-index: 1002;
			.open_title {
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size: 38rpx;
				letter-spacing: 2rpx;
				color: #e46965;
			}
			.rbag_detail {
				.open_money {
					text-align: center;
					font-size: 80rpx;
					color: #c95948;
					font-weight: bold;
					display: flex;
					justify-content: center;
					.danwei {
						font-size: 30rpx;
						margin-left: 16rpx;
						margin-top: 24rpx;
					}
				}
				.open_tips {
					text-align: center;
					font-size: 30rpx;
					color: #d26762;
					margin-top: 30rpx;
				}
			}
			.lookbag_box {
				margin-top: 90px;
				display: flex;
				justify-content: center;
				.lookbag_btn {
					width: 70%;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					font-size: 32rpx;
					color: #c95948;
					letter-spacing: 2rpx;
					background-color: #ffd356;
					border-radius: 50rpx;
					box-shadow: 0rpx 0rpx 4rpx rgba(0,0,0,0.2);
				}
			}
			.hide_btn {
				position: absolute;
				bottom: -110rpx;
				left: 0;
				right: 0;
				width: 80rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 0 auto;
			}
		}
	}
	
</style>
