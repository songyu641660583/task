<template>
	<view class="bill_back" >
		<!-- <loading-plus v-if="isShow"></loading-plus> -->
		<!-- <public-head :backicon="false" backcolor="#1b2664" color_icon="#fff" :title="i18n.title"></public-head> -->
		<view class="rank-list">
			<view class="tab-bar">
				<text class="uni-ellipsis" @click="itemClick(index)" v-for="(item,index) in i18n.munetitle" :key="index" :class="{active:tabIndex===index}">
					{{item}}
				</text>
			</view>
			<view class="list-content">
				<view class="content-header">
					<view class="each-head" v-for="(item, index) in listdetail" :key="index" v-if="index < 3">
						<image :src="$configurl.ossBaseUrl+item.user.avatar"></image>
						<text>{{item.amount | formatPrice}}</text>
					</view>
				</view>
				<view class="content-main">
					<view class="main_height">
						<view class="list_details">
							<view class="swiper_list" v-for="(item, index) in listdetail" :key="index" v-if="index > 2">
								<view class="inlist_info" v-if="item.user">
									<view class="listnum">
										<text>{{index + 1}}</text>
										<image :src="$configurl.ossBaseUrl+item.user.avatar"></image>
									</view>
									<view class="inlist_item">
										<view class="item_title">
											<label>{{item.user.nickname}}</label>
											<!-- <text>{{i18n.singtxt[tabIndex]}} {{item.count}} {{i18n.singbill}}</text> -->
										</view>
										<view class="inlist_num">
											<text class="color_bule">{{item.amount | formatPrice}}</text>
											<text class="color_gray">{{i18n.munetitle[tabIndex]}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="button-bottom">
			<view class="bottom-left">
				<text>-</text>
				<text style="margin-left: 15px;">{{team_count}}</text>
			</view>
			<view class="bottom-right">
				<button type="primary" @click="shareapp" class="uni-ellipsis">
					<image src="/static/images/ranking/rank-phone.png"></image>Invite to win
				</button>
			</view>
		</view> -->
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabItem: [],
			type:1,
			tabIndex: 0,
			isShow:true,
			listdetail:[],
			jsondetail:[],
			team_count:0
		};
	},
	computed:{
		i18n(){
			return this.$t('ranking');
		}
	},
	methods: {
		loadjson(){
			uni.showLoading();
			let that = this;
			this.$http.requestajx('index/userLevelNotify','get',{}).then((res) => {
				let member = res.result.complete_member_data,teamnum = res.result.publish_member_data;
				member.sort(function(a,b){
					return b.amount - a.amount;
				});
				teamnum.sort(function(a,b){
					return b.amount - a.amount;
				});
				member[0] = member.splice(1, 1, member[0])[0];
				teamnum[0] = teamnum.splice(1, 1, teamnum[0])[0];
				that.jsondetail = [member,teamnum];
				that.listdetail = member || '';
				uni.hideLoading();
			}).catch((error) => {
				console.log('数据错误');
			});
		},
		async getData() {
			let res = await this.$http.userBill({
				type:this.type,
				page:this.page
			});
			if(this.page === 1) {
				this.pageData = res.result
				// console.log(this.pageData);
			} else {
				this.pageData.data.push(...res.result.data);
			}
			this.isShow = false
		},
		async getAccountIndex() {
			let res = await this.$http.accountIndex();
			const data = res.result;
			this.team_count = data.team_count;
		},
		itemClick(index) {
			uni.showLoading();
			this.tabIndex = index
			this.listdetail = this.jsondetail[index];
			uni.hideLoading();
		},
		shareapp(){
			this.$http.requestajx('team/app_download_url','get',{}).then(function(res){
					let content="";
						content+="Dear friends, I have obtained 50000Rs in Happy Share APP, join my team and install the APP, you can get 200Rs for free. Click the link:";
						content+="\n"+res.result.tg_url+"\n";
					let href = "https://api.whatsapp.com/send?text="+ encodeURIComponent(content);
						//#ifdef APP-PLUS
						 plus.runtime.openURL(href);
						//#endif
						//#ifdef H5
						location=href;
						//#endif
			});
			
		}
	},
	onShow() {
		this.loadjson();
		this.getAccountIndex();
	}
};
</script>

