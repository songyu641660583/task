<template>
  <view class="wrapper">
    <loading-plus v-if="beforeReady"></loading-plus>
    <!-- <my-swiper :bannerData = "bannerData"></my-swiper> -->
    <view class="head_pos">
      <view class="status_bar"></view>
      <view class="head_content">
        <!-- <view class="head_item">
				</view> -->
        <view class="head_item lang">
          <!-- <navigator url="/pages/msg/selectlang" class="head_btn"><text class="alicon icon-zy"></text>{{headbtn}} </navigator> -->
          <view class="lang_flag">
            <label @click="langlist">
              <image :src="$configurl.ossBaseUrl + langflagimg" mode="widthFix"></image>{{ langflagtxt }}
            </label>
            <view class="lang_list" :class="{ active: langshow }">
              <view class="list_after" v-show="langshow">
                <view class="langul" v-if="munelang.length > 0">
                  <view class="lang_flag" v-for="(item, index) in munelang" :key="index"
                    :class="{ active: mune_index === index }">
                    <view @click="munebtn(index)">
                      <image :src="$configurl.ossBaseUrl + item.image" mode="widthFix" lazy-load></image>
                      {{ item.lang }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="head_item logo">
          <image src="/static/images/logo.png" mode="widthFix" @click="logo_btn"></image>
        </view>
        <view class="head_item head_kefu">
          <image src="/static/images/tabbar/kefu.png" mode="widthFix" @click="kefu_btn"></image>
        </view>
        <!-- <view class="head_item">
					<input type="text" confirm-type="search" :placeholder="i18n.headplace" placeholder-style="font-size:15px;color:#a3a3a3" @confirm="headsearch" />
				</view>
				 -->
      </view>
    </view>
    <view class="top-bgd"></view>
    <!-- <view class="swiper swiper_banner" @click="navTo('/pages/profile/help-center')"></view> -->
    <view class="index_banner">
      <view class="banner_content">
        <swiper class="swiper banner_swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000"
          :duration="500" :display-multiple-items="1">
          <swiper-item v-for="(item, index) in bannerlist" :key="index">
            <view class="swiper-item">
              <view class="banner_image">
                <image :src="$configurl.ossBaseUrl + item.image" mode="widthFix"></image>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="vip-classify">
      <view class="classify-item" v-for="(item, index) in memberInfo" :key="index">
        <navigator :url="index === 3 || index === 4
            ? item.navrouter + invitationid
            : item.navrouter
          " hover-class="none" class="item_nav">
          <view class="" style="margin-bottom: 5px; text-align: center">
            <!-- <image :src="item.imgsrc || loadimgsrc" mode=""></image> -->
            <view class="lazyimg">
              <u-image width="50px" height="50px" :src="item.imgsrc" mode="aspectFill" :fade="true" duration="450"
                error-icon="error-square"></u-image>
            </view>
          </view>
          <view class="item_nav uni-ellipsis">
            <text>{{ i18n.munelist[index] }}</text>
          </view>
        </navigator>
      </view>
    </view>
    <view class="team-income">
      <view class="item" @click="navTo('/pages/profile/my-team')">
        <view class="item-text1 uni-ellipsis">{{ i18n.listteam }}</view>
        <view class="item-text2 uni-ellipsis">{{ i18n.listteam1 }}</view>
        <image src="/static/images/index/icon_team.png" class="l-img"></image>
      </view>
      <view class="item">
        <view class="item-text1 uni-ellipsis">{{ i18n.listteam2 }}</view>
        <view class="item-text2 uni-ellipsis">{{
          TodayProfit | formatPrice
        }}</view>
        <image src="/static/images/index/icon_shouyi.png" class="r-img"></image>
      </view>
    </view>
     <view style="margin-bottom: 20rpx;">
        <label class="ttkx">{{ i18n.broadtitle }}<text>{{ i18n.broadtitle1 }}</text></label>
      </view>
	  <!-- <navigator url="/pages/profile/real-auth">{{i8nhead.titlebtn}}</navigator> -->
    <view class="index_broad">
     
      <swiper class="swiper swiper_broad" circular :autoplay="true" :vertical="true" :interval="3000" :duration="500"
        :display-multiple-items="1" disable-touch="true">
        <swiper-item v-for="(item, index) in broadmune" :key="index">
          <view class="swiper-item">
            <view class="broad_item">
              <text class="icon_red">{{ i18n.broadtxt }}</text>
              <text class="uni-ellipsis value"> {{ item }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="task_content" style="margin-top: 15px">
      <view class="task_title">{{ i18n.listtitle }}</view>
      <view class="index_task">
        <view class="task_item" v-for="(item, index) in tasklist" :key="index">
          <navigator class="task_li" :url="'/pages/index/vip?level=' + item.id">
            <image :src="$configurl.ossBaseUrl + item.icon"></image>{{ item.name }}
          </navigator>
        </view>
        <!-- <view class="task_item" v-if="bundle_task > 0">
					<navigator class="task_li" url="/pages/index/vip?level=998">
						<image src="/static/images/index/task.png"></image>
						<view>
							<view>Bundle Task</view>
						</view>
					</navigator>
				</view> -->
      </view>
    </view>
    <!-- <view class="task_content">
			<view class="task_title">任务大厅</view>
			<view class="index_task">
				<view class="c-item" v-for="(item, index) in taskdata" :key="index">
					<view class="item-l">
						<view class="l-img" v-if="item.category"><image :src="$configurl.ossBaseUrl+item.category.icon" mode=""></image></view>
					</view>
					<view class="item-c">
						<view class="c-title">{{ item.title }}</view>
						<view class="c-number">{{i18nhall.numtxt}}： {{ item.remaining_quantity }}</view>
					</view>
					<view class="item-r">
						<view class="tasktype">{{i18nhall.bkge}}：{{item.commission | formatPrice}}</view>
						<view class="tasktype">{{i18nhall.money}}：{{item.task_price | formatPrice}}</view>
					</view>
				</view>
			</view>
		</view> -->
    <view class="indexlist">
      <view class="inlist_title">
        <text v-for="(item, index) in i18n.munetitle" :key="index" :class="{ active: indexlist_in === index }">
          {{ item }}
        </text>
      </view>
      <view class="list_details" v-if="listdetail.length > 0">
        <swiper class="swiper" circular :autoplay="true" :vertical="true" :interval="3000" :duration="500"
          :current="currennum" :display-multiple-items="3" disable-touch="true">
          <swiper-item class="swiper_list" v-for="(item, index) in listdetail" :key="index">
            <block v-if="item.user">
              <view class="swiper-item inlist_info">
                <image :src="item.user.avatar"></image>
                <view class="inlist_item">
                  <view class="item_title">
                    <label>{{ item.user.nickname }} {{ item.user.level }}</label>
                    <text>{{ i18n.singtxt[indexlist_in] }} {{ item.count }}
                      {{ i18n.singbill }}</text>
                  </view>
                  <view class="inlist_num">{{
                    item.amount | formatPrice
                  }}</view>
                </view>
              </view>
            </block>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view style="text-align: center; margin-bottom: 150rpx" v-if="listdetail.length < 1">
      <image src="/static/images/index/pic_zanwu.png" style="width: 450rpx; height: 230rpx; margin-top: 100rpx"></image>
      <view style="color: #615f60; font-size: 28rpx; margin-top: 50rpx">{{
        i18n.listinfo
      }}</view>
    </view>

    <view class="task_content" >
      <view class="task_title">{{ i18n.evaluateTitle }}</view>
      <view class="evaluate-list">
        <view class="evaluate-item" v-for="(item, index) in evaluate_list" :key="index">
          <view class="evaluate-item-name">{{ item.name }}</view>
          <view class="evaluate-item-content">{{ item.content }}</view>
          <view class="star-list">
             <text v-for="(a, starIndex) in 5">
                 <image src="/static/images/index/star.png" mode="widthFix" v-if="item.star >= starIndex + 1"></image>
                 <image src="/static/images/index/star2.png" mode="widthFix" v-else></image>
             </text>
			 <text>{{i18n.good}}</text>
          </view>

      </view>
    </view>
  </view>

  <uni-popup ref="popup">
    <view class="popup-content">
        <image src="/static/images/laba.png" mode="widthFix"></image>

      <view class="popup-content-in">
      <text class="text">{{ defaultData.content }}</text>
      <button class="btn" @click="handleClosePop">{{ i18n.confirm }}</button>
      </view>
    </view>
  </uni-popup>

  <!-- <popu-modal v-model="value" :mData="defaultData.content" :type="type" @cancel="cancel" navMask></popu-modal> -->
  <popu-modal v-model="redvalue" :mData="defaultData_custom" type="custom" navMask>
    <red-modal @cancel="cancel" :defaultData="defaultData_custom"></red-modal>
  </popu-modal>
  
  	<uni-popup ref="kefuPopup" background-color="#fff">
		<view class="popup-content kefu-content" style="background: inherit;">
			<scroll-view scroll-y="true" class="kefu-list">
			  <view class="kefu-item" v-for="(item, index) in kefuList" :key="index" @click="callKefu(item.phone)">
			   
				<view class="item-right">
				  <view class="kefu-name">{{item.name}}</view>
				  <view class="kefu-value">{{item.phone}}</view>
				</view>
				<uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
			  </view>
			</scroll-view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
import loading from '@/utils/mixin/loading.js'
import loadMore from '@/utils/mixin/loadMore.js'
import redModal from '../index/component/red-modal.vue'
let publish_member_data = [
  {
    user_id: 89261,
    amount: 380,
    count: 38,
    user: {
      id: 89261,
      avatar: '/static/images/index/win1.jpg',
      nickname: '****1496'
    }
  },
  {
    user_id: 47382,
    amount: 180,
    count: 18,
    user: {
      id: 47382,
      avatar: '/static/images/index/win2.jpg',
      nickname: '****7283'
    }
  },
  {
    user_id: 61549,
    amount: 460,
    count: 46,
    user: {
      id: 61549,
      avatar: '/static/images/index/win3.jpg',
      nickname: '****5490'
    }
  },
  {
    user_id: 32875,
    amount: 4920,
    count: 82,
    user: {
      id: 32875,
      avatar: '/static/images/index/win4.jpg',
      nickname: '****8752'
    }
  },
  {
    user_id: 94026,
    amount: 80,
    count: 8,
    user: {
      id: 94026,
      avatar: '/static/images/index/win5.jpg',
      nickname: '****0264'
    }
  },
  {
    user_id: 15739,
    amount: 4950,
    count: 15,
    user: {
      id: 15739,
      avatar: '/static/images/index/win6.jpg',
      nickname: '****7391'
    }
  },
  {
    user_id: 28604,
    amount: 552,
    count: 23,
    user: {
      id: 28604,
      avatar: '/static/images/index/win7.jpg',
      nickname: '****6042'
    }
  },
  {
    user_id: 50981,
    amount: 3332,
    count: 28,
    user: {
      id: 50981,
      avatar: '/static/images/index/win8.jpg',
      nickname: '****9815'
    }
  },
  {
    user_id: 74213,
    amount: 1500,
    count: 25,
    user: {
      id: 74213,
      avatar: '/static/images/index/win9.jpg',
      nickname: '****2137'
    }
  },
  {
    user_id: 36528,
    amount: 288,
    count: 12,
    user: {
      id: 36528,
      avatar: '/static/images/index/win10.jpg',
      nickname: '****5283'
    }
  }
]
let complete_member_data = [
  {
    user_id: 89261,
    amount: 380,
    count: 38,
    user: {
      level: 'vip0',
      id: 89261,
      avatar: '/static/images/index/win1.jpg',
      nickname: '****1496'
    }
  },
  {
    user_id: 47382,
    amount: 180,
    count: 18,
    user: {
      level: 'vip0',
      id: 47382,
      avatar: '/static/images/index/win2.jpg',
      nickname: '****7283'
    }
  },
  {
    user_id: 61549,
    amount: 460,
    count: 46,
    user: {
      level: 'vip0',
      id: 61549,
      avatar: '/static/images/index/win3.jpg',
      nickname: '****5490'
    }
  },
  {
    user_id: 32875,
    amount: 4920,
    count: 82,
    user: {
      level: 'vip2',
      id: 32875,
      avatar: '/static/images/index/win4.jpg',
      nickname: '****8752'
    }
  },
  {
    user_id: 94026,
    amount: 80,
    count: 8,
    user: {
      level: 'vip0',
      id: 94026,
      avatar: '/static/images/index/win5.jpg',
      nickname: '****0264'
    }
  },
  {
    user_id: 15739,
    amount: 4950,
    count: 15,
    user: {
      level: 'vip5',
      id: 15739,
      avatar: '/static/images/index/win6.jpg',
      nickname: '****7391'
    }
  },
  {
    user_id: 28604,
    amount: 552,
    count: 23,
    user: {
      level: 'vip1',
      id: 28604,
      avatar: '/static/images/index/win7.jpg',
      nickname: '****6042'
    }
  },
  {
    user_id: 50981,
    amount: 3332,
    count: 28,
    user: {
      level: 'vip3',
      id: 50981,
      avatar: '/static/images/index/win8.jpg',
      nickname: '****9815'
    }
  },
  {
    user_id: 74213,
    amount: 1500,
    count: 25,
    user: {
      level: 'vip2',
      id: 74213,
      avatar: '/static/images/index/win9.jpg',
      nickname: '****2137'
    }
  },
  {
    user_id: 36528,
    amount: 288,
    count: 12,
    user: {
      level: 'vip1',
      id: 36528,
      avatar: '/static/images/index/win10.jpg',
      nickname: '****5283'
    }
  }
]

let evaluate_list = [
  {
    name: '*****7647',
    content: 'Gano dinero todos los días, me siento muy bien. Gracias a JCRN.',
    star: 5,
  },
   {
    name: '*****1351',
    content: 'He invitado a muchos amigos y ahora el monto de mis tareas diarias ha aumentado. Jaja.',
    star: 5,
  },
    {
    name: '*****2687',
    content: 'Gracias a JCRN, ahora tengo menos estrés en mi vida.',
    star: 4,
  },
    {
    name: '*****3671',
    content: '4.Ahora gano dinero sin depender de nadie, y vivo cada día con tranquilidad.',
    star: 4,
  },
    {
    name: '*****7812',
    content: '5.Este trabajo es ideal para flojos como yo, porque salgo de fiesta por la noche y no me puedo levantar en la mañana.',
    star: 4,
  },
    { 
    name: '*****2907',
    content: 'Por fin, con mi esfuerzo, pude comprar el carro que tanto quería.',
    star: 4,
  },
    {
    name: '*****7019',
    content: 'I got my girlfriend a gift she really liked for her birthday. I like jcrn',
    star: 4,
  },
    {
    name: '*****6612',
    content: "I'm planning to quit my job and work full-time at JCRN.",
    star: 4,
  },
]

export default {
  mixins: [loading, loadMore],
  components: { redModal },
  data() {
    return {
	  kefuList: [
		  {
			  name: 'JCRN-Mattew',
			  phone: '447350248091'
		  }
	  ],
      timeintr: null,
      value: false,
      redvalue: false,
      type: 'custom',
      defaultData: { content: '这是一个模态弹窗', cancelText: 'cancel' },
      defaultData_custom: {},
      langflagimg: '',
      langflagtxt: '',
      langshow: false,
      mune_index: 0,
      munelang: [],
      headbtn: '',
      bannerData: [],
      TodayProfit: 0,
      invitationid: '',
      currennum: 0,
      evaluate_list,
      memberInfo: [
        {
          imgsrc: '/static/images/tabbar/1.png',
          navrouter: '/pages/profile/help-center'
        },
        {
          imgsrc: '/static/images/tabbar/2.png',
          navrouter: '/pages/profile/wallet'
        },
        {
          imgsrc: '/static/images/tabbar/3.png',
          navrouter: '/pages/tabbar/notice'
        },
        {
          imgsrc: '/static/images/tabbar/4.png',
          navrouter: '/pages/profile/lucky?id='
        },
        {
          imgsrc: '/static/images/tabbar/5.png',
          navrouter: '/pages/profile/invitation?id='
        }
      ],
      bannerlist: [],
      broadmune: [],
      tasklist: [],
      taskdata: [],
      indexlist_in: 0,
      indexlist: ['会员榜单', '商家榜单'],
      listdetail: [],
      jsondetail: []
    }
  },
  computed: {
    i18n() {
      return this.$t('index')
    },
    i18nhall() {
      return this.$t('memberhall')
    },
    i8nhead() {
      return this.$t('pagesprofile')
    },
    tabbartxt() {
      return this.$t('tabbarfin')
    },
  },
  methods: {
	async getKefuList(){
		let res = await this.$http.getOtherSettings({
			group: 'other'
		})
		let kefuString = res.result.filter(item => (item.name === 'customer_service'))[0]
		kefuString = kefuString.value ? kefuString.value : ''
		if(kefuString) {
			let kefuList = kefuString.split('\n')
			if(kefuList.length) {
				this.kefuList = kefuList.map(item => {
					let kefuItem = item.split('@')
					return {
						name: kefuItem[0],
						phone: kefuItem[1]
					}
				})
			}
		}
		
	},
   
	handleClosePop() {
      this.$refs.popup.close()
    },
    toggle() {
      this.$refs.popup.open('center')
    },
    navTo(url) {
      uni.navigateTo({ url })
    },
    cancel() {
      this.redvalue = false
    },
    async getData() {
      let res = await this.$http.task()
      if (this.page === 1) {
        this.pageData = res.result
      } else {
        this.pageData.data.push(...res.result.data)
      }
    },
    headsearch(e) {
      uni.navigateTo({
        url: '/pages/index/searchList?keywords=' + e.text
      })
    },
   
    loadjson() {
      let that = this
      this.$http
        .requestajx('index', 'get', {})
        .then((res) => {
          // console.log(res);
          let data = res.result
          that.invitationid = data.id
          that.TodayProfit = data.today_profit
          // that.memberInfo = data.level.splice(0, 3);
          that.broadmune = that.$t('index').user_level_notify
          that.tasklist = data.task_category
          that.jsondetail = [
            complete_member_data,
            publish_member_data
          ]

          that.listdetail = complete_member_data
          // that.listdetail = data.complete_member_data || ''
        })
        .catch((error) => {
          console.log('错误重启')
        })
      this.$http
        .requestajx('banner', 'get', {})
        .then((res) => {
          that.bannerlist = res.result
        })
        .catch((error) => {
          console.log('错误重启')
        })
    },
    homepopu() {
      const that = this
      const languageCode = uni.getStorageSync('languageCode');
      this.$http.requestajx('index/homePopUp', 'get', {locale: languageCode}).then((res) => {
        that.defaultData.content = res.result
        // this.tabMask = new TabMask({opacity:0.6})
        that.value = true
        this.toggle()
      })
    },
    munetitle_btn(e) {
      this.indexlist_in = e
      this.listdetail = this.jsondetail[e]
      this.currennum = this.currennum - 3
    },
    langlist() {
      this.langshow = !this.langshow
    },
    munebtn(e) {
      var that = this

      this.mune_index = e
     
      uni.setStorage({
        key: 'locale_key',
        data: e,
        success: function () {
          var edition = [
            'zh',
            'en',
            'ru',
            'ph',
            'kr',
            'my',
            'pt',
            'tr',
            'es',
            'in',
            'idsa',
            'vn',
            'th',
            'sa'
          ]
          
          that.$i18n.locale = edition[parseInt(e)]
          that.$http
            .requestajx('country', 'get', {})
            .then((res) => {
              let data = res.result

              that.loadjson()
              that.munelang = data
              if(that.munelang.length > 14) {
                that.munelang.length = 14
              }
              that.langflagimg = data[e].image
              that.langflagtxt = data[e].lang
              that.langshow = false
              
						  uni.setStorageSync('languageCode', res.result[e].code);
              setTimeout(() => {
                 that.tabbartxt.forEach(function (item, index) {
                    uni.setTabBarItem({ index: index, text: item })
                  })
              }, 500)

            })
            .catch((error) => {
              console.log('错误重启')
            })
        }
      })
    },
    logo_btn() {
      uni.navigateTo({
        url: '/pages/profile/help-center'
      })
    },
	callKefu(phone){
		window.open('https://wa.me/' + phone, '_blank')
	},
    async kefu_btn() {
		this.$refs.kefuPopup.open('bottom')
      // let res = await this.$http.customerUrl()
      // // #ifdef APP-PLUS
      // plus.runtime.openURL(encodeURI(res.result))
      // // #endif
      // // #ifdef H5
      // setTimeout(function () {
      //   window.open(res.result, '_blank')
      //   // https://whatsapp.com

      // }, 200)
      // #endif
    },
    locale_edition() {
      var that = this
      uni.getStorage({
        key: 'locale_key',
        success: function (res) {
          // console.log(res);
          let btntxt = [
            '简体中文',
            'English',
            'русский язык',
            'Tagalog',
            '한국어',
            'Malasia',
            'Português',
            'Türkçe',
            'Español',
            'हिंदी',
            'Indonesia',
            'Việt',
            'ภาษาไทย',
            'عربي ،'
          ]
          that.headbtn = btntxt[parseInt(res.data)]
          that.tabbartxt.map(function (item, index) {
            uni.setTabBarItem({ index: index, text: item })
          })
          uni.setStorageSync('ajaxmess', that.$t('ajaxmess'))
        }
      })
    },
    
    async loadmsg() {
      if (uni.getStorageSync('userToken') === '') {
        clearInterval(this.timeintr)
        this.timeintr = null
      } else {
        const that = this
        let res = await this.$http.userNotify({
          type: 1,
          page: 1
        })
        let msgdata = res.result.data,
          num = 0
        for (const item of msgdata) {
          if (item.is_read === 0) {
            num++
          }
        }
        this.$store.commit('msgnum', num)
        if (num > 0) {
          uni.setTabBarBadge({
            index: 4,
            text: '' + num
          })
        } else {
          uni.removeTabBarBadge({
            index: 4
          })
        }
      }
    }
  },
  onShow() {
    // this.loadjson();
    this.munebtn(uni.getStorageSync('locale_key'))
    const that = this
    // this.timeintr = setInterval(function () {
    //   that.loadmsg()
    // }, 5000)
  },
  onLoad() {
	this.getKefuList()
    this.loadjson()
    this.homepopu()
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: youshe;
  src: url('~@/static/font/YouSheBiaoTiHei-2.ttf');
}

@font-face {
  font-family: headicon;
  src: url('~@/static/font/iconfont1.ttf');
}
.kefu-content {
	background: inherit;
	width: 100% !important;
	padding: 30rpx !important;
	margin: 0rpx !important;
	height: 40vh !important;
	/* 头部 */
	.kefu-header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 24rpx 30rpx;
	  background-color: #f8f8f8;
	  border-bottom: 1rpx solid #eee;
	}
	
	.kefu-header .title {
	  font-size: 32rpx;
	  font-weight: bold;
	  color: #333;
	}
	
	/* 客服列表 */
	.kefu-list {
	  max-height: 32vh;
	  padding: 0 20rpx;
	}
	
	.kefu-item {
	  display: flex;
	  align-items: center;
	  padding: 24rpx 10rpx;
	  border-bottom: 1rpx solid #f5f5f5;
	}
	
	.kefu-item:last-child {
	  border-bottom: none;
	}
	
	.kefu-avatar {
	  width: 80rpx;
	  height: 80rpx;
	  border-radius: 50%;
	  background-color: #f0f0f0;
	}
	
	.item-right {
	  flex: 1;
	}
	
	.kefu-name {
	  font-size: 30rpx;
	  color: #222;
	  margin-bottom: 10rpx;
	  font-weight: 600;
	}
	
	.kefu-value {
	  font-size: 26rpx;
	  color: #666;
	}
	
	/* 点击效果 */
	.kefu-item:active {
	  background-color: #f9f9f9;
	}
	// .kefu-item {
	// 	display: flex;
	// 	align-items: center;
	// 	font-size: 30rpx;
	// 	margin-bottom: 20rpx;
	// 	.kefu-name {
			
	// 	}
		
	// }
}

.alicon {
  font-family: 'headicon' !important;
  font-size: 27px;
  font-style: normal;
}

.icon-zy::before {
  content: '\e620';
}

.head_pos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: rgb(28, 26, 78);
  color: #fff;

  .head_content {
    padding-left: 20px;
    padding-right: 15px;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    height: 30px;
    border-radius: 30px;
    background-color: #ffffff;
    padding: 0 15px;
    text-align: center;
    color: #333333;
    box-sizing: border-box;
  }

  .head_btn {
    height: 45px;
    line-height: 45px;
    padding-left: 15px;

    .icon-zy {
      font-size: 16px;
      margin-right: 5px;
    }
  }

  .head_item {
    &.logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100rpx;
      z-index: 2;
    }
  }

  .head_item:nth-of-type(1) {
    flex: 1;
  }

  .head_kefu {
    padding-left: 15px;
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

.lang_flag {
  text-align: left;
  position: relative;

  image {
    width: 25px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 3px;
  }
}

.popup-content {
  position: relative;
  width: 80vw;
  min-height: 40vh;
  background-color: #fff;
  margin: 0 60rpx;
  padding: 150rpx 30rpx 30rpx;
  background: linear-gradient(180deg, #d0d8ff, #fff);
  border-radius: 20rpx;
  &-in {
    display: flex;
    flex-direction: column;
    max-height: 60vh;

  }

  .btn {
    flex: none;
    margin-top: 80rpx;
    width: 300rpx;
  }
  .text{
    flex: auto;
    overflow-y: auto;

  }

  image {
    position: absolute;
    right: 20rpx;
    top: -80rpx;
    width: 200rpx;
  }

  .text {
    font-weight: 400;
    font-size: 32rpx;
    color: #666;
    line-height: 50rpx;
  }
}

.lang_list {
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 99;
  transition: all 0.3s ease-in;
  opacity: 0;

  .list_after::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10px;
    margin-top: -10px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #2e4f79 transparent;
  }

  .langul {
    background-color: #2e4f79;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    overflow: hidden;
  }

  .lang_flag {
    text-align: left;
    color: #ffffff;
    width: 50%;
    padding: 10px;

    &.active {
      background-color: #2d486a;
    }
  }

  &.active {
    opacity: 1;
  }
}
   .ttkx {
    padding: 0 30rpx;
        font-size: 34rpx;
        margin-right: 5px;
        font-family: 'youshe';
        color: #333333;

        text {
          color: #fa5c5b;
        }
      }
.index_broad {
  padding: 0 10px;
  height: 30px;


  .swiper_broad {
    border-radius: 10px;
    box-shadow: 0px 3px 16px 0px rgba(0, 35, 68, 0.14);
    height: inherit;
    padding: 0 15px;

    .swiper-item {
      height: inherit;
    }

    .broad_item {
      height: inherit;
      font-size: 26rpx;
      color: #7e7e7e;
      display: flex;
      align-items: center;
      width: 100%;

     

      .uni-ellipsis {
        font-size: 12px;
      }

      .icon_red {
        background-color: #fa5c5b;
        border-radius: 10px;
        padding: 2px 8px;
        color: #ffffff;
        margin-right: 10px;
        font-size: 12px;
      }
    }
  }
}

.task_title {
  padding: 8px 0 2px 18px;
  font-size: 36rpx;
  color: #1c2664;
}

.index_task {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;

  .task_item {
    padding: 8px;
    width: 50%;

    .task_li {
      box-shadow: 0 3px 17px 0 rgba(0, 35, 68, 0.14);
      border-radius: 5px;
      padding: 40rpx 0 40rpx 50rpx;
      align-items: center;
      display: flex;
    }

    image {
      width: 40px;
      height: 40px;
      margin-right: 18px;
    }
  }
}

.indexlist {
  .inlist_title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 30px 10px;
    text-align: center;

    text {
      font-size: 36rpx;
      color: #7e7e7e;
      position: relative;

      &.active {
        color: #1b2664;

        &::before {
          content: '';
          position: absolute;
          bottom: -15px;
          left: calc(50% - 10px);
          width: 20px;
          border: 2px solid #1b2664;
          border-radius: 20px;
        }
      }
    }
  }
}
.evaluate-list {
  padding: 0 20rpx 80rpx;
  .evaluate-item {
  margin-top: 30rpx;
  padding: 0 20rpx 30rpx;
 
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.12);
    &-name {
      line-height: 80rpx;
      border-bottom: 1px solid #ccc;
    }
    &-content { 
      padding: 25rpx 0;
      line-height: 30rpx;
    }
    .star-list {
      display: flex;
      align-items: center;
      image {
        width: 30rpx;
        margin-right: 8rpx;
      }
    }
  }
}

