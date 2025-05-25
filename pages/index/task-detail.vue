<template>
  <view>
    <loading-plus v-if="isLoading"></loading-plus>
    <public-head
      :headshow="false"
      title=""
      backcolor="transparent"
      color_icon="#fff"
    ></public-head>
    <view class="task_banner">
      <image
        :src="$configurl.ossBaseUrl + task_detail.category.banner"
        mode="widthFix"
      ></image>
    </view>
    <view class="content">
      <view class="title_info" v-if="task_detail.commission > 0">
        <view class="info_top">
          {{ i18n.commission }}：<text class="color_pink">{{
            task_detail.commission | formatPrice
          }}</text>
        </view>
        <view class="info_top">
          {{ i18n.taskmoney }}：<text class="color_orange">{{
            task_detail.task_price | formatPrice
          }}</text>
        </view>
      </view>
      <view class="c-title" v-else>{{ task_detail.title }}</view>
      <view class="c-des">
        <view class="task_des">
          {{ task_detail.description }}
        </view>
        <view class="task_type">
          {{ i18n.halltask[task_detail.task_type] }}
        </view>
      </view>
      <view class="c-content">
        <view class="c-left">
          <view class="list1"
            >{{ task_detail.user_complete_count }}{{ i18n.detailtxt }}</view
          >
          <view class="list2">
            <text
              >{{ i18n.detailmony[0] }}{{ task_detail.num
              }}{{ i18n.detailmony[1] }}</text
            >
            <text>48{{ i18n.dateinfo }}</text>
          </view>
        </view>
        <view class="c-right">
          {{ task_detail.amount | formatPrice }}
        </view>
      </view>
      <!-- <view class="c-tip" @click="navTo('/pages/index/video_detail')">
				<view class="tip-l">{{i18n.detailinfo}}</view>
				<view class="tip-r">
					<view class="r-text uni-ellipsis-2">{{i18n.detailbtn}}</view>
					<image src="/static/images/index/icon_fanhui.png" mode=""></image>
				</view>
			</view> -->
      <view class="c-select">
        <view
          class="select-item uni-ellipsis"
          v-for="(item, index) in i18n.detaillist"
          :key="index"
        >
          <image src="/static/images/index/icon_gouxuan.png" mode=""></image>
          <text>{{ item }}</text>
        </view>
      </view>
    </view>
    <view class="shop-info" >
      <view class="list2-name">{{ task_detail.url }}</view>
      <view class="list2-btn">
        <view class="btn2" @click="toNext" v-if="this.type == '0'">{{ i18n.detailhref }}</view>
      </view>
    </view>
    <view class="shop_list">
      <view class="list_title">
        <view class="title_head">{{ i18ninfo.listhead[0].title }}</view>
        <text>{{ i18ninfo.listhead[0].txt }}</text>
      </view>
      <view class="list_mume">
        <view
          class="mune_item"
          v-for="(item, index) in i18ninfo.listtxt"
          :key="index"
        >
          <image src="/static/images/index/taskd1.png"></image>
          <view class="item_title">{{ item.title }}</view>
          <view class="item_text">{{ item.txt1 }}</view>
        </view>
      </view>
    </view>
    <view class="shop_list">
      <view class="list_title">
        <view class="title_head">{{ i18ninfo.listhead[1].title }}</view>
        <text>{{ i18ninfo.listhead[1].txt }}</text>
      </view>
      <view class="table_content">
        <view
          class="munetable"
          v-for="(item, index) in i18ninfo.munetable"
          :key="index"
        >
          <view class="table_item munetableleft">
            <text>{{ item.title }}</text>
          </view>
          <view class="table_item munetableright">
            <view class="rtitle"
              ><text class="title_icon">{{ item.txt1 }}</text></view
            >
            <view class="rtitle" :class="{ active: index === 0 }"
              >{{ i18n.taskcomplete }}{{ i18n.halltask[task_detail.task_type]
              }}<label class="icon" v-if="index === 0"
                ><text class="icon_text"></text
              ></label>
            </view>
          </view>
        </view>
      </view>
      <view class="table_info">{{ i18ninfo.table_info }}</view>
    </view>
    <view class="show-img">
      <!-- <view class="title">
				<view class="title-text">任务步骤</view>
				<view class="title-text">审核样例</view>
			</view> -->
      <!-- <image src="../../static/images/index/bgd.png" mode="widthFix"></image> -->
    </view>
    <view class="receive-btn" @click="receive" v-if="!this.type">{{
      i18n.detailsub
    }}</view>
		<view class="receive-btn" @click="toSubmit" v-if="this.type == '0'">{{
      i18n.detailhref2
    }}</view>
    <!-- <view class="receive-btn"  @click="toNext" v-if="this.type == '0'">{{
      i18n.detailhref
    }}</view> -->

            <!-- <view class="btn2" @click="toNext" v-if="this.type == '0'">{{ i18n.detailhref }}</view> -->
  </view>
