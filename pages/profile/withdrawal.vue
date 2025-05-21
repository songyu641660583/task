<template>
  <view class="withdrawal header_top">
    <public-head
      :title="i18n.title"
      :btntxt="i18n.titlebtn"
      v-on:initbtn="btn_on"
    ></public-head>
    <form @submit="formSubmit">
      <view class="bank_form module">
				<view class="module-title">{{ i18n.title }}</view>
        <!-- 				<view class="form_item">
					<view class="form_title">{{i18n.formtitle1}}</view>
					<view class="form_input">
						<input type="text" :value="countrytxt" disabled class="active" :placeholder="i18n.formtitle1_txt" placeholder-class="place_txt"
						   name="level" />
					</view>
				</view> -->
        <!-- <view class="form_mune" :class="'active' + muneindex">
          <view
            class="mune_item"
            :class="{ active: muneindex == index }"
            @click="muneclick(index)"
            v-for="(item, index) in munelist"
            :key="index"
            >{{ i18n[item.name] }}</view
          >
        </view> -->
        <view class="head">
          <!-- <text>USDT-TRC20</text> -->
          <text>{{i18n.usdtpay}}</text>
        </view>
        <view class="form_item">
          <view class="form_title">{{ i18n.formtitle2 }}</view>
          <view class="form_input">
            <input
              type="text"
              name="trade_pass"
              :placeholder="i18n.formtitle2_txt"
            />
          </view>
        </view>
        <view class="form_item">
          <view class="form_title">{{ i18n.formtitle3 }}</view>
          <view class="form_input">
            <input
              type="number"
              v-model="amount"
              maxlength="13"
              name="amount"
              :placeholder="i18n.formtitle3_txt"
            />
          </view>
        </view>
        <view class="form_item">
          <view class="form_title">{{i18n.usdtpay}}</view>
          <view class="form_input">
            <input
              type="text"
              v-model="address"
              maxlength="40"
              name="address"
              :placeholder="i18n.formtitle4_txt"
            />
          </view>
        </view>
        <view class="form_item itemflex">
          <view
            >{{ i18n.formprice }}：<text class="color_red">{{
              changeprice.balance | formatPrice
            }}</text></view
          >
          <!-- <view><text @click="buynav">{{i18nyue.hreftxt}}</text></view> -->
        </view>
       <!-- <view class="form_item">
          {{ i18n.priceinfo }}：<text class="color_red">{{
            exchangerate
          }}</text>
        </view>-->
        <view class="forminfo">{{ msginfo }}</view>
        <view class="tip2">
          <image src="/static/images/profile/icon_tishi.png" mode=""></image>
          <text class="t-text1">
            {{i18n.forminfo5}}
          <!--  {{ i18n.forminfo1 }}{{ limit.high_limit }}{{ i18n.company
            }}{{ i18n.forminfo2 }}{{ limit.low_limit }}{{ i18n.company
            }}{{ i18n.forminfo3 }}{{ limit.day_count
            }}{{ i18n.frequency }}-->
          </text >
        </view>
      </view>
      <view class="subbtn">
        <button class="btn" form-type="submit">{{ i18n.formbtn }}</button>
      </view>
    </form>
    <picker-show
      :pickerlist="tasklist"
      @btnconfirm="bindconfirm"
      ref="showpicker"
    ></picker-show>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      muneindex: 0,
      munelist: [{ title: 'USDT', name: 'usdtpay', type: 2 }],
      // munelist:[{title:"银行卡",name:"bankpay",type: 1},{title:"USDT",name:"usdtpay",type: 2}],
      // munelist:[{title:"USDT",name:"account",type:2},{title:"Pix",name:"account",type: 3}],
      isclick: true,
      tasklist: [],
      pickerarr: '',
      countryjson: '',
      countrytxt: '',
      limit: {},
      amount: '',
      address: '',
      msginfo: ''
    }
  },
  computed: {
    ...mapGetters(['changeprice']),
    exchangerate() {
      return (
        Math.floor(
          Number(this.amount) * Number(this.countryjson.exchange_rate) * 100
        ) / 100 || ''
      )
    },
    i18n() {
      return this.$t('withdrawalpay')
    },
    i18nrecord() {
      return this.$t('widthdrawal_record')
    },
    i18nyue() {
      return this.$t('orderyuebao')
    }
  },
  filters: {
    formatCard(val) {
      return val.slice(-4)
    }
  },
  methods: {
    buynav() {
      uni.switchTab({
        url: '/pages/tabbar/yuebao'
      })
    },
    muneclick(e) {
      this.muneindex = e
    },
    bindconfirm(e, listid) {
      this.countrytxt = e
      this.countryjson = this.pickerarr[listid]
    },
    grad_picker() {
      this.$http.requestajx('country', 'get', {}).then((res) => {
        let data = res.result
        this.pickerarr = data
        this.tasklist = data.map((item) => {
          return item.name
        })
        this.$refs.showpicker.picker_open()
      })
    },
    getwithdrawallist() {
      const that = this
      this.$http.requestajx('user_withdrawal/limit', 'get', {}).then((res) => {
        let data = res.result
        that.limit = data
      })
      this.$http.requestajx('country', 'get', {}).then((res) => {
        let data = res.result
        that.pickerarr = data
        that.tasklist = data.map((item) => {
          return item.name
        })
        that.countrytxt = data[8].name
        that.countryjson = data[8]
      })
      this.$http.requestajx('account/info', 'get', {}).then((res) => {
        //个人信息
        that.$store.commit('changeInfo', res.result)
      })
      this.$http
        .requestajx('user_withdrawal/withdravalMsg', 'get', {})
        .then((res) => {
          // console.log(res.result.withdrawal_message)
          that.msginfo = res.result.withdrawal_message
        })
    },
    formSubmit(e) {
      if (this.isclick) {
        this.isclick = false
      } else {
        return this.isclick
      }
      let formdata = e.detail.value,
        that = this
      this.$http
        .requestajx('user_withdrawal', 'post', {
          country_id: this.countryjson.id,
          type: this.munelist[this.muneindex].type,
          trade_pass: formdata.trade_pass,
          amount: Number(formdata.amount),
          address: formdata.address
        })
        .then((res) => {
          // console.log(res);
          that.totat(that.i18nrecord.drawrecord2)
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        })
        .catch((error) => {
          console.log(error)
        })
      setTimeout(() => {
        that.isclick = true
      }, 5000)
    },
    async getUserWithdrawal() {
      let res = await this.$http.userWithdrawal({
        amount: this.amount
      })
      this.totat(res.message)
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    },
    btn_on() {
      uni.navigateTo({
        url: '/pages/profile/withdraw-record'
      })
    }
  },
  onReady() {
    this.getwithdrawallist()
  },
  onShow() {
    this.getwithdrawallist()
  }
}
</script>

