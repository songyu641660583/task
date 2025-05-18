<template>
  <view class="wallet header_top">
    <public-head :title="i18n.title"></public-head>
    <view class="user-info-total">
      <view class="user-info-total-in">
        <view class="user-item">
          <view class="user-item-value">${{ info.balance }}</view>
          <view class="user-item-title">{{ i18n2.walletBalance }}</view>
        </view>
        <view class="user-item">
          <view class="user-item-value">${{ info.balance }}</view>
          <view class="user-item-title">{{ i18n.withdrawMoney }}</view>
        </view>
      </view>
      <view class="btn-wrap">
        <view class="pay" @click="handleLink('pay')">充值</view>
        <view class="withdraw" @click="handleLink('withdraw')">提现</view>
      </view>
    </view>
		<view class="record-list">
			<view class="record-title">{{ i18n.recordTitle }}</view>
			<view class="no-data" v-if="recordData.length === 0">
				<image src="/static/images/index/nodata.png" mode=""></image>
				<view class="text">{{  i18n.noData }}</view>
			</view>
			<view class="record-item" v-for="(item, index) in recordData" :key="index">
        <view class="record-item-icon">
          <!-- <image :src="item.icon" mode=""></image> -->
        </view>
        <view class="record-flex">
          <view class="record-level">
            <view>
             
              <text class="text1">{{ item.amount }}</text>
            </view>
          </view>
        </view>

        <view class="record-bottom">
          <view class="time">{{ item.created_at }}</view>
          <view class="amount">${{ item.amount }}</view>
        </view>
      </view>
		</view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      info: {},
			page: 1,
			recordData: [{
				record_type: 1,
				amount: '500',
				created_at: '2013-244323'
			}],
    }
  },
  computed: {
    ...mapGetters(['changeprice']),
    i18n() {
      return this.$t('wallet')
    },
    i18n2() {
      return this.$t('pagesprofile')
    }
  },
  onShow() {
    this.getAccountInfo()
  },
  methods: {
    async getAccountInfo() {
      let res = await this.$http.accountInfo()
      this.info = res.result
    },
		async getRecordData() {
			let res = await this.$http.withdrawalList({
				page: this.page
			});
			if (this.page === 1) {
				this.recordData = res.result.data;
			} else {
				this.recordData.data.push(...res.result.data);
			}
		},
    handleLink(type) {
      if (this.changeprice.verify_status === 1) {
        uni.showModal({
          content: this.i18n.navmodal[0],
          confirmText: this.i18n.navmodal[1],
          success(res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/profile/real-auth'
              })
            }
          }
        })
        return
      }
      if (this.changeprice.verify_status === 2) {
        uni.showToast({
          title: this.i18n.verifing,
          icon: 'none'
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
    }
  }
}
</script>

<style lang="less">
.wallet {
  background-color: #f7f9fc;
  min-height: 100vh;
}
.no-data {
	margin-top: 100rpx;
		text-align: center;

	image {
		
		width: 200rpx;
		height: 200rpx;
	}
	.text {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #666;
	}
}
.record-list {
	padding: 0 30rpx;
	.record-title {
		font-size: 30rpx;
		line-height: 80rpx;
	}
}

.user-info-total {
  margin: 20rpx auto 0;
	padding: 40rpx 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  background-color: #ffffff;

  width: 680rpx;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12);
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40rpx 0 0;
    gap: 20rpx;
    & > view {
      flex: 1;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #3d5cff;
      font-weight: 400;
      font-size: 15px;
      color: #3d5cff;
      box-sizing: border-box;
    }
    .withdraw {
      background-color: #3d5cff;
      color: #fff;
    }
  }
  .user-info-total-in {
    height: 100%;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &-value {
      margin-bottom: 20rpx;
      font-weight: 600;
      font-size: 34rpx;
    }

    &-title {
      font-size: 28rpx;
    }
  }
}
  .record-item {
      margin-bottom: 20rpx;
      padding: 20rpx;
      border-radius: 20rpx;
      background: #fff;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12);


      &-icon {
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }

      .record-level {
        display: inline-block;

        & > view {
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
      }

      .record-bottom {
        margin-top: 12rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .time {
          font-size: 24rpx;
          color: #a3a3a3;
        }

        .amount {
          font-size: 44rpx;
          color: #f30d1c;
          font-weight: bold;
        }
      }
    }
</style>
