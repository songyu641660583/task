<template>
	<view class="wrapper">
		<loading-plus v-if="beforeReady"></loading-plus>
		<!-- <my-swiper :bannerData = "bannerData"></my-swiper> -->
		<view class="head_pos">
			<view class="status_bar"></view>
			<view class="head_content">
				<!-- <view class="head_item">
					<navigator url="/pages/profile/help-center">{{i8nhead.titlebtn}}</navigator>
				</view> -->
				<view class="head_item">
					<!-- <navigator url="/pages/msg/selectlang" class="head_btn"><text class="alicon icon-zy"></text>{{headbtn}} </navigator> -->
					<view class="lang_flag">
						<label @click="langlist">
							<image :src="$configurl.ossBaseUrl+langflagimg" mode="widthFix"></image>{{langflagtxt}}
						</label>
						<view class="lang_list" :class="{active:langshow}">
							<view class="list_after" v-show="langshow">
								<view class="langul" v-if="munelang.length > 0">
									<view class="lang_flag" v-for="(item,index) in munelang" :key="index" :class="{active:mune_index === index}">
									
										<view @click="munebtn(index)">
											<image :src="$configurl.ossBaseUrl+item.image" mode="widthFix" lazy-load></image> {{item.lang}}
										</view> 
									</view>
								</view>
							</view>
						</view>
					</view>
					
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
				<swiper class="swiper banner_swiper" circular :indicator-dots="true"
				 :autoplay="true" :interval="3000" :duration="500" :display-multiple-items="1" disable-touch="true">
					<swiper-item v-for="(item,index) in bannerlist" :key="index">
						<view class="swiper-item">
							<view class="banner_image">
								<image :src="$configurl.ossBaseUrl+item.image" mode="widthFix"></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="vip-classify">
			<view class="classify-item" v-for="(item, index) in memberInfo" :key="index">
				<navigator :url="((index===3 || index === 4) ? item.navrouter+invitationid : item.navrouter)" hover-class="none" class="item_nav">
					<view class="" style="margin-bottom: 5px;text-align: center;">
						<!-- <image :src="item.imgsrc || loadimgsrc" mode=""></image> -->
						<view class="lazyimg">
							<u-image width="50px" height="50px" :src="item.imgsrc" mode="aspectFill" :fade="true" duration="450" error-icon="error-square"></u-image>
						</view>
					</view>
					<view class="item_nav uni-ellipsis">
						<text>{{i18n.munelist[index]}}</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="team-income">
			<view class="item" @click="navTo('/pages/profile/my-team')">
				<view class="item-text1 uni-ellipsis">{{i18n.listteam}}</view>
				<view class="item-text2 uni-ellipsis">{{i18n.listteam1}}</view>
				<image src="/static/images/index/icon_team.png" class="l-img"></image>
			</view>
			<view class="item">
				<view class="item-text1 uni-ellipsis">{{i18n.listteam2}}</view>
				<view class="item-text2 uni-ellipsis">{{ TodayProfit | formatPrice}}</view>
				<image src="/static/images/index/icon_shouyi.png" class="r-img"></image>
			</view>
		</view>
		<view class="index_broad">
			<swiper class="swiper swiper_broad" circular
			 :autoplay="true" :vertical="true" :interval="3000" :duration="500" :display-multiple-items="1" disable-touch="true">
				<swiper-item v-for="(item,index) in broadmune" :key="index">
					<view class="swiper-item">
						<view class="broad_item">
							<label>{{i18n.broadtitle}}<text>{{i18n.broadtitle1}}</text></label> 
							<text class="icon_red">{{i18n.broadtxt}}</text>
							<text class="uni-ellipsis"> {{item}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="task_content" style="margin-top: 15px;">
			<view class="task_title">{{i18n.listtitle}}</view>
			<view class="index_task">
				<view class="task_item" v-for="(item,index) in tasklist" :key="index">
					<navigator class="task_li" :url="'/pages/index/vip?level='+item.id">
						<image :src="$configurl.ossBaseUrl+item.icon"></image>{{item.name}}
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
				<view class="c-item" v-for="(item, index) in taskdata" :key="index" @click="toDetail(item.id)">
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
				<text v-for="(item,index) in i18n.munetitle" :key="index" :class="{active:indexlist_in===index}" @click="munetitle_btn(index)">
					{{item}}
				</text>
			</view>
			<view class="list_details" v-if="listdetail.length > 0">
				<swiper class="swiper" circular :autoplay="true" :vertical="true" :interval="3000" 
					:duration="500" :current="currennum" :display-multiple-items="3" disable-touch="true">
					<swiper-item class="swiper_list" v-for="(item,index) in listdetail" :key="index">
						<block v-if="item.user">
							<view class="swiper-item inlist_info">
								<image :src="$configurl.ossBaseUrl+item.user.avatar"></image>
								<view class="inlist_item">
									<view class="item_title">
										<label>{{item.user.nickname}}</label>
										<text>{{i18n.singtxt[indexlist_in]}} {{item.count}} {{i18n.singbill}}</text>
									</view>
									<view class="inlist_num">{{item.amount | formatPrice}}</view>
								</view>
							</view>
						</block>
					</swiper-item>
				</swiper>
			</view>
		</view>
	
		<view style="text-align: center;margin-bottom: 150rpx;" v-if="listdetail.length < 1">
			<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 100rpx;"></image>
			<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">{{i18n.listinfo}}</view>
		</view>
		
		
		<!-- <popu-modal v-model="value" :mData="defaultData" :type="type" @cancel="cancel" navMask></popu-modal> -->
		<popu-modal v-model="redvalue" :mData="defaultData_custom" type="custom" navMask>
			<red-modal @cancel="cancel" :defaultData="defaultData_custom"></red-modal>
		</popu-modal>
	</view>
</template>

<script>
import loading from '@/utils/mixin/loading.js';
import loadMore from '@/utils/mixin/loadMore.js';
import redModal from '../index/component/red-modal.vue'
export default {
	mixins: [loading,loadMore],
	components:{redModal},
	data() {
		return {
			timeintr:null,
			value:false,
			redvalue:false,
			type:'custom',
			defaultData:{content:'这是一个模态弹窗',cancelText:'cancel'},
			defaultData_custom:{},
			langflagimg:'',
			langflagtxt:'',
			langshow:false,
			mune_index:0,
			munelang:[],
			headbtn:'',
			bannerData: [],
			TodayProfit: 0,
			invitationid:'',
			currennum:0,
			memberInfo:[{imgsrc:'/static/images/index/icon_gaoji.png',navrouter:'/pages/profile/help-center'},
						 {imgsrc:'/static/images/index/wallet.png',navrouter:'/pages/profile/wallet'},
						 {imgsrc:'/static/images/index/notice.png',navrouter:'/pages/tabbar/notice'},
						 {imgsrc:'/static/images/index/icon_daili.png',navrouter:'/pages/profile/lucky?id='},
						 {imgsrc:'/static/images/profile/enjoy.png',navrouter:'/pages/profile/invitation?id='}],
			bannerlist:[],
			broadmune:[],
			tasklist:[],
			taskdata:[],
			indexlist_in:0,
			indexlist:['会员榜单','商家榜单'],
			listdetail:[],
			jsondetail:[]
		};
	},
	computed:{
		i18n () {  
		  return this.$t('index');  
		},
		i18nhall(){
			return this.$t('memberhall');
		},
		i8nhead(){
			return this.$t('pagesprofile');
		},
		tabbartxt(){
			return this.$t('tabbartxt');
		}
	},
	methods: {
		navTo(url) {
			uni.navigateTo({ url });
		},
		cancel(){
			this.redvalue = false;
		},
		async getData() {
			let res = await this.$http.task();
			// console.log(res, 1111111);
			if (this.page === 1) {
				this.pageData = res.result;
			} else {
				this.pageData.data.push(...res.result.data);
			}
		},
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/index/task-detail?id=' + id
			});
		},
		headsearch(e) {
			// console.log(e);
			uni.navigateTo({
				url:'/pages/index/searchList?keywords='+e.text
			})
		},
		handleCeshi(){
			uni.navigateTo({
				url:'/pages/profile/real-auth?id=' + this.invitationid
			})
		},
		loadjson(){
			let that = this;
			this.$http.requestajx('index','get',{}).then((res) => {
				// console.log(res);
				let data = res.result;
				that.invitationid = data.id;
				that.TodayProfit = data.today_profit;
				// that.memberInfo = data.level.splice(0, 3);
				that.broadmune = data.user_level_notify;
				that.tasklist = data.task_category
				that.jsondetail = [data.complete_member_data,data.publish_member_data];
				that.listdetail = data.complete_member_data || '';
				
				
			}).catch((error) => {
				console.log('错误重启');
			});
			this.$http.requestajx('banner','get',{}).then((res) => {
				that.bannerlist = res.result;
			}).catch((error) => {
				console.log('错误重启');
			});
			
			
		},
		homepopu(){
			const that = this;
			this.$http.requestajx('index/homePopUp','get',{}).then((res) => {
				that.defaultData.content = res.result;
				// this.tabMask = new TabMask({opacity:0.6})
				that.value = true;
			});
			
		},
		taskmould(item){
			if(item.tpl_id == 1){
				uni.navigateTo({
					url:"/pages/imitate/index?data="+JSON.stringify(item)
				})
			}else if(item.tpl_id == 3){
				uni.navigateTo({
					url:"/pages/imitate/mould_am?data="+JSON.stringify(item)
				})
			}else{
				uni.navigateTo({
					url:"/pages/index/task-detail?id="+item.id
				})
			}
		},
		munetitle_btn(e){
			this.indexlist_in = e;
			this.listdetail = this.jsondetail[e];
			this.currennum = this.currennum - 3;
		},
		langlist(){
			this.langshow = !this.langshow;
		},
		munebtn(e){
			this.mune_index = e;
			var that = this;
			uni.setStorage({
			    key: 'locale_key',
			    data: e,
			    success: function () {
					var edition = ['zh','en','ru','ph','kr','my','pt','tr','es','in','idsa','vn','th','sa'];
					that.$i18n.locale = edition[parseInt(e)];
					that.$http.requestajx('country','get',{}).then((res) => {
						// console.log(res);
						let data = res.result;
						that.loadjson();
						that.munelang = data;
						that.langflagimg = data[e].image;
						that.langflagtxt = data[e].lang;
						that.langshow = false;
						that.tabbartxt.map(function(item,index){
							uni.setTabBarItem({ index: index, text: item});
						});
					}).catch((error) => {
						console.log('错误重启');
					});
			    }
			});
		},
		async kefu_btn(){
				let res = await this.$http.customerUrl();
			// #ifdef APP-PLUS
				plus.runtime.openURL(encodeURI(res.result))
			// #endif
			// #ifdef H5
				setTimeout(function(){
					window.open(res.result,'_blank');
				},200)
			// #endif
		},
		locale_edition(){
			var that = this;
			uni.getStorage({
			    key: 'locale_key',
			    success: function (res) {
			        // console.log(res);
					let btntxt = ['简体中文','English','русский язык','Tagalog','한국어','Malasia','Português','Türkçe','Español','हिंदी','Indonesia','Việt','ภาษาไทย','عربي ،'];
					that.headbtn = btntxt[parseInt(res.data)];
					that.tabbartxt.map(function(item,index){
						uni.setTabBarItem({ index: index, text: item});
					});
					uni.setStorageSync('ajaxmess', that.$t('ajaxmess'));
			    }
			});
		},
		async loadmsg(){
			if(uni.getStorageSync('userToken') === ""){
				clearInterval(this.timeintr);
				this.timeintr = null;
			}else{
				const that = this;
				let res = await this.$http.userNotify({
					type: 1,
					page: 1
				});
				let msgdata = res.result.data,num = 0;
				for(const item of msgdata){
					if(item.is_read === 0){
						num++
					}
				}
				this.$store.commit('msgnum',num);
				if(num>0){
					uni.setTabBarBadge({
						index: 4,
						text: ''+num
					});
				}else{
					uni.removeTabBarBadge({
						index:4
					});
				}
			}
			
		}
	},
	onShow() {
		// this.loadjson();
		this.munebtn(uni.getStorageSync('locale_key'));
		const that = this;
		this.timeintr = setInterval(function(){
			that.loadmsg();
		},5000);
	},
	onLoad() {
		this.loadjson();
		this.homepopu();
	}
};
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
.alicon{ 
	 font-family: "headicon" !important;
	font-size: 27px;
	font-style: normal;
}
.icon-zy::before {
  content: "\e620";
}
.head_pos{position: fixed;top: 0;left: 0;width: 100%;z-index: 999;background-color: rgb(28, 26, 78);color: #fff;
	.head_content{ padding-left: 20px;padding-right: 15px;width: 100%;height: 45px;display: flex;align-items: center;justify-content: space-between;}
	input{ height: 30px;border-radius: 30px;background-color: #FFFFFF;padding: 0 15px;text-align: center;color: #333333;box-sizing: border-box;}
	.head_btn{ height: 45px;line-height: 45px;padding-left: 15px;
		.icon-zy{ font-size: 16px;margin-right: 5px;}
	}
	.head_item:nth-of-type(1) {
	   flex: 1;
	}
	.head_kefu{ padding-left: 15px;position: relative;
		image{ width: 20px;}
		text{ position: absolute;right: -10px;top: -5px;@include radio_info;}
	}
}

.lang_flag{text-align: left;position: relative;
	image{ width: 25px;height: 16px;vertical-align: middle;margin-right: 5px;margin-bottom: 3px;}
}
.lang_list{position: absolute;top: 25px;left: 0;z-index: 99;transition: all .3s ease-in;opacity: 0;
		.list_after::after{
			content: "";position: absolute;top: 0;left: 10px;margin-top: -10px;
			    border-width: 5px;border-style: solid;border-color: transparent transparent #2e4f79 transparent;
		}
		.langul{background-color: #2e4f79;display: flex;flex-wrap: wrap;border-radius: 5px;overflow: hidden;}
		.lang_flag{text-align: left;color: #FFFFFF;width: 50%;padding: 10px;
			&.active{background-color: #2d486a;}
		}
		&.active{ opacity: 1;}
	}

.index_broad{padding: 0 10px;height: 30px;
	.swiper_broad{ border-radius: 10px;box-shadow: 0px 3px 16px 0px rgba(0, 35, 68, 0.14);height: inherit;padding: 0 15px;
		.swiper-item{height: inherit;}
		.broad_item{ height: inherit;font-size: 26rpx;color: #7e7e7e;display: flex;align-items:center;width: 100%;
			label{ font-size: 34rpx;margin-right: 5px;font-family: 'youshe';color: #333333;
				text{ color:#FA5C5B;}
			}
			.uni-ellipsis{ font-size: 12px;}
			.icon_red{ background-color: #FA5C5B;border-radius: 10px;padding: 2px 8px;color: #FFFFFF;margin-right: 10px;font-size: 12px;}
		}
	}
}
.task_title{ padding: 8px 0 2px 18px;font-size: 36rpx;color: #1C2664;}
.index_task{ display: flex;flex-wrap: wrap;padding: 10px 20px;
	.task_item{ padding: 8px;width: 50%;
		.task_li{box-shadow: 0 3px 17px 0 rgba(0, 35, 68, 0.14);border-radius: 5px;padding: 40rpx 0 40rpx 50rpx;align-items: center;display: flex;}
		image{ width: 40px;height: 40px;margin-right: 18px;}
	}
}
.indexlist{ 
	.inlist_title{ display: flex;justify-content: space-between;flex-direction: row;padding: 30px 10px;text-align: center;
		text{font-size: 36rpx;color: #7e7e7e;position: relative;
			&.active{ color:#1b2664;
				&::before{ content:'';position: absolute;bottom: -15px;left: calc(50% - 10px);width: 20px;border: 2px solid #1b2664;border-radius: 20px;}
			}
		}
	}
}
.list_details{padding: 0 20px;height: 213px;overflow: hidden;margin-bottom: 50px;
	.swiper{ height: inherit;margin-top: -1px;}
	.inlist_info{ position: relative;padding: 10px 0 12px;border-top: 1px solid #EEEEEE;
		image{ width: 47px;height: 47px;border-radius: 50%;}
		.inlist_item{ position: absolute;left: 0;top: 0;width: 100%;height: 100%;padding-left: 63px;display: flex;justify-content: space-between;align-items: center;font-size: 26rpx; 
			label{ width: 100%;color: #1C2664;display: inline-block;margin-bottom: 10px;}
			text{ color: #7e7e7e;}
		}
		.inlist_num{ color: #FA4A80;}
	}
	
}

.wrapper { padding-bottom: 40px;background-color: #FFFFFF;}
.top-bgd {
	width: 100%;
	height: calc(var(--status-bar-height) + 115px);
	background: url(/static/images/index/pic_beijing.png) no-repeat;
	background-size: 100% 100%;
	background-position: 0 0;
}
.index_banner{
	padding: 0 40rpx;
	margin-top: -120rpx;
	height: 280rpx;
	.banner_swiper{ height: 100%;border-radius: 10px;overflow: hidden;}
	.banner_content{ border-radius: 10px;overflow: hidden;width: 100%;height: inherit;
		.banner_image,.swiper-item{ height: 100%;}
		image,img{ display: block;width: 100%;border-radius: 10px;}
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 25%;
		height: 140rpx;
		.item_nav{ width: 100%;text-align: center;}
		image {
			width: 90rpx;
			height: 90rpx;
		}
		.lazyimg{ width: 90rpx;display: inline-block;}
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
	align-items: center;justify-content: space-between;
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
		.tasktype{padding: 3px 10px 3px 0;color: #FA4A80;font-size: 13px;}
	}
}
.empty {
	text-align: center;
	margin-top: 450rpx;
	color: rgb(119, 119, 119);
	font-size: 30rpx;
}
</style>
