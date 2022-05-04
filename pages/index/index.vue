<template>
	<view class="notify">
		<view class="promotion-center">
			<view class="tj-sction">
				<!-- 轮播图1 -->
				<view class="swiper">
					<view class="swiper-box">
						<oa-swipe-dot :info="advList" mode="nav" :current="current" field="adv_title">
							<swiper @change="handleDotChange" autoplay="true">
								<swiper-item v-for="(item, index) in advList"
									@tap="navTo(`/pages/application/News/detail?id=${item.jump_link}`)" :key="index">
									<view class="swiper-item">
										<image :src="item.cover" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
						</oa-swipe-dot>
					</view>
				</view>
			</view>
		</view>
		<view class="promotion-center">
			<oa-list-cell icon="icongonggao" :iconColor="themeColor.color"
				@eventClick="navTo('/pages/application/Announce/index')" title="通知公告"></oa-list-cell>
		</view>
		<view class="notify-list" v-if="notifyList.length > 0">
			<view v-for="(item, index) in notifyList" :key="index" class="row"
				@tap="navTo('/pages/application/News/detail?id=${item.id}')">
				<view class="carrier">
					<view class="notify-wrapper">
						<view class="title in1line">{{item.notifySenderForMember.title}}</view>
						<view class="content in2line">{{item.notifySenderForMember.content}}</view>
						<view class="time">{{item.created_at | time}}</view>
						<uni-tag class="type" type="error" :text="item.type | notifyTypeFilter" size="small" />
						<view class="un-read" :class="'bg-'+themeColor.name" v-if="item.is_read.toString() === '0'">
						</view>
					</view>
				</view>
				<oa-load-more v-if="notifyList.length > 0" :status="loadingType" />
			</view>
		</view>
		<view v-if="!hasLogin" class="notify-empty">
			<view class="empty-tips">
				暂未登录
				<view class="navigator" :class="'text-'+themeColor.name" @tap="navTo('/pages/public/login')">登录/注册 >
				</view>
			</view>
		</view>
		<!--页面加载动画-->
		<oa-empty :info="'还没有内容~'" v-if="notifyList.length === 0 && !loading"></oa-empty>
		<oa-loading isFullScreen :active="loading"></oa-loading>

	</view>

