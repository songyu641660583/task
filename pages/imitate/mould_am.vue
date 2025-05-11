<template>
	<view class="mould_back">
		<!-- <image src="/static/images/imitate/am.jpg" mode="widthFix"></image> -->
		<view class="mould_head">
			<view class="left">
				<text class="mune icon_back"></text>
				<text class="logo icon_back"></text>
			</view>
			<view class="right">
				<text>Sign In ›</text>
				<text class="avter icon_back"></text>
				<text class="shop icon_back">0</text>
			</view>
		</view>
		<view class="mould_input">
			<view class="search">
				<input type="text" value="Household Cleaning Tools" class="search_input" />
				<button size="mini">
					<text class="btn_icon icon_back"></text>
				</button>
			</view>
			
		</view>
		<view class="address">
			<text class="icon_back"></text> Deliver to Hong Kong
		</view>
		<view class="mould_info">
			<view class="left">Visit the SetSail Store</view>
			<view class="right">
				<text class="icon icon_star"></text>
				<text>255</text>
			</view>
		</view>
		<view class="mould_article">
			SetSail Soap Dispensing Dish Brush with Stainless Steel Handle Soap Control Dishwand Brush Kitchen Scrub Brush with 4 Replacement Heads Kitchen Cleaning Brush for Sink Pot Pan
		</view>
		<view class="mould_img">
			<text class="icon"></text>
			<view style="text-align: center;"><image src="https://m.media-amazon.com/images/I/41exzu7M4DL._AC_SY580_.jpg" mode="widthFix" style="width: 60%;"></image></view>
			<view class="list">
				<text class="active"></text>
				<text></text>
				<text></text>
				<text></text>
				<text></text>
				<!-- <text class="list-active"></text> -->
			</view>
		</view>
		<view class="mould_price">
			<view class="left">price:</view>
			<view class="right">
				<label>{{option.task_price | formatPrice}}</label>
				<view class="info">No Import Fees Deposit & $8.22 Shipping to Hong Kong (FREE Shipping to Hong Kong when you spend over $49.00 on eligible items)</view>
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
				option:''
			}
		},
		onLoad(option) {
			this.option = JSON.parse(option.data )
			
		},
		methods:{
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
	.mould_back{ padding-bottom: 50px;}
	.icon_star{ background-image: url('@/static/images/imitate/am_icon.png');display: inline-block;}
	.icon_back{ background-image: url('@/static/images/imitate/am_all.png');background-size: 275px;display: inline-block;}
	.address{ background-color: #37475A;color: #FFFFFF;font-size: 13px;height: 44px;width: 100%;display: flex;align-items: center;padding-left: 10px;
		text{ background-position: -75px -340px;width: 20px;height: 20px;float: left;margin-right: 5px;}
	}
	.mould_head{ display: flex;height: 48px;width: 100%;border-bottom: 1px solid #232f3e;background-color: #232f3e;padding: 0 15px;
			flex-flow: row nowrap;justify-content: space-between;align-items: center;
		.left{ display: flex;align-items: center;height: 100%;
			.mune{ width: 20px;height: 20px;background-position: -20px -378px;}
			.logo{ background-position: -10px -48px;width: 80px;height: 27px;margin-left: 15px;}
		}
		.right{color: #FFFFFF;display: flex;align-items: center;height: 100%;
			.avter{background-position: -141px -300px;width: 35px;height: 27px;}
			.shop{ background-position: -10px -240px;width: 37px;height: 27px;line-height: 10px;font-weight: 700;text-decoration: none;color: #f90;text-align: center;}
		}
	}
	.mould_input{ padding: 10px;background-color: #232f3e;
		.search{ position: relative;background-color: #FFFFFF;border-radius: 5px;height: 45px;line-height: 45px;color: #000;display: flex;align-items: center;padding-left: 10px;width: 100%;
			text{ position: absolute;top: 10px;left: 12px;pointer-events: none;background-position: -73px -239px;width: 27px;height: 25px;}
			button{ background-color: #fcbb6a;width: 50px;height: 45px;position: absolute;right: 0;}
			.search_input{ width: 100%;}
		}
	}
	.mould_info{ display: flex;align-items: center;padding: 20px 10px 0;justify-content: space-between;
		.left{ color: #007185;}
		.right{ 
			.icon{background-position: -56px -60px;background-size: 300px 145px;background-repeat: no-repeat;width: 60px;height: 12px;margin-right: 20px;}
		}
	}
	.mould_article{ padding: 5px 10px;}
	.mould_img{ text-align: right;padding: 10px;
		.icon{ width: 26px;height: 26px;display: inline-block;background-color: rgba(255,255,255,.8);
			background-repeat: no-repeat;background-position: center;background-image: url('/static/images/imitate/am_share.png');background-size: cover;
		}
		.list{text-align: center;padding-top: 20px;
			text{display: inline-block;border-radius: 50%;background-color: #f3f3f3;border: 1px solid #949494;height: 7px;margin: 0 3px;padding: 0;width: 7px;
			font: none;
				&.active{ background-color: #949494;}
			}
		}
		.list-active{ position: relative;}
		.list-active::after{
			border-bottom: 5px solid transparent;
			border-left: 9px solid #949494;
			border-right: 0;
			border-top: 5px solid transparent;
			-webkit-border-radius: 0;
			border-radius: 0;
			content: "";
			height: 0;
			position: absolute;
			top: -2px;
			right: -15px;
			width: 0;
		}
	}
	.mould_price{ padding: 10px;display: flex;
		label{ color: #B12704;font-size: 18px;margin-left: 10px;}
		.info{ font-size: 15px;color: #565959;padding-top: 5px;}
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
