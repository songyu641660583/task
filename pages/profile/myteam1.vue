<template>
	<view>
		<!-- <fh-tab-control :tabItem="tabItem" :tabIndex="tabIndex" style="border-bottom: 10rpx solid #f5f7fd;" @itemClick="itemClick"></fh-tab-control> -->
		<loading-plus v-if="isLoading"></loading-plus>
		<public-head :title="i18n.title" :btntxt="i18n.titlebtn" v-on:initbtn="openDatetimePicker" backcolor="#27326e" color_icon="#fff"></public-head>
		<view class="team_info">
			<view class="team_tx">
				<view class="team_price"><image src="/static/images/login_Img/logo.png" mode="widthFix"></image> <text>{{i18n.teamname}}</text>  </view>
				<view class="team_title">
					<view class="team_txt1">{{i18n.recharge}}</view>
					<view class="team_txt2">
						<image src="/static/images/profile/icon_chongzhi.png" mode=""></image>
						<text>{{resultdata.total_recharge_sum}}</text>
					</view>
				</view>
			</view>
			<view class="team_mune">
				<view class="team_item" v-for="(item,index) in munelist" :key="index">
					<view class="team_title">{{item}}</view>
					<text>{{i18n.munelist[index]}}</text>
				</view>
			</view>
		</view>
		<view class="team_list">
			<view class="list_item" :class="{active:tabIndex==index}" v-for="(item,index) in teamlist" :key="index">
				<text @click="itemClick(index)">{{i18n.tabitem[index]}}({{item}}{{i18n.people}})</text>
			</view>
		</view>
		<uni-list style="border-top: 5px solid #f5f7fd;" v-if="teamdata.length > 0">
			<uni-list-item
				:title="item.user.nickname"
				:thumb="'https://douyin-1303316651.cos.ap-bangkok.myqcloud.com/'+item.user.avatar"
				:isBorder="true"
				:rightText="item.created_at"
				:width="66"
				:height="66"
				:showArrow="false"
				v-for="(item, index) in teamdata"
				:key="index"
			>
				<template v-slot:left="">
					<view class="tip">
						<image src="/static/images/profile/icon_01.png" mode="widthFix"></image>
						<text class="uni-ellipsis">{{ item.user.user_level.name }}</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view v-else style="margin-top: 400rpx; text-align: center; color: #666; ">{{i18n.numpeople}}0</view>
		<date-time  ref="myPicker"
         @submit="handleSubmit"
         :start-year="2000"
         :end-year="2030"
         color="#488ee9"></date-time>
		<picker-show :pickerlist="pickerarray" @btnconfirm="bindconfirm" ref="showpicker"></picker-show>
	</view>
</template>

<script>
import dateTime from '@/components/picker_data/simple-datetime-picker'
import config from '@/service/config.js';
export default {
	components:{
		dateTime
	},
	data() {
		return {
			result: {
				team: []
			},
			pickerarray:[],
			teamarray:[],
			teamdata:[],
			countryicon:'',
			total: '',
			tabIndex: 0,
			isLoading: true,
			resultdata:{
				team:[]
			},
			munelist:[],
			teamlist:[]
		};
	},
	computed:{
		i18n(){
			return this.$t('myteam');
		}
	},
	methods: {
		openDatetimePicker() {
		   this.$refs.myPicker.show();
		},
		closeDatetimePicker() {
		   this.$refs.myPicker.hide();
		},
		handleSubmit(e) {
		   console.log(e);
		   this.birthday = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
		},
		teamjson(level){
			let that = this;
			this.$http.requestajx('team','get',{level}).then((res) => {
				let data = res.result;
				that.resultdata = data;
				that.teamdata = data.team;
				that.munelist = [data.withdrawal_sum,data.user_count,data.withdrawal_sum];
				that.teamlist = [data.level_one_count,data.level_two_count,data.level_three_count];
				// console.log(data);
				
				that.teamarray = data.team.map(function(item,index){
					return item.created_at; 
				});
			});
		},
		bindconfirm(e){
			let arr = this.resultdata.team.filter(function(element, index, item){
				 let val = item[index].created_at;
				 return e.indexOf(val.substring(0,val.length-3))===0;
			 });
			 this.teamdata = arr;
		},
		grad_picker(){
			this.pickerarray = this.teamarray.map(function(item,index){
				return item.substring(0,item.length-3);
			}).filter(function(element, index, item){
				return item.indexOf(element) === index;
			});
			
			this.$refs.showpicker.picker_open();
		},
		gettime(timestamp) {
			console.log(timestamp)
			let date = new Date(timestamp),
				Y = date.getFullYear() + '-',
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
				D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ',
				h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':',
				m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':',
				s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			let strDate = Y+M+D+h+m;
			return strDate;
		},
		async getTeamList(level) {
			let res = await this.$http.teamList({ level });
			this.result = res.result;
			this.munelist = [data.withdrawal_sum,data.user_count,data.withdrawal_sum];
			this.teamlist = [data.level_one_count,data.level_two_count,data.level_three_count];
			/* console.log(this.munelist)
			console.log(this.result); */
			switch (level) {
				case 1:
					this.total = res.result.level_one_count;
					break;
				case 2:
					this.total = res.result.level_two_count;
					break;
				case 3:
					this.total = res.result.level_three_count;
					break;
			}
			this.result.team.forEach(item => {
				return (item.user.avatar = item.user.avatar === null ? '/static/images/profile/btn_touxiang.png' : config.ossBaseUrl + item.user.avatar);
			});
		},
		itemClick(index) {
			this.tabIndex = index;
			this.teamjson(index + 1);
		}
	},
	onShow() {
		this.teamjson(this.tabIndex+1);
		setTimeout(() => {
			this.isLoading = false;
		}, 1100);
	}
};
</script>

