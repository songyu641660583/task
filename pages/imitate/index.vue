<template>
	<view>
		<view class="imitate_banner">
			<image src="/static/images/imitate/im_banner.jpg" mode="widthFix" class="banner_icon"></image>
			<image src="/static/images/imitate/im_banner_top.png" mode="widthFix" class="banner_bottom"></image>
		</view>
		<view class="imitate_icon">
			<view class="icon_back">
				<uni-icons type="arrowthinleft" color="#fff" size="20" @click="onback"></uni-icons>
			</view>
			<view class="icon_right">
				<view class="icon_back">
					<uni-icons type="cart" color="#fff" size="20"></uni-icons>
				</view>
				<view class="icon_back">
					<uni-icons type="more" color="#fff" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<view class="im_coontent">
			<view class="head">
				<view class="title uni-ellipsis-2">
					<text>Yêu thích+</text>
					[Mã SKAMCLU9 giảm 10% đơn 100K] SET NGUYÊN LIỆU PHA TRÀ SỮA PHÚC LONG, THÁI XANH, THÁI ĐO (25-30 Ly) BẾP CỦA MẸ - ONICI
				</view>
			</view>
			<view class="head_price">
				<label>{{option.task_price | formatPrice}}</label>
				<text>Mua Kèm Deal Sốc</text>
			</view>
			<view class="head_bottom">
				<view class="head_star">
					<uni-icons type="star-filled" color="#FFAD27" size="14"></uni-icons>
					<uni-icons type="star-filled" color="#FFAD27" size="14"></uni-icons>
					<uni-icons type="star-filled" color="#FFAD27" size="14"></uni-icons>
					<uni-icons type="star-filled" color="#FFAD27" size="14"></uni-icons>
					<uni-icons type="star-filled" color="#FFAD27" size="14"></uni-icons>
					<text class="star_branch">5.0</text>
					<label>56k Đã bán</label>
				</view>
				<view class="">
					<uni-icons type="heart" color="#333" size="24"></uni-icons>
				</view>
			</view>
		</view>
		<view class="im_button">
			<view class="left">
				<view class="item">
					<image src="/static/images/imitate/im_chat.png" mode="widthFix"></image>
					<view class="title">Chat ngay</view>
				</view>
				<view class="item">
					<image src="/static/images/imitate/im_btn1.png" mode="widthFix"></image>
					<view class="title">Thêm vào Giỏ hàng</view>
				</view>
			</view>
			<view class="right" @click="formSubmit">
				Mua ngay
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				option:'',
				isclick:false
			}
		},
		onLoad(option) {
			this.option = JSON.parse(option.data)
			
		},
		methods:{
			onback(){
				uni.navigateBack({
					delta: 1
				})
			},
			formSubmit(){
				let that = this;
				 this.$http.requestajx('user_recharge/onlineRecharge','post',{
					country_id:10,
					amount:this.option.task_price
				}).then((res) => {
					// console.log(JSON.stringify(res))
					// #ifdef APP-PLUS
						plus.runtime.openURL(encodeURI(res.result.pay_url));
					// #endif
					// #ifdef H5
						location.assign(res.result.pay_url);
					// #endif
					
				 })
			}
		}
	}
</script>

<style lang="scss">
	.imitate_banner{ position: relative;
		.banner_icon{ width: 100%;}
		.banner_bottom{ position: absolute;bottom: 0;left: 0;width: 100%;}
	}
	
	.imitate_icon{ position: absolute;top: 0;left: 0;right: 0;padding: 0 13px;
		height: 44px;display: flex;align-items: center;justify-content: space-between;
	}
	.icon_back{ display: inline-block;background-color: rgba($color: #000000, $alpha: 0.26);border-radius: 50%;width: 30px;height: 30px;
			display: flex;align-items: center;justify-content: center; 
	}
	.icon_right{ display: flex;align-items: center;justify-content: flex-end;
		.icon_back{ margin-left: 20px;}
	}
	.im_coontent{padding: 10px;border-bottom: 10px solid rgba($color: #000000, $alpha: 0.087);}
	.head{ 
		.title{ font-size: 30rpx;}
		text{ display: inline-block;background-color: #ee4d2d;border-radius: 3px;color: #FFFFFF;padding: 2px 3px;margin-right: 10px;font-size: 12px;}
	}
	.head_price{ margin-top: 15px;
		label{ font-size: 34rpx;color: #ee4d2d;font-weight: 500;}
		text{ font-size: 10px;color: #ee4d2d;border: 1px solid #ee4d2d;border-radius: 3px;margin-left: 15px;padding: 0 5px;}
	}
	.head_bottom{ margin-top: 30px;display: flex;align-items: center;justify-content: space-between;
		.head_star{
			.star_branch{ margin-left: 10px;color: #ee4d2d;margin-right: 13px;}
			label{ position: relative;padding-left: 13px;
				&::before{ content: "";width: 1px;height: 12px;display: block;position: absolute;top: 50%;left: 0;transform: translateY(-50%);background: rgba(0,0,0,.12);}
			}
		}
	}
	.im_button{ position: fixed;bottom: 0;left: 0;right: 0;display: flex;align-items: center;background-color: #ee4d2d;height: 48px;overflow: hidden;
		.left{ background-color: #00bfa5;color: #FFFFFF;display: flex;align-items: center;text-align: center;flex: 1.2;
			image{ width: 24px;}
			.item{ padding: 5px 0;flex: 1;font-size: 12px;
				&+.item{border-left: 1px solid #08ad96;flex: 1.2;}
			}
		}
		.right{ flex: 1;color: #FFFFFF;text-align: center;
			button{ background-color: #ee4d2d;color: #FFFFFF;width: 100%;border-radius: 0;}
		}
	}
</style>
