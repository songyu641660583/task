<template>
	<view class="warp header_top">
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-status-bar />
		<public-head :title="i18n.title"></public-head>
		<!-- <view class="nav" style="width: 100%;height: 88rpx;"></view>
		<view class="logo">
			<image src="/static/images/vip/vip.png" mode=""></image>
		</view> -->
		<template v-if="show">
		<view class="card"  v-for="(item,index) in memberInfo" :key="index">
			<view class="head">
				<view class="head-left">
					<image :src="$configurl.ossBaseUrl + item.icon" mode=""></image>
					<text class="text1">{{item.name}}</text>
				</view>
				<view class="head-right">
					<view class="do-work" v-if="filterDoWork(item.level)" @click="navTo('/pages/index/member-hall?level='+item.level+'&levelindex='+levelindex)">
						{{i18n.doWork}}</view>
					<view class="do-up" v-else @click="toUp(item.level)">{{i18n.up}}</view>
				</view>
			</view>
			   <view class="level-info-total">
          <view class="level-item">
            <view class="level-item-title"
              >{{ i18n.nametext1 }}/{{ i18n.unit }}</view
            >
            <view class="level-item-value">{{ item.task_num }}</view>
          </view>
          <view class="level-item">
            <view class="level-item-title">{{ i18n.nametext2 }}</view>

            <view class="level-item-value">${{ item.task_val }}</view>
          </view>
          <view class="level-item">
            <view class="level-item-title">{{ i18n.nametext3 }}</view>

            <view class="level-item-value" style="color: red">${{ item.task_val }}</view>
          </view>
        </view>
			<!-- <view class="tip" v-if="item.is_recommended === 1">{{i18n.info}}</view> -->
		</view>
		</template>
	</view>
</template>

<script>
	import loading from "@/utils/mixin/loading.js"
	export default {
		mixins: [loading],
		data() {
			return {
				memberInfo: [],
				levelindex: 0,
				userLevel: 0,
				userInfo: {},
				show: false
			};
		},
		computed: {
			i18n() {
				return this.$t('pagesvip');
			}
		},
		onLoad(e) {
			// console.log(e)
			this.getInfo();
			this.levelindex = e.level;
			this.$http.requestajx('user_level', 'get', {}).then((res) => {
				this.memberInfo = res.result.map((item, index) => ({
					...item,
				}))
			}).catch((error) => {
				console.log('错误重启');
			});
		},
		methods: {
		   filterDoWork(level) {
      return this.userInfo.user_member[this.userInfo.user_member.length - 1].user_level.level >= level
    },
			async getInfo() {
				let res = await this.$http.accountInfo();
				this.show = true
				 this.userInfo = res.result
				this.userLevel = res.result.level_name
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			async toUp(price) {
				uni.navigateTo({
					url: '/pages/profile/open-member'
				});
			// 	if (this.balance < price) {
			// 		uni.showModal({
			// 			title: '',
			// 			content: this.i18n.modetitle,
			// 			cancelText: this.i18nbtn[0],
			// 			confirmText: this.i18nbtn[1],
			// 			success(res) {
			// 				if (res.confirm) {
			// 					uni.navigateTo({
			// 						url: '/pages/profile/selectmode'
			// 					});
			// 				}
			// 			}
			// 		});
			
			// 	} else {
			// 		uni.navigateTo({
			// 			url: '/pages/profile/open-member'
			// 		});
			// 	}
				
			},
			async getUserLevel() {
				let res = await this.$http.userLevel()
				// console.log(res);
				this.memberInfo = res.result
			}
		},
		onShow() {
			// this.getUserLevel()
		}
	};
</script>

<style lang="less">
	.logo {
		width: 188rpx;
		height: 94rpx;
		margin: 10rpx 0 52rpx 45rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.warp {
		padding-bottom: 80rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 120rpx;

		.card {
			padding: 20rpx 20rpx 30rpx;
			position: relative;
			width: 690rpx;
			background-color: #fff;
			// background: url(/static/images/vip/bgd.png) no-repeat;
			// background-size: 100% 100%;
			box-shadow: 0 2px 5px 1px rgba(0, 0, 0, .12);
			border-radius: 20rpx;
			margin-bottom: 68rpx;
			margin: 30rpx auto 0;
			  .level-info-total {
      margin-top: 30rpx;
      width: 100%;
      height: 100rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .level-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        &-value {
          margin-top: 20rpx;
          font-weight: 600;
          font-size: 38rpx;
        }

        &-title {
          font-size: 24rpx;
        }
      }
    }

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-left {
					padding: 8rpx 16rpx;
					display: flex;
					align-items: center;
					background: #3d5cff;
					border-radius: 50px;
					font-family: DIN;
					font-weight: 600;
					font-size: 26rpx;
					color: #fff;

					image {
						width: 38rpx;
						height: 38rpx;

					}
				}

				&-right {
					.do-work {
						padding: 15rpx 30rpx;
						border-radius: 50px 0 0 50px;
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #fff;
						background: #3d5cff;
					}
					.do-up {
						padding: 15rpx 30rpx;
						border-radius: 50px 0 0 50px;
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #fff;
						background: #ffa73d;
					}
				}
			}

			.tip {
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				width: 25px;
				height: 25px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background-color: #161927;
				border: 2px solid rgba(253, 183, 34, 0.48);
				color: #fff;
				font-size: 10px;
			}

			.center {
				flex: 1;
				display: flex;
				flex-direction: column;

				.text1 {
					color: #000000;
					font-size: 34rpx;
					margin-top: 54rpx;
				}

				.text2 {
					color: #858585;
					font-size: 24rpx;
					margin-top: 26rpx;

					.name {
						color: #e20e0e;
					}

					.num {
						font-size: 30rpx;
						font-weight: 600;
						color: #e20e0e;
					}
				}

				.text3 {
					color: #86662a;
					font-size: 24rpx;
					margin-top: 10px;
				}
			}

			.right {
				display: flex;
				height: 100%;
				align-items: center;

				.r-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 112rpx;
					height: 48rpx;
					border-radius: 24rpx;
					border: solid 2rpx #7f725b;
					color: #7f725b;
					font-size: 36rpx;
					margin-right: 38rpx;
				}
			}
		}
	}
</style>