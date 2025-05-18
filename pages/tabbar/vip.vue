<template>
  <view class="warp header_top">
    <loading-plus v-if="beforeReady"></loading-plus>
    <uni-status-bar />
    <view class="nav" style="width: 100%; height: 60rpx"></view>
    <template v-if="show">
      <view class="user-info">
        <view class="user-info-head">
          <image
            class="logo"
            src="/static/images/vip/user_avatar.png"
            mode=""
          ></image>
					  <image
            class="circle"
            src="/static/images/vip/circle.png"
            mode=""
          ></image>
          <text class="name">{{ userInfo.nickname }}</text>
          <view class="vipBox">
            <view class="vipBox-in">
              <image
                class="img"
                :src="currentLevelIcon"
                mode=""
              ></image>

              <view>{{
                userInfo.user_member[userInfo.user_member.length - 1].user_level
                  .name
              }}</view>
            </view>
          </view>
        </view>
        <view class="user-info-total">
          <view class="user-item">
            <view class="user-item-value">{{ userInfo.balance }}</view>
            <view class="user-item-title">{{ i18n.balance }}</view>
          </view>
          <view class="user-item">
            <view class="user-item-value">{{ userInfo.id }}</view>
            <view class="user-item-title">{{ i18n.inviteCode }}</view>
          </view>
        </view>
      </view>

      <view class="card" v-for="(item, index) in memberInfo" :key="index">
        <view class="head">
          <view class="head-left">
            <image :src="$configurl.ossBaseUrl + item.icon" mode=""></image>
            <text class="text1">{{ item.name }}</text>
          </view>
          <!-- 			<view class="head-right"
				@click="toUp('/pages/index/member-hall?level='+item.level+'&levelindex='+levelindex)"> -->
          <view class="head-right">
            <view
              class="do-work"
              v-if="filterDoWork(item.level)"
              @click="toTask(item.level)"
            >
              {{ i18n.doWork }}</view
            >
            <view class="do-up" v-else @click="toUp(item.level)">{{
              i18n.up
            }}</view>
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

            <view class="level-item-value" style="color: red">${{ item.low_monthly }}</view>
          </view>
        </view>
        <!-- <view class="center">
					<view class="text2"><text class="name">{{item.name}}</text> {{i18n.nameinfo[0]}}<text
							class="num">{{item.task_num}}</text>{{i18n.nameinfo[1]}}</view>
					<view class="text2">
						{{i18n.nametext2}}<text class="num">${{item.task_val}}</text>
					</view>
					<view class="text2">
						{{i18n.nametext3}}<text class="num">${{item.task_val}}</text>
					</view>
					<text class="text3">{{i18n.nametext}}</text>
				</view>
				<view class="tip" v-if="item.is_recommended === 1">{{i18n.info}}</view> -->

        <!-- <image src="/static/images/vip/huangguan.png" mode=""></image>
			<view class="center">
				<view class="text1">{{item.name}} <text>{{item.price | formatunit}}</text></view>
				<view class="text2">{{item.name}} {{i18n.nameinfo[0]}}<text>{{item.task_num}}</text>{{i18n.nameinfo[1]}}</view>
				<view class="text3">{{i18n.nametext}}</view>
			</view>
			<view class="right">
				<view class="r-btn">GO</view>
			</view>
			<view class="tip" v-if="item.is_recommended === 1">{{i18n.info}}</view> -->
      </view>
    </template>
  </view>
</template>

