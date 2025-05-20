<template>
  <view class="profile_back header_top">
    <loading-plus v-if="beforeReady"></loading-plus>
    <!-- <public-head :backicon="false" backcolor="#1b2664" color_icon='#fff' :title="i18n.title" :btntxt="i18n.kefu" v-on:initbtn="btn_on"></public-head> -->
    <view class="head_pos">
      <view class="status_bar"></view>
      <view class="head_content">
        <view class="head_title">{{ i18n.title }}</view>
        <view class="head_flex">
          <view class="head_left">
            <!-- <navigator url="/pages/profile/help-center">{{i18n.titlebtn}}</navigator> -->
          </view>
          <view class="head_btn">
            <image
              src="/static/images/tabbar/kefu.png"
              mode="widthFix"
              @click="kefu_btn"
            ></image>
            <!--  <text v-show="allonline > 0">{{allonline}}</text> -->
          </view>
        </view>
      </view>
    </view>
    <view class="header">
      <view class="header-info">
        <image
          :src="default_avatar"
          mode=""
          class="avatar"
          @click="uploadimg"
        ></image>
        <view class="info-right">
          <!-- <view class="r-title">{{ info.nickname }}<text>￥：{{info.balance}}</text> </view> -->
          <view class="r-code">
            <view class="code-t1">ID: {{ info.nickname }}</view>
            <view class="code-t2" @click="handleVip">
              {{
                info.user_member[info.user_member.length - 1].user_level.name
              }}
              <!-- {{info.balance | formatPrice}} -->
            </view>
          </view>
          <view class="r-title"> {{ i18n.codetitle }}: {{ info.id }} </view>
          <view class="r-title"> {{ i18n.credit }}: {{ info.credit > 100 ? 100 : info.credit }} </view>
        </view>
      </view>
      <!-- <view class="header_date">{{i18n.timedate}}：{{info.effective_time}}</view> -->
    </view>
    <view class="user-info-total">
      <view class="user-info-total-in">
        <view class="user-item">
          <view class="user-item-value">${{ info.commission }}</view>
          <view class="user-item-title">{{ i18n.yongjin }}</view>
        </view>
        <view class="user-item">
          <view class="user-item-value">${{ info.balance }}</view>
          <view class="user-item-title">{{ i18n.walletBalance }}</view>
        </view>
      </view>
    </view>

    <view class="withdraw_content">
      <view class="detailed">
        <view
          class="detailed-item"
          v-for="(item, name, index) in accountIndex"
          :key="index"
        >
          <text class="number">{{ item }}</text>
          <text class="text">{{ i18n.munejson[index] }}</text>
        </view>
        <!-- <view class="detailed-item-active" @click="navTo('/pages/profile/withdrawal')" hover-class="hover-btn"><view class="item-btn"></view></view> -->
      </view>
      <view class="withdraw_list">
        <view
          style="text-align: center"
          class="withdraw_item"
          @click="handleWallet"
          >{{ i18n.wallet }}</view
        >
        <!-- <navigator url="/pages/profile/withdrawal" class="withdraw_item">{{i18n.munebtn}}</navigator>
				<navigator url="/pages/profile/selectmode" class="withdraw_item">{{i18n.munerecharge}}</navigator> -->
      </view>
    </view>

    <!-- VIP -->
    <view class="bd-vip">
      <view class="vip-left">
        <image
          src="/static/images/profile/btn_vip1.png"
          mode="widthFix"
        ></image>
        <text>{{ i18n.viptxt }}</text>
        <view class="uni-ellipsis vip-txt">{{ i18n.viptitle }}</view>
      </view>
      <view class="vip-right" @click="navTo('/pages/profile/open-member')">{{
        i18n.vipbtn
      }}</view>
    </view>

    <view class="task-status">
      <view class="task-item" @click="navTo('/pages/profile/task-record')">
        <image src="/static/images/profile/icon_jinxing.png" />
        <view
          ><text>{{ i18n.listjson[0] }}</text></view
        >
      </view>
      <view class="task-item">
        <image
          src="/static/images/profile/icon_shenhe.png"
          @click="navTo('/pages/profile/success-task?type=' + 1)"
        />
        <view
          ><text>{{ i18n.listjson[1] }}</text></view
        >
      </view>
      <view
        class="task-item"
        @click="navTo('/pages/profile/success-task?type=' + 2)"
      >
        <image src="/static/images/profile/icon_fin.png" />
        <view
          ><text>{{ i18n.listjson[2] }}</text></view
        >
      </view>
    </view>
    <!-- <view class="invitation">
			<image src="/static/images/profile/icon_gift.png" mode=""></image>
			<view class="center">
				<text class="title">{{i18n.invititle}}</text>
				<text class="subtitle uni-ellipsis-2">{{i18n.inviinfo}}</text>
			</view>
			<view class="right" @click="navTo('/pages/profile/invitation?id='+info.id)">{{i18n.invibtn}}</view>
		</view> -->
    <view class="list">
      <uni-list>
       <!-- <uni-list-item
          :title="i18nmsg.title"
          :showArrow="true"
          :showBadge="true"
          :clickable="true"
          :badgeText="socketonlinenum"
          badgeType="error"
          thumb="/static/images/profile/icon_02_@2.png"
          @click="navTo('/pages/tabbar/msg')"
        >
        </uni-list-item> -->
        <block
          v-for="(item, index) in navlistjson"
          :key="index"
          v-if="navlistjson[index]"
        >
          <uni-list-item
            :title="i18n.navlist[item.name]"
            :showArrow="true"
            :clickable="true"
            :thumb="item.imgsrc"
            @click="navTo(item.router_url)"
          >
          </uni-list-item>
        </block>
        <uni-list-item
          :title="i18n.kefu"
          :showArrow="true"
          :clickable="true"
          :width="40"
          :height="40"
          thumb="/static/images/profile/kefu.png"
          @click="kefu_btn"
        ></uni-list-item>
      </uni-list>
    </view>
    <view class="exit-login" @click="exit">{{ i18n.navbtn }}</view>
  </view>