.list_details {
  padding: 0 20px;
  height: 213px;
  overflow: hidden;
  margin-bottom: 50px;

  .swiper {
    height: inherit;
    margin-top: -1px;
  }

  .inlist_info {
    position: relative;
    padding: 10px 0 12px;
    border-top: 1px solid #eeeeee;

    image {
      width: 47px;
      height: 47px;
      border-radius: 50%;
    }

    .inlist_item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding-left: 63px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26rpx;

      label {
        width: 100%;
        color: #1c2664;
        display: inline-block;
        margin-bottom: 10px;
      }

      text {
        color: #7e7e7e;
      }
    }

    .inlist_num {
      color: #fa4a80;
    }
  }
}

.wrapper {
  padding-bottom: 40px;
  background-color: #ffffff;
}

.top-bgd {
  position: relative;
  top: -50rpx;
  // z-index: 1;
  width: 100%;
  height: calc(var(--status-bar-height) + 115px);
  // background: url(/static/images/index/pic_beijing.png) no-repeat;
  // background-size: 100% 100%;
  // background-position: 0 0;
  background-color: #1c1a4e;
}

.index_banner {
  margin-top: -120rpx;
  height: 480rpx;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  .banner_swiper {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .banner_content {
    overflow: hidden;
    width: 100%;
    height: inherit;
    padding-top: 30rpx;
    background: #1c1a4e;

    .banner_image,
    .swiper-item {
      height: 100%;
      background: #1c1a4e;
    }
    .banner_image {
      image {
        // width: 120%;
        // margin-left: -10%;
      // padding-top: 20%;
      //  height: 120% !important;
      }
    }

    image,
    img {
      display: block;
      width: 100%;
      border-radius: 10px;
    }
  }
}

.vip-classify {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 140rpx;
  margin: 50rpx 0 55rpx 0;
  padding: 0 1px;

  .classify-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 140rpx;

    .item_nav {
      width: 100%;
      text-align: center;
    }

    image {
      width: 90rpx;
      height: 90rpx;
    }

    .lazyimg {
      width: 90rpx;
      display: inline-block;
    }

    text {
      color: #1b2664;
      font-size: 26rpx;
    }
  }
}