<style lang="less">
/deep/ .uni-list-item__icon-img {
	border-radius: 50%;
}

.team_info{ background: linear-gradient(top, #1b2664 0%,#5b6498 100%);padding-top: calc(var(--status-bar-height) + 45px);
	.team_tx{ display: flex;justify-content: space-between;padding: 40px 40px 30px 20px;color: #FFFFFF;
		.team_price{ align-items: center;display: inherit;
			image{ width: 43px;height: 43px;border-radius: 50%;}
			text{ margin-left: 10px;font-size: 32rpx;}
		}
		.team_title{ text-align: center;
			.team_txt1{ font-size: 34rpx;margin-bottom: 15px;}
			.team_txt2{ font-size: 46rpx;}
			image{ width: 17px;height: 17px;margin-right: 5px;}
		}
	}
	
}
.team_mune{ display: flex;align-items: center;color: #FFFFFF;font-size: 24rpx;height: 65px;background-color: rgba(255,255,255,0.05);
	.team_item{ flex: 33.3%;text-align: center;position: relative;
		.team_title{ margin-bottom: 14px;}
		&+.team_item::after{ content: '';position: absolute;left: 0;top: 6px;width: 1px;height: 23px;background-color: #FFFFFF;}
	}
}
.team_list{ display: flex;height: 40px;align-items: center;
	.list_item{flex: 1;text-align: center;font-size: 28rpx;color: #8e8e8e;position: relative;
		&.active{ color:#000;
			&::after{ content: '';width: 26px;height: 3px;background-color: #1b2664;border-radius: 3px;position: absolute;bottom: -8px;left: calc(50% - 13px);}
		}
	}
}
.card {
	position: relative;
	top: 102rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 426rpx;
	border-bottom: 10rpx solid #f5f7fd;
	box-sizing: content-box;
	.card-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 690rpx;
		height: 360rpx;
		background-image: linear-gradient(151deg, #5b6498 0%, #1b2664 100%);
		border-radius: 20rpx;
		color: #ffffff;
		.list1 {
			font-size: 66rpx;
			margin-top: 110rpx;
		}
		.list2 {
			display: flex;
			align-items: flex-end;
			font-size: 32rpx;
			margin-top: 30rpx;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
			}
		}
		.list3 {
			margin-top: 55rpx;
			font-size: 30rpx;
		}
	}
}
.tip {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 140rpx;
	height: 34rpx;
	background-image: linear-gradient(145deg, #f2d9a5 0%, #cfb385 100%);
	border-radius: 17rpx;
	margin-left: 22rpx;
	padding: 0 5px;
	image {
		width: 12rpx;
		height: 14rpx;
	}
	text {
		font-size: 16rpx;
		color: #393026;
		margin-left: 6rpx;
		
	}
}
</style>