</template>

<script>
import config from '@/service/config.js'
export default {
  data() {
    return {
      isclick: true,
      id: '',
      listhead: [
        { title: '任务步骤', txt: '安卓详细步骤如下所示，轻松完成任务' },
        { title: '操作流程', txt: '苹果版操作如下' }
      ],
      listtxt: [
        {
          title: '如何操作',
          txt1: '第一步在任务详情领取任务，点击打开按钮',
          txt2: '点击打开按钮'
        },
        {
          title: '选择任务',
          txt1: '点击打开之后右下角打开抖音抖音打开后点击赞',
          txt2: ''
        },
        { title: '操作任务', txt1: '完成任务（点赞）并截图', txt2: '' },
        { title: '完成任务', txt1: '按照指示提交任务并上传任务完成', txt2: '' }
      ],
      munetable: [
        {
          title: '点击打开抖音任务按钮，点击右下角',
          txt1: '领取任务',
          txt2: '完成点赞任务（点赞）'
        },
        {
          title: '按照指示提交任务，提交任务',
          txt1: '截图留作凭证',
          txt2: '上传凭证'
        }
      ],
      table_info: '任务完成',
      task_detail: {
        category: {
          banner: ''
        }
      },
      isLoading: true,
      type: '',
      user_task_id: 0
    }
  },
  methods: {
    navTo(url) {
      uni.navigateTo({ url })
    },
    async getDetail() {
      let res = await this.$http.taskDetail(this.id)
      this.task_detail = res.result
    },
    toSubmit() {
      uni.navigateTo({
        url:
          '/pages/profile/submit-task?name=' +
          this.task_detail.title +
          '&amount=' +
          this.task_detail.amount +
          '&id=' +
          this.user_task_id
      })
    },
    toNext() {
      // #ifdef APP-PLUS
      plus.runtime.openWeb(this.task_detail.url)
      // #endif
      // #ifdef H5
      window.open(this.task_detail.url)
      // #endif
    },
    async receive() {
      if (this.isclick) {
        this.isclick = false
      } else {
        return this.isclick
      }
      let res = await this.$http.taskReceive({
        id: this.task_detail.id,
        category_id: this.task_detail.category_id
      })
      this.type = '0'
      this.totat(this.i18n.modesucc)
    }
  },
  computed: {
    banner() {
      return this.task_detail.category.banner === ''
        ? ''
        : config.ossBaseUrl + this.task_detail.category.banner
    },
    i18n() {
      return this.$t('memberhall')
    },
    i18ninfo() {
      return this.$t('taskdetail')
    }
  },
  onShow() {
    this.getDetail()
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  },
  onLoad(options) {
    this.id = options.id
    this.type = options.type
    this.user_task_id = options.user_task_id
  }
}
</script>