<style lang="scss">
.rank-list{ background: url('/static/images/ranking/rank-bg.jpg') no-repeat;
	background-size: 100% 100%;min-height: calc(100vh - 50px);padding: calc(var(--status-bar-height) + 20px) 20px 0;
	display: flex;flex-direction: column;
	.tab-bar{display: flex;flex-direction: row;font-size: 18px;
		    color: #8751f1;justify-content: center;width: 70%;margin: 0 auto;border-radius: 5px 5px 5px 5px;
		text{
			font-size: 16px;
			flex: 1;
			text-align: center;
			background: #8751f1;
			padding: 10px 0;
			color: #fff;
			&.active{
				color: #8751f1;
				background: #fff;
			}
		}
	}
}
.list-content{
	padding: 10px 20px 0 20px;
	background: #fff;
	margin-top: 105px;
	position: relative;
	border-radius: 12px 12px 0 0;
	&::after{
		content: "";
		position: absolute;
		width: 30%;
		height: 15px;
		background: #fff;
		top: -15px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 12px 12px 0 0;
	}
	.content-header{ display: flex;flex-direction: row;
		.each-head{ flex: 1;display: flex;flex-direction: column;align-items: center;
			text{ color: #5e84ff;font-size: 14px;display: inline-block;margin-top: 5px;}
			image{ height: 55px;width: 55px;border-radius: 50%;
				&::after{
					content: "";
					position: absolute;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					display: inline-block;
					z-index: 999;
				}
				
			}
			&:nth-of-type(1) image::after{
				background: url('/static/images/ranking/rank-two.png') no-repeat;
				background-size: 100% 100%;
			}
			&:nth-of-type(2){
				transform: translateY(-10px);
				image::after{
					background: url('/static/images/ranking/rank-one.png') no-repeat;
					background-size: 100% 100%;
				}
			} 
			&:nth-of-type(3) image::after{
				background: url('/static/images/ranking/rank-three.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
}
.content-main{ display: flex;flex-direction: column;margin-top: 15px;max-height: calc(100vh - 300px);
	.main_height{ height: 100%;overflow-y: auto;}
}
.list_details{overflow: hidden;padding-bottom: 50px;
	.swiper{ height: inherit;margin-top: -1px;}
	.inlist_info{ position: relative;padding: 10px 0 12px;
		.listnum{display: flex;align-items: center;width: 75px;justify-content: space-between;}
		image{ width: 47px;height: 47px;border-radius: 50%;display: inline-block;}
		.inlist_item{ position: absolute;left: 0;top: 0;width: 100%;height: 100%;padding-left: 95px;display: flex;justify-content: space-between;align-items: center;font-size: 26rpx; 
			label{ width: 100%;color: #1C2664;display: inline-block;}
			text{ color: #7e7e7e;}
		}
		.inlist_num{ color: #FA4A80;display: flex;flex-direction: column;text-align: center;
			.color_bule{ color: #5e84ff;font-size: 15px;}
			.color_gray{ color: #a5a5a5;font-size: 12px;margin-top: 7px;}
		}
	}
	
}
.button-bottom{
	position: fixed;width: 100%;background: #fff;bottom: 50px;display: flex;flex-direction: row;align-items: center;
	.bottom-left{
		flex: 5;padding-left: 40px;color: #8751f1;font-size: 15px;display: flex;flex-direction: row;align-items: center;
		text{ color: #8751f1;font-size: 15px;}
	}
	.bottom-right{ flex: 5;
		button{ color: #FFFFFF;background-color: #30b028;display: flex;flex-direction: row;align-items: center;justify-content: center;}
		image{ width: 22px;height: 22px;margin-right: 10px;}
		   
	}
}
</style>