</template>
<script>
	/**
	 *@des 
	 *@author yiiframe 21931118@qq.com
	 *@blog http://www.yiiframe.com
	 *@date 2019/1/1 07:25:00
	 */
	import moment from '@/common/moment';
	import mConstDataConfig from '@/config/constData.config';
	export default {
		data() {
			return {
				current: 0, // 轮播图index
				loadingType: 'more',
				loading: true,
				hasLogin: false,
				advList: [{
						"id": "1",
						"adv_title": "玻璃居然可以折叠！长宁这家企业的黑科技惊艳世界移动通信大会",
						"cover": "http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg"
					},
					{
						"id": "1",
						"adv_title": "玻璃居然可以折叠！长宁这家企业的黑科技惊艳世界移动通信大会",
						"cover": "http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg"
					},
				],
				notifyList: [{
						"id": "1",
						"is_read": "0",
						"type": "1",
						"created_at": "1649730620",
						"notifySenderForMember": {
							"id": "1",
							"title": "防疫安全通知",
							"content": "2021年10月16日，航天员翟志刚、王亚平、叶光富在酒泉卫星发射中心搭乘神舟十三号载人飞船进入天和核心舱，成为入住中国空间站的第二批航天员"
						}
					},
					{
						"id": "1",
						"is_read": "0",
						"type": "1",
						"created_at": "1649730620",
						"notifySenderForMember": {
							"id": "1",
							"title": "防疫安全通知",
							"content": "2021年10月16日，航天员翟志刚、王亚平、叶光富在酒泉卫星发射中心搭乘神舟十三号载人飞船进入天和核心舱，成为入住中国空间站的第二批航天员"
						}
					},
					{
						"id": "1",
						"is_read": "0",
						"type": "1",
						"created_at": "1649730620",
						"notifySenderForMember": {
							"id": "1",
							"title": "防疫安全通知",
							"content": "2021年10月16日，航天员翟志刚、王亚平、叶光富在酒泉卫星发射中心搭乘神舟十三号载人飞船进入天和核心舱，成为入住中国空间站的第二批航天员"
						}
					},
					{
						"id": "1",
						"is_read": "0",
						"type": "1",
						"created_at": "1649730620",
						"notifySenderForMember": {
							"id": "1",
							"title": "防疫安全通知",
							"content": "2021年10月16日，航天员翟志刚、王亚平、叶光富在酒泉卫星发射中心搭乘神舟十三号载人飞船进入天和核心舱，成为入住中国空间站的第二批航天员"
						}
					},
				],

			};
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
			},
			notifyTypeFilter(val) {
				return mConstDataConfig.notifyTypeList[val].content;
			}
		},
		onShow() {
			this.loading = false;
			uni.stopPullDownRefresh();

			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
			uni.setNavigationBarTitle({
				title: uni.getStorageSync('siteInfo').web_site_title ? uni.getStorageSync('siteInfo')
					.web_site_title : this.$mSettingConfig.appName
			});
			uni.setTabBarStyle({
				selectedColor: this.themeColor.color,
				borderStyle: 'white'
			});
			this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				uni.setTabBarItem({
					index,
					selectedIconPath
				});
			});
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.loading = false;
			uni.stopPullDownRefresh();
		},

		methods: {
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current;
			},
			// 通用跳转
			async navTo(route) {
				this.$mRouter.push({
					route
				});
			},

		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	/*轮播图*/
	.swiper {
		width: 100%;
		margin-top: 20upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}
		}
	}

	.notify {

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.header {
			width: 100%;
			padding-left: $font-lg;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 10;
			background-color: #fff;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);

			/*  #endif  */
			.title {
				font-size: 36upx;
			}
		}

		.place {
			background-color: #ffffff;
			height: 100upx;
			/*  #ifdef  APP-PLUS  */
			margin-top: var(--status-bar-height);
			/*  #endif  */
		}

		.notify-list {
			.read {
				text-align: right;
				margin-right: $spacing-base;
				margin-top: $spacing-base;
				margin-bottom: $spacing-sm;

				text {
					margin-left: $spacing-base;
				}
			}

			.row {
				width: calc(94%);
				height: calc(22vw + 40upx);
				margin: 0 auto $spacing-base;
				border-radius: 15upx;
				box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;
				position: relative;
				overflow: hidden;
				z-index: 4;
				border: 0;

				.menu {
					.iconfont {
						color: #fff;
						font-size: 60upx;
					}

					position: absolute;
					width: 29%;
					height: 100%;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					z-index: 2;
				}

				.carrier {
					@keyframes showMenu {
						0% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-30%);
						}
					}

					@keyframes closeMenu {
						0% {
							transform: translateX(-30%);
						}

						100% {
							transform: translateX(0);
						}
					}

					&.open {
						animation: showMenu 0.25s linear both;
					}

					&.close {
						animation: closeMenu 0.15s linear both;
					}

					background-color: #fff;
					position: absolute;
					width: 100%;
					padding: 0 0;
					height: 100%;
					z-index: 3;
					display: flex;
					align-items: center;
				}
			}

			.notify-wrapper {
				background-color: $color-white;
				width: 100%;
				padding: $spacing-base $spacing-lg $spacing-base 80upx;
				margin: $spacing-base 0 0;
				border-radius: 15upx;
				position: relative;

				.title {
					font-size: $font-lg;
					color: $font-color-dark;
					font-weight: 500;
					margin: 0 0 $spacing-sm;
				}

				.content {
					font-size: $font-sm;
					color: $font-color-base;
					height: 75upx;
					line-height: 36upx;
				}

				.time {
					font-size: $font-base;
					color: $font-color-light;
				}

				.type {
					position: absolute;
					top: 26upx;
					left: -10upx;
					border: none;
					font-size: $font-sm;
					opacity: 0.8;
				}

				.un-read {
					display: inline-block;
					width: 12upx;
					height: 12upx;
					border-radius: 50%;
					position: absolute;
					top: 32upx;
					right: 30upx;
				}
			}
		}

		.notify-empty {
			position: fixed;
			left: 0;
			top: 50;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			.iconfont {
				font-size: $font-lg + 100upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm + 2upx;
				color: $font-color-disabled;

				.navigator {
					margin-left: 16upx;
				}
			}
		}
	}
</style>