<style lang="scss">
$colororgin: #f39800;
$colorgray: #a2a2a2;
.banner {
  width: 100%;
  height: 418rpx;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header {
    position: absolute;
    width: 100%;
    height: 128rpx;
    .back {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      width: 150rpx;
      height: 100%;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-left: 40rpx;
      }
    }
  }
}
.c-des {
  padding-top: 10px;
  padding-right: 15px;
  color: #807f7f;
  font-size: 30rpx;
  display: flex;
  justify-content: space-between;
  .task_type {
    color: #f325f3;
    font-size: 16px;
  }
  .task_des {
    word-break: break-all;
    padding-right: 20px;
  }
}
.shop_list {
  & + .shop_list {
    border-top: 5px solid #f6f7f7;
  }
}
.list_title {
  text-align: center;
  padding: 20px 0;
  .title_head {
    font-size: 30rpx;
    color: $colororgin;
    margin-bottom: 10px;
  }
  text {
    font-size: 24rpx;
    color: $colorgray;
  }
}
.list_mume {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .mune_item {
    flex: 0 0 50%;
    text-align: center;
    padding: 0 20px;
    margin-bottom: 15px;
    image {
      width: 60px;
      height: 60px;
    }
    .item_title {
      color: $colororgin;
      font-size: 28rpx;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .item_text {
      font-size: 22rpx;
      color: $colorgray;
      line-height: 18px;
    }
  }
}
.table_content {
  padding-top: 10px;
  .munetable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    color: $colorgray;
    .table_item {
      width: 50%;
    }
    .munetableleft {
      position: relative;
      padding: 0 30px;
      text-align: center;
      line-height: 20px;
      &::after {
        content: '';
        width: 50px;
        height: 1px;
        border-top: 1px solid $colorgray;
        position: absolute;
        right: -4px;
        bottom: 17px;
      }
    }
    .munetableright {
      padding-left: 20px;
      .rtitle {
        position: relative;
        &::after {
          content: '';
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 2px solid $colorgray;
          position: absolute;
          left: -25px;
          top: -3px;
        }
        & + .rtitle {
          margin-top: 35px;
          &::before {
            content: '';
            width: 1px;
            height: 28px;
            position: absolute;
            top: -31px;
            left: -16px;
            border-left: 2px dotted $colorgray;
          }
        }
        &.active {
          .icon {
            border: 2px solid $colororgin;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            line-height: 15px;
            position: absolute;
            left: -25px;
            top: -3px;
            .icon_text {
              border-radius: 50%;
              width: 7px;
              height: 7px;
              background-color: $colororgin;
              display: inline-block;
            }
          }
          &::after {
            display: none;
          }
        }
        .title_icon::before {
          content: '';
          width: 1px;
          height: 28px;
          position: absolute;
          top: -31px;
          left: -16px;
          border-left: 2px dotted $colorgray;
        }
      }
    }
    & + .munetable {
      margin-top: 35px;
      .rtitle {
        &::before {
          content: '';
          width: 1px;
          height: 28px;
          position: absolute;
          top: -31px;
          left: -16px;
          border-left: 2px dotted $colorgray;
        }
      }
    }
  }
}
.table_info {
  text-align: center;
  color: $colororgin;
  padding-top: 30px;
}
.content {
  width: 100%;
  border-bottom: 10rpx solid #f5f7fd;
  padding: 30rpx 0 30rpx 40rpx;
  .c-title {
    width: 500rpx;
    font-size: 34rpx;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title_info {
    font-size: 15px;
    color: #333;
    .info_top {
      margin-bottom: 10px;
    }
    .color_pink {
      color: #f325f3;
    }
    .color_orange {
      color: #ffa006;
    }
  }
  .c-content {
    display: flex;
    width: 100%;
    height: 88rpx;
    margin-top: 26rpx;
    .c-left {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-right: 1px solid #d5d7d8;
      color: #898989;
      font-size: 24rpx;
      .list2 {
        margin-top: 24rpx;
      }
    }
    .c-right {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 204rpx;
      height: 100%;
      color: #ffa006;
      font-size: 36rpx;
    }
  }
  .c-tip {
    display: flex;
    width: 672rpx;
    height: 72rpx;
    border-radius: 14rpx;
    overflow: hidden;
    margin-top: 42rpx;
    .tip-l {
      flex: 1;
      background-color: #ebe2d1;
      color: #000201;
      font-size: 24rpx;
      line-height: 72rpx;
      padding-left: 22rpx;
    }
    .tip-r {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 97rpx;
      height: 72rpx;
      background-color: #3d3938;
      .r-text {
        width: 60rpx;
        font-size: 24rpx;
        color: #b59b6f;
      }
      image {
        width: 10rpx;
        height: 18rpx;
      }
    }
  }
  .c-select {
    display: flex;
    margin-top: 30rpx;
    .select-item {
      flex: 1;
      image {
        width: 22rpx;
        height: 22rpx;
        margin-right: 6rpx;
      }
      text {
        font-size: 22rpx;
        color: #8f8f8f;
      }
    }
  }
}
.shop-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 216rpx;
  border-bottom: 10rpx solid #f5f7fd;

  .list2-name {
    width: 380rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    background-color: #f5f7fd;
    border-radius: 20rpx;
    margin-left: 40rpx;
    color: #8a8a8a;
    font-size: 22rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list2-btn {
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    margin-right: 40rpx;
    .btn2 {
      width: 197rpx;
      height: 62rpx;
      border-radius: 31rpx;
      line-height: 62rpx;
      text-align: center;
      background-color: #1b2664;
      color: #fff;
    }
  }
}
.show-img {
  border-top: 40rpx solid #fff;
  border-bottom: 120rpx solid #fff;
}
.receive-btn {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 96rpx;
  background-color: #1b2664;
  color: #fff;
  font-size: 32rpx;
  &.active {
    background-color: #eeeeee;
  }
}
</style>