<style lang="scss">
.withdrawal {
	 background-color: #f6f5fa;
	 min-height: 100vh;
	 .module {
  margin: 30rpx;
  padding: 25rpx;
  border-radius: 20rpx;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
  background-color: #fff;
  &-title {
    margin-bottom: 20rpx;
    text-align: left;
    font-size: 32rpx;
    font-weight: 800;
  }
}
}
.bank_form {
  padding: 30px 30px 0;
}
.form_item {
  margin-bottom: 22px;
  .form_title {
		margin-top: 30rpx;
    font-size: 30rpx;
    color: #333;
    margin-bottom: 18rpx;
  }
  uni-input {
    height: 50px;
    border-radius: 16px;
    color: #333;
    padding: 0 8px;
		background-color: #f7f8ff;
    &.active {
      background-color: #f5f5f5;
      color: #848080;
      .place_txt {
        color: #848080;
      }
    }
  }
  .place_txt {
    font-size: 30rpx;
    color: #c1c1c1;
  }
  .color_red {
    color: #f62f3d;
    font-size: 28rpx;
  }
  &.itemflex {
    display: flex;
    justify-content: space-between;
  }
  .btn_red {
    color: #080d5d;
    text-decoration: underline;
  }
}
.forminfo {
  font-size: 30upx;
  color: #f62f3d;
}
.account {
  display: flex;
  align-items: center;
  width: 100%;
  height: 94rpx;
  margin-top: 88rpx;
  .account-left {
    width: 70rpx;
    height: 70rpx;
    margin: 0 26rpx 0 46rpx;
  }
  .account-center {
    height: 94rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .c-text1 {
      color: #262626;
      font-size: 32rpx;
    }
    .c-text2 {
      color: #808080;
      font-size: 28rpx;
      margin-top: 26rpx;
    }
  }
  .account-right {
    width: 12rpx;
    height: 22rpx;
    margin-right: 50rpx;
  }
}
.money {
  width: 100%;
  height: 146rpx;
  padding: 0 58rpx;
  margin-top: 76rpx;
  .money-title {
    color: #333333;
    font-size: 28rpx;
    margin-bottom: 26rpx;
  }
  .money-con {
    display: flex;
    height: 88rpx;
    align-items: center;
    border-bottom: 1px solid #ececec;
    .rmb {
      font-size: 66rpx;
      color: #333;
    }
    input {
      font-size: 50rpx;
      color: #333;
    }
  }
}
.tip1 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36rpx;
  padding-left: 58rpx;
  margin-top: 66rpx;
  .t-text1 {
    color: #333333;
    font-size: 26rpx;
  }
  .t-text2 {
    color: #f9103c;
    font-size: 34rpx;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
	font-weight: bold;
}
.tip2 {
  display: flex;
  width: 100%;
  margin-top: 50rpx;
  padding: 0 30rpx 0 58rpx;
  image {
  margin-top:4rpx;
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    margin-right: 12rpx;
  }
  .t-text1 {
    flex: 1;
    color: #b3b3b3;
    font-size: 24rpx;
    line-height: 32rpx;
  }
}
.subbtn {
  padding-top: 50px;
  padding-bottom: 30px;
  .btn {
    margin-top: 0;
    &.active {
      background-color: #eee;
    }
  }
}
.btn {
  margin-top: 125px;
  &.active {
    background-color: #eee;
  }
}
.form_mune {
  border: 4px solid #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 38px;
  margin-top: 30px;
  position: relative;
  background-color: #f5f5f5;
  margin-bottom: 17px;
  .mune_item {
    flex: 1;
    text-align: center;
    position: relative;
    z-index: 2;
    transition-duration: 0.2s;
    color: #a3a3a3;
    &.active {
      color: #fff;
    }
  }
  &::before {
    content: '';
    transition-duration: 0.3s;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: 1;
    background-color: #d8d8d8;
  }
  &.active {
    &::before {
      left: 0;
    }
  }
  &.active1 {
    &::before {
      left: 50%;
    }
  }
  &.active2 {
    &::before {
      left: 66%;
    }
  }
}
</style>
