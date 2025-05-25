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
        <view class="pay" @click="handleLink('pay')">{{ i18n2.munerecharge }}</view>
        <view class="withdraw" @click="handleLink('withdraw')">{{ i18n2.munebtn }}</view>
      </view>
    </view>
		<view class="record-list">
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
             
								<text class="test1" v-if="item.status === 0">{{i18n.drawrecord1}}</text>
				<text class="test1" v-else-if="item.status === 1">{{i18n.drawrecord2}}</text>
				<text class="test1" v-else>{{i18n.drawrecord3}}</text>
            </view>
          </view>
        </view>
				<view>
					 <text class="text1">{{i18n3.account[0]}} : <text>{{ item.account }}</text></text>
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
function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000) // 乘以 1000 转换为毫秒

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
export default {
  data() {
    return {
      info: {},
			page: 1,
			recordData: [],
    }
  },
  computed: {
    ...mapGetters(['changeprice']),
    i18n() {
      return this.$t('wallet')
    },
    i18n2() {
      return this.$t('pagesprofile')
    },
    i18n3() {
      return this.$t('personal')
    }
  },
  onShow() {
    this.getAccountInfo()
		this.getRecordData()
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
			let data = res.result.data.map(item => {
				return {
					...item,
				   created_at: formatTimestamp(Number(item.created_at))
				}
			})
			if (this.page === 1) {
				this.recordData = data;
			} else {
				this.recordData.data.push(...data);
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
      border: 1px solid #1c2663;
      font-weight: 400;
      font-size: 15px;
      color: #1c2663;
      box-sizing: border-box;
    }
    .withdraw {
      background-color: #1c2663;
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
		margin-top: 20rpx;
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
				margin-bottom: 20rpx;
        display: inline-block;

        & > view {
          padding: 8rpx 16rpx;
          display: flex;
          align-items: center;
          background: #1c2663;
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