.share-btn {
  position: fixed;
  right: 0;
  top: 30vh;
  z-index: 9;

  image {
    width: 60rpx;
    height: 60rpx;
  }
}

.team-income {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 44rpx;
  margin-bottom: 36rpx;
  flex-wrap: wrap;

  .item {
    position: relative;
    width: 310rpx;
    height: 172rpx;
    background-color: #1b2664;
    border-radius: 40rpx;
    margin-bottom: 10px;
    padding: 44rpx 10px 0 34rpx;
    color: #fff;

    .item-text1 {
      font-size: 34rpx;
      font-weight: bold;
    }

    .item-text2 {
      margin-top: 26rpx;
      font-size: 20rpx;
      width: 70px;
    }

    .l-img {
      position: absolute;
      bottom: 30rpx;
      right: 18rpx;
      width: 98rpx;
      height: 50rpx;
    }

    .r-img {
      position: absolute;
      bottom: 30rpx;
      right: 26rpx;
      width: 78rpx;
      height: 58rpx;
    }
  }
}

.c-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 15px;
  background-color: #ffffff;
  box-shadow: 0px 6rpx 32rpx 0px rgba(0, 35, 68, 0.14);
  border-radius: 34rpx;

  .item-l {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;

    .l-img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 105rpx;
      height: 105rpx;
      border-radius: 50%;
      background-color: #ebebf3;

      image {
        width: 40rpx;
        height: 50rpx;
      }
    }
  }

  .item-c {
    flex: 4;

    .c-title {
      color: #1a2564;
      line-height: 36rpx;
      font-size: 26rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .c-tag {
      display: flex;
      align-items: flex-end;
      margin: 10rpx 0;

      image {
        width: 19rpx;
        height: 19rpx;
        margin-right: 12rpx;
      }

      text {
        color: #ffbd55;
        font-size: 18rpx;
      }
    }

    .c-number {
      color: #1a2564;
      font-size: 18rpx;
      margin-top: 20rpx;
    }
  }

  .item-r {
    .tasktype {
      padding: 3px 10px 3px 0;
      color: #fa4a80;
      font-size: 13px;
    }
  }
}

.empty {
  text-align: center;
  margin-top: 450rpx;
  color: rgb(119, 119, 119);
  font-size: 30rpx;
}
</style>
