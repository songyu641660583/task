<template>
	<view class="lang_content">
		<view class="lang_head">{{i18n.titleinfo[0]}}</view>
		<view class="lang_head">{{i18n.titleinfo[1]}}</view>
		<view class="lang_mune">
			<view class="mune_item" v-for="(item,index) in munelist" :key="index">
				<text :class="{active:mune_index===index}" @click="munebtn(index)">{{item}}</text>
			</view>
		</view>
		<view class="lang_bottom">
			<view class="bottom_info">{{i18n.btninfo}}</view>
			<button type="primary">{{i18n.btn}}</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mune_index:0,
				munelang:['中文','English','русский язык','Ang Pilipinas','한국어','Malay','Português','Türkçe','Español','हिंदी','Indonesia','Việt','ภาษาไทย','عربي ،']
			}
		},
		computed:{
			i18n(){
				return this.$t('langtext');
			}
		},
		methods:{
			munebtn(e){
				this.mune_index = e;
				var that = this;
				uni.setStorage({
				    key: 'locale_key',
				    data: e,
				    success: function () {
						var edition = ['zh','en','ru','en','kr','my','pt','tr','es','in','idsa','en','th','sa'];
						that.$i18n.locale = edition[parseInt(e)];
				    }
				});
			},
			locale_edition:function(){
				var that = this;
				uni.getStorage({
					key:'locale_key',
					success:function(res){
						console.log(res.data);
						var edition=['zh-CN','en-US','한국어','日本語'];
						that.$i18n.locale = edition[parseInt(res.data)];
					}
				})
			}
		},
		onLoad() {
			let localkey = uni.getStorageSync('locale_key');
			if(localkey){
				uni.navigateTo({
				    url: '/pages/login/pwd-login'
				});
			}
		},
		
	}
	
</script>

<style lang="less">
	.lang_content{ padding: 24rpx;}
	.lang_head{ font-size: 40rpx;margin-bottom: 20rpx;padding: 0 20rpx;}
	.lang_mune{ display: flex;flex-wrap: wrap;margin-top: 50rpx;
		.mune_item{padding: 30rpx 15rpx;box-sizing: border-box;
			text{ border: 1px solid #D6D6D6;font-size: 26rpx;border-radius: 10px;padding: 5px 10px;box-sizing: border-box;
				&.active{border-color: #1B2664;background-color: #1B2664;color: #FFFFFF;}
			}
		}
	}
	.lang_bottom{ position: absolute;left: 0;bottom: 20vh;width: 100%;padding: 0 38rpx;
		.bottom_info{ font-size: 30rpx;color: #D6D6D6;text-align: center;margin-bottom: 20px;}
		button{ width: 100%;background-color: #1b2664;border-radius: 30px;}
	}
</style>
