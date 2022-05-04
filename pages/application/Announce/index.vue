<template>
	<view class="secret">
		<view class="notify-list">
			<view v-for="(item, index) in noticeList" :key="index" class="row" @tap="navTo(item)">
				<view class="carrier">
					<view class="notify-wrapper">
						<view class="title in1line">{{item.notifySenderForMember.title}}</view>
						<view class="content in2line">{{item.notifySenderForMember.content}}</view>
						<view class="time">{{item.created_at | time}}</view>
						<view class="un-read" :class="'bg-'+themeColor.name" v-if="item.is_read.toString() === '0'">
						</view>

					</view>
				</view>
			</view>
		</view>

		<oa-load-more v-if="noticeList.length > 0" :status="loadingType" />
		<oa-empty :info="'还没有内容~'" v-if="noticeList.length === 0 && !loading"></oa-empty>
		<!--加载动画-->
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
	import $mAssetsPath from '@/config/assets.config';
	export default {
		data() {
			return {
				noticeList: [{
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
				loadingType: 'more',
				loading: false,
				page: 1,
				theIndex: null,
				oldIndex: null
			};
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm');
			},
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
			uni.stopPullDownRefresh();
			this.loadingType = this.noticeList.length === 4 ? 'more' : 'nomore';
			this.loading = false;
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.loading = false;
			uni.stopPullDownRefresh();
		},
		// 加载更多
		onReachBottom() {
			if (this.loadingType === 'nomore' || this.noticeList.length === 0) return;
			this.page++;
		},

		methods: {

			// 通用跳转
			async navTo(item) {
				let route;
				this.$mRouter.push({
					route: `/pages/application/News/detail?id=${item.id}`
				});
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.secret {
		.add-round {
			position: fixed;
			z-index: 999;
			right: 30rpx;
			bottom: 30rpx;
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			color: #fff;
			text-align: center;
			line-height: 120rpx;
			font-weight: 100;
			font-size: 80rpx;
		}

		.notify-list {
			margin-top: 20upx;

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
				padding: $spacing-base $spacing-lg $spacing-base $spacing-lg;
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
			top: 0;
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
