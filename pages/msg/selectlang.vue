<template>
	<view class="header_top">
		<public-head :title="i18n.title" :btntxt="i18n.subbtn" v-on:initbtn="btn_on"></public-head>
		<view class="select_content">
			<view class="select_list">
				<view class="select_li" :class="{active:muneindex===index}" v-for="(item,index) in munelang" :key="index" @click="munebtn(index)">
					 <text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				muneindex:0,
				munelang:['简体中文','English','русский язык','Tagalog','한국어','Malasia','Português','Türkçe','Español','हिंदी','Indonesia','Việt','ภาษาไทย','عربي ،'],
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key:'locale_key',
				success:function(res){
					// console.log(res.data);
					that.muneindex = res.data;
				}
			})
			
			
		},
		computed:{
			i18n(){
				return this.$t('langtext');
			}
			
		},
		methods:{
			munebtn:function(e){
				this.muneindex = e;
			},
			btn_on:function(){
				var that = this,e = this.muneindex;
				uni.setStorage({
				    key: 'locale_key',
				    data: e,
				    success: function () {
						var edition = ['zh','en','ru','ph','kr','my','pt','tr','es','in','idsa','vn','th','sa'];
						that.$i18n.locale = edition[parseInt(e)];
						that.$http.requestajx('country','get',{},edition[parseInt(e)]);
						uni.navigateBack();
				    }
				});
			}
		}
	}
	
</script>

<style lang="less">
	page{ background-color: #F6F7FA;}
	.select_content{ padding-top: 15px;
		.select_list{background-color: #FFFFFF;padding: 0 30rpx;
			.select_li{ padding: 17px 0;
				&+.select_li{border-top: 1px solid #EBEBEB;}
				&.active{background: url(/static/images/lang/select.png)  no-repeat;background-size: 23px;background-position: 95%;}
				text{ font-size: 30rpx;}
			}
		}
	}
	
</style>