<script>
import loading from '@/utils/mixin/loading.js'
import config from '@/service/config.js';
export default {
  mixins: [loading],
  data() {
    return {
      memberInfo: [],
      userLevel: 0,
      show: false,
      userInfo: {}
    }
  },
  computed: {
    i18n() {
      return this.$t('pagesvip')
    },
    i18nbtn() {
      return this.$t('btncomfirm')
    },
    currentLevelIcon(){
      return this.memberInfo.map(item => item.level == this.userInfo.user_member[this.userInfo.user_member.length - 1].level ? config.ossBaseUrl + item.icon : '')[0]
    }
  },
  onLoad() {
    this.getInfo()
    this.getUserLevel()
  },
  methods: {

    filterDoWork(level) {
      return this.userInfo.user_member[this.userInfo.user_member.length - 1].user_level.level >= level
    },
    async getInfo() {
      let res = await this.$http.accountInfo()
      this.show = true
      this.userInfo = res.result
      this.userLevel = res.result.level_name
    },
    toTask(level) {
      uni.navigateTo({
        url: '/pages/vip/tasklist?level=' + level
      })
    },
    async toUp(level) {
      uni.navigateTo({
        url: '/pages/profile/open-member'
      })

      // if(e!==1){
      // if (this.userLevel < level) {
      // uni.showModal({
      // 	title: '',
      // 	content: this.i18n.modetitle,
      // 	cancelText: this.i18nbtn[0],
      // 	confirmText: this.i18nbtn[1],
      // 	success(res) {
      // 		if (res.confirm) {
      // 			uni.navigateTo({
      // 				url: '/pages/profile/selectmode'
      // 			});
      // 		}
      // 	}
      // });

      // } else {
      // 	uni.navigateTo({
      // 		url: '/pages/profile/open-member'
      // 	});
      // }
      // }else{
      // 	uni.navigateTo({url:'/pages/vip/tasklist?level='+this.memberInfo[index].level});
      // }
      /* let res = await this.$http.accountInfo();
				let data = res.result.user_member,that = this;
				let urlbool = data.some(function(item,index,arr){
					return item.level == that.memberInfo[e].level;
				});
				if(!urlbool){
					uni.navigateTo({url:'/pages/profile/selectmode'})
				} */
      // console.log(urljson)
    },
    getUserLevel() {
      this.$http
        .requestajx('user_level', 'get', {})
        .then((res) => {
          // console.log(res);
          this.memberInfo = res.result.map((item, index) => ({
            ...item
          }))
        })
        .catch((error) => {
          console.log('错误重启')
        })
    }
  },
  onShow() {
    this.getUserLevel()
  }
}
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  padding-bottom: 100px;
  .user-info {
    height: 288rpx;
    width: 100%;
    background: url('/static/images/vip/bg1.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    padding: 0 26rpx 0;
    &-total {
      margin-top: 50rpx;
      width: 100%;
      height: 150rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    &-head {
      padding-top: 30rpx;
      display: flex;
      align-items: center;
      color: #fff;
      height: 54rpx;
      .logo {
        width: 54rpx;
        height: 54rpx;
        margin: 0;
      }
			.circle {
				position: absolute;
				width: 80rpx;
				height: 80rpx;
				right: 40rpx;
				top: -18rpx;
				}
      .name {
        font-size: 30rpx;
        font-weight: 600;
        margin-left: 10rpx;
      }
    }
  }
  .vipBox {
		margin-left: 10rpx;
    min-width: 64rpx;
    background: linear-gradient(135deg, #b2e7ff, #b3e3fe 48%, #8bb8fa);
    border-radius: 20rpx;
    padding: 4rpx;

    .vipBox-in {
			padding: 2rpx 12rpx;
      display: flex;
      align-items: center;
			justify-content: center;
      background: #3d5cff;
      border-radius: 20rpx;
			font-size: 22rpx;
    }
    .img {
			margin-right: 4rpx;
      width: 36rpx;
      height: 34rpx;
    }
  }

  .card {
    padding: 20rpx 20rpx 30rpx;
    position: relative;
    width: 690rpx;
    background-color: #fff;
    background: url('/static/images/vip/bg2.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12);
    border-radius: 20rpx;
    margin-bottom: 68rpx;
    margin: 30rpx auto 0;
    .level-info-total {
      margin-top: 50rpx;
      width: 100%;
      height: 150rpx;
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
          font-size: 34rpx;
        }

        &-title {
          font-size: 28rpx;
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
        // background: #3d5cff;
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
          color: #3d5cff;
          background: #fff;
        }
        .do-up {
          padding: 15rpx 30rpx;
          border-radius: 50px 0 0 50px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 28rpx;
          color: #fff;
          background: linear-gradient(134deg, #ffe600, #ffc800);
          color: #333;
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
