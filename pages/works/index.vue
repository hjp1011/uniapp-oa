<template>
	<view class="works">
		<!--搜索导航栏-->
		<view class="works-search" @tap="navTo(`/pages/index/search/search?keyword=搜索我的工作&type=works`)">
			<view class="works-search-input">请输入工作关键字</view>
			<view class="iconfont iconsousuo2"></view>
		</view>
		<!--导航栏-->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="tabCurrentIndex === index ? `text-${themeColor.name} current` : ''" @tap="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<!--工作列表-->
		<swiper class="swiper-box" duration="300" >
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y >
					<view v-for="(item, index) in worksList" :key="index" class="works-item">
						<view class="i-top b-b">
							<text class="time in1line">{{item.member.realname}}</text>
							<text class="state" :class="'text-' + themeColor.name"
								v-if="parseInt(item.works_status, 10) !== 0">{{ item.state | worksStatusFilter }}</text>
						</view>
						<view class="works-box-single" @tap.stop="navToDetail(item,tabItem)">
							<view class="right">
								<text class="title in2line">{{item.content}}</text>
								<text class="attr-box">{{item.created_at | time}}</text>
							</view>
						</view>
					</view>
					<oa-load-more v-if="worksList.length > 0" :status="loadingType"></oa-load-more>
					<oa-empty :info="'还没有内容~'" v-if="worksList.length === 0 && !loading"></oa-empty>
				</scroll-view>
			</swiper-item>
		</swiper>
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
	import mConstData from '@/config/constData.config';
	export default {
		components: {
		},
		data() {
			return {
				tabCurrentIndex: 0,
				page: 1,
				hasLogin: true,
				loading: true,
				worksList: [],
				loadingType: 'more',
				navList: this.$mConstDataConfig.worksNavList,
			};
		},
		filters: {
			// 时间格式化
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss');
			},
			// 状态显示格式化
			worksStatusFilter(worksStatus) {
				let state;
				mConstData.worksStatus.forEach(worksItem => {
					if (worksItem.key === worksStatus) {
						state = worksItem.value;
					}
				});
				return state;
			}
		},

		onShow(options) {
			this.initData();
			this.tabCurrentIndex = parseInt(0, 10);
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
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
			this.page = 1;
			this.worksList.length = 0;
			this.getworksList('refresh');
		},
		// 加载更多
		onReachBottom() {
			if (this.loadingType === 'nomore' || this.worksList.length === 0) return;
			this.page++;
			this.getworksList();
		},
		methods: {
			// 跳转页面
			navToDetail(item) {
				this.$mRouter.push({
					route: `/pages/works/processed?id=${item.id}`
				});
			},

			// 数据初始化
			async initData() {
				// this.hasLogin = this.$mStore.getters.hasLogin;
				this.page = 1;
				this.worksList.length = 0;
				await this.getworksList();
				
				if (!this.hasLogin) {
					uni.removeStorageSync('backToPage');
					this.$mRouter.push({
						route: '/pages/public/login'
					});
				}
			},
			// 获取工作列表
			async getworksList(type) {

				this.worksList = [{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					{
						"id": "1",
						"content": "李四申请设备报修报修,报修原因:手推车维修",
						"state": "apply",
						"status": "1",
						"created_at": "1649912553",
						"member": {
							"realname": "李四"
						}
					},
					
				];
				uni.stopPullDownRefresh();
				this.loadingType = this.worksList.length === 4 ? 'more' : 'nomore';
				this.loading = false;

			},

			// 顶部tab点击
			tabClick(index) {
				this.page = 1;
				this.worksList.length = 0;
				this.tabCurrentIndex = index;
				this.loading = true;
				this.getworksList();
			},
			
		}
	};
</script>
<style lang="scss">
	page,
	.works {
		background: $page-color-base;
		height: 100%;

		.works-search {
			padding: $spacing-sm $spacing-base;
			position: relative;

			.works-search-input {
				width: 100%;
				background-color: $color-white;
				bworks-radius: 40upx;
				padding: $spacing-sm 0 $spacing-sm $spacing-lg;
				color: $font-color-light;
			}

			.iconfont {
				position: absolute;
				right: 48upx;
				top: 22upx;
			}
		}

		.swiper-box {
			height: calc(100% - 80upx);
		}

		.list-scroll-content {
			height: 100%;
			margin-top: 20upx;

			// 工作列表
			.works-item {
				display: flex;
				flex-direction: column;
				padding: 0 30upx;
				background: #fff;
				width: calc(94%);
				height: calc(22vw + 40upx);
				margin: 0 auto $spacing-base;
				border-radius: 15upx;
				box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);

				.i-top {
					display: flex;
					align-items: center;
					height: 80upx;
					padding-right: 30upx;
					font-size: $font-base;
					color: $font-color-dark;
					position: relative;

					.time {
						flex: 1;
					}

					.del-btn {
						padding: 10upx 0 10upx 36upx;
						font-size: $font-lg;
						color: $font-color-light;
						position: relative;

						&:after {
							content: '';
							width: 0;
							height: 30upx;
							border-left: 1px solid $border-color-dark;
							position: absolute;
							left: 20upx;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}

				/* 单条 */
				.works-box-single {
					display: flex;
					margin: 10upx 0;
					// border-bottom: 1px solid rgba(0, 0, 0, 0.05);
					box-shadow: 0 1px 5px rgba(0, 0, 0, 0.02);

					.works-img {
						display: block;
						width: 180upx;
						height: 140upx;
					}

					.red {
						margin: 0 10upx 0 0;
						font-size: $font-sm;
					}

					.point {
						margin: 0 10upx 0 0;
						font-size: $font-sm;
					}

					.right {
						flex: 1;
						display: flex;
						flex-direction: column;
						padding: 0 30upx 0 0;
						overflow: hidden;

						.title {
							font-size: $font-sm;
							line-height: 32upx;
							height: 60upx;
							color: $font-color-dark;
						}

						.attr-box {
							font-size: $font-sm;
							color: $font-color-light;
						}

						.price {
							font-size: $font-sm;
						}
					}
				}

				.price-box {
					display: flex;
					justify-content: flex-end;
					align-items: baseline;
					padding: 15upx 30upx;
					font-size: $font-sm + 2upx;
					color: $font-color-light;

					.num {
						margin: 0 8upx;
						color: $font-color-dark;
					}

					.price {
						font-size: $font-lg;
						color: $font-color-dark;
					}
				}

				.action-box {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 100upx;
					position: relative;

					.action-btn {
						width: 150upx;
						height: 56upx;
						margin: 0 0 0 $spacing-base;
						padding: 0;
						text-align: center;
						line-height: 56upx;
						font-size: $font-sm + 2upx;
					}

					.action-btn::after {
						border: 1upx solid;
					}
				}
			}
		}

		.uni-swiper-item {
			height: auto;
		}
	}
</style>