</template>

<script>
import config from '@/service/config.js'
import loading from '@/utils/mixin/loading.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [loading],
  data() {
    return {
      info: {
        avatar: ''
      },
      navlistjson: [
        {
          imgsrc: '/static/images/profile/icon_@2.png',
          router_url: '/pages/profile/my-credit',
          name: 0
        },
        // {
        //   imgsrc: '/static/images/profile/icon_01_@2.png',
        //   router_url: '/pages/profile/personal-information',
        //   name: 1
        // },
        // {
        //   imgsrc: '/static/images/profile/news.png',
        //   router_url: '/pages/profile/my-bill',
        //   name: 3
        // },
        {
          imgsrc: '/static/images/profile/icon_03_@2.png',
          router_url: '/pages/profile/my-team',
          name: 2
        },
        {
          imgsrc: '/static/images/profile/icon_04_@2.png',
          router_url: '/pages/profile/change-password',
          name: 3
        }
      ],
      accountIndex: []
    }
  },
  computed: {
    ...mapGetters(['msgnumindex']),
    i18n() {
      return this.$t('pagesprofile')
    },
    i18nmsg() {
      return this.$t('pagesmsg')
    },
    i18nbtn() {
      return this.$t('btncomfirm')
    },
    default_avatar() {
      return this.info.avatar.substring(0, 5) == 'https'
        ? this.info.avatar
        : this.$configurl.ossBaseUrl + this.info.avatar
    },
    socketonlinenum() {
      return this.msgnumindex === 0 ? '' : JSON.stringify(this.msgnumindex)
    }
  },
  methods: {
    handleVip() {
      uni.switchTab({
        url: '/pages/tabbar/vip'
      })
    },
    navTo(url) {
      if (url === '/pages/profile/withdrawal') {
        if (!this.info.info.bank_name) {
          uni.showModal({
            title: '',
            content: this.i18n.navmodal[0],
            confirmText: this.i18n.navmodal[1],
            success(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/pages/profile/account'
                })
              }
            }
          })
          return
        } else {
          return uni.navigateTo({ url })
        }
      }

      uni.navigateTo({ url })
    },
    async getAccountInfo() {
      let res = await this.$http.accountInfo()
      this.info = res.result
      this.$store.commit('changeInfo', res.result)
    },
    async getAccountIndex() {
      let res = await this.$http.accountIndex()
      const data = res.result
      this.accountIndex = [data.team_profit, data.task_profit, data.team_count]
    },
    uploadimg() {
      let that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          uni.showLoading({ mask: true })
          that.$http
            .uploadajax('upload', tempFilePaths[0], {}, 'image')
            .then((res) => {
              // console.log(res);
              that.$http
                .requestajx('account/avatar', 'put', {
                  avatar: res.result.full_uri
                })
                .then((data) => {
                  // console.log(data)
                  that.getAccountInfo()
                  uni.hideLoading()
                })
            })
        }
      })
    },
    handleWallet() {
      uni.navigateTo({
        url: '/pages/profile/wallet'
      })
    },
    exit() {
      const that = this
      uni.showModal({
        title: '',
        content: this.i18n.exitmodal,
        cancelText: this.i18nbtn[0],
        confirmText: this.i18nbtn[1],
        success(res) {
          if (res.confirm) {
            uni.removeStorageSync('userToken')
            // that.$socketinit.close_socket();
            uni.redirectTo({
              url: '/pages/login/pwd-login'
            })
          }
        }
      })
    },
    async kefu_btn() {
      // #ifdef H5
      let winhref = window.open('', '_blank')
      // #endif
      let res = await this.$http.customerUrl()
      // #ifdef APP-PLUS
      plus.runtime.openURL(encodeURI(res.result))
      // #endif
      // #ifdef H5
      winhref.location = res.result
      // #endif
    }
  },
  onShow() {
    this.getAccountInfo()
    this.getAccountIndex()
  }
}
</script>

<style lang="scss">
.profile_back {
  background-color: #f5f7fd;
}
.header_top {
  /* #ifdef H5 */
  padding-bottom: 70px;
  /* #endif */
}
.head_pos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #1b2664;
}
.head_content {
  color: #ffffff;
  position: relative;
  .head_flex {
    position: absolute;
    left: 0;
    top: 0;
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .icon-zy {
      font-size: 16px;
      margin-right: 5px;
    }
    .head_btn {
      position: relative;
      image {
        width: 20px;
      }
      text {
        position: absolute;
        right: -10px;
        top: -5px;
        @include radio_info;
      }
    }
  }
  .head_title {
    text-align: center;
    font-size: 36rpx;
    height: 45px;
    line-height: 45px;
  }
}

.hover-btn {
  transform: translate(1rpx, 1rpx);
}
.user-info-total {
  height: 170rpx;
  margin: -54rpx auto 0;
  border-radius: 20rpx;
	overflow: hidden;
    background-color: #ffffff;

  width: 680rpx;
	box-shadow: 0 2px 5px 1px rgba(0,0,0,.12);
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
.header {
  width: 100%;
  height: 334rpx;
  background: url(/static/images/profile/pic.png) no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
  .header-info {
    display: flex;
    align-items: center;
    margin-left: 50rpx;
    padding-top: 58rpx;
    .head_image {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
    .avatar {
      width: 125rpx;
      height: 125rpx;
      border-radius: 50%;
    }
    .info-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      margin-left: 20rpx;
      padding-right: 50rpx;
      .r-title {
        font-size: 28rpx;
        margin-top: 6px;
        color: #fff;
      }
      .r-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26rpx;
        color: #fff;
        .code-t2 {
          height: 50rpx;
          background: linear-gradient(90deg, #ebebec, #b8b9bb);
          border-radius: 100rpx;
          font-weight: 500;
          font-size: 28rpx;
          color: #000;
          padding: 0 30rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          image {
            width: 30rpx;
            height: 30rpx;
            margin: 0 10rpx 0 40rpx;
          }
        }
      }
    }
  }
  .header_date {
    font-size: 30rpx;
    color: #ffffff;
    text-align: center;
    padding-top: 15px;
  }
}
.withdraw_content {
	box-shadow: 0 2px 5px 1px rgba(0,0,0,.12);
  background-color: #ffffff;
  margin: 20rpx auto 0;
  border-radius: 20rpx;
  width: 680rpx;
}
.withdraw_list {
  display: flex;
  .withdraw_item {
    margin: 20rpx 30rpx;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    color: #fff;
    background-color: #1c2663;
    border-radius: 20rpx;
    // &+.withdraw_item{ border-left: 1px solid #f3f3f3;}
  }
}
.detailed {
  display: flex;
  align-items: center;
  height: 130rpx;
  .detailed-item {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
    padding: 0 10px;
    text-align: center;
    .number {
      font-size: 28rpx;
    }
    .text {
      font-size: 22rpx;
      margin-top: 18rpx;
    }
  }
  .detailed-item:nth-child(-n + 3)::after {
    content: '';
    position: absolute;
    right: 0;
    width: 2rpx;
    height: 22rpx;
    background-color: #ddd;
  }
  .detailed-item-active {
    flex: 1.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-btn {
      width: 140rpx;
      height: 58rpx;
      line-height: 58rpx;
      text-align: center;
      font-size: 26rpx;
      color: #fff;
      background-color: #1b2664;
      border-radius: 29rpx;
    }
  }
}

.bd-vip {
  width: 700rpx;
  height: 128rpx;
  border-radius: 15rpx 15rpx 0px 0px;
  opacity: 0.95;
  background: url(../../static/images/profile/pic_vip.png) no-repeat;
  background-size: 100% 100%;
  margin: 18rpx auto 0;
  padding: 0 32rpx;
  display: flex;
  justify-content: space-between;
  .vip-left {
    max-width: 70%;
    image {
      width: 20px;
      margin-top: 24rpx;
    }
    text {
      color: #ffffff;
      font-size: 17px;
      margin-left: 5px;
      font-style: oblique;
    }
    .vip-txt {
      margin-top: 18rpx;
      color: #b0b1b9;
      font-size: 20rpx;
    }
  }
  .vip-right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    height: 58rpx;
    background-color: #ecd8ae;
    border-radius: 15rpx;
    color: #2f3133;
    font-size: 24rpx;
    margin-top: 28rpx;
  }
}

.task-status {
  display: flex;
  align-items: center;
  width: 678rpx;
  height: 150rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  margin: 10rpx auto 12rpx;

  .task-item {
    flex: 1;
    text-align: center;
    image {
      width: 81rpx;
      height: 81rpx;
    }
    text {
      font-size: 26rpx;
      color: #333333;
    }
  }
}

.invitation {
  display: flex;
  align-items: center;
  width: 100%;
  height: 142rpx;
  background-color: #ffffff;
  margin-top: 12rpx;
  image {
    width: 94rpx;
    height: 88rpx;
    margin-left: 43rpx;
  }
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 24rpx;
    .title {
      color: #333333;
      font-size: 34rpx;
    }
    .subtitle {
      font-size: 26rpx;
      color: #999;
      margin-top: 14rpx;
    }
  }
  .right {
    color: #47b9eb;
    font-size: 26rpx;
    margin-right: 54rpx;
  }
}

.list {
  margin-top: 14rpx;
}
.exit-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92rpx;
  color: #f98166;
  font-size: 30rpx;
  margin-top: 20rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
}
</style>
