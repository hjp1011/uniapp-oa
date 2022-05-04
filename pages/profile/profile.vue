<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box" @tap="navTo(userInfo ? '/pages/user/userinfo/userinfo' : 'login')">
					<image class="portrait" :src="userInfo.head_portrait || headImg"></image>
					<text class="username">
						{{ userInfo.realname ||'登录/注册'}} {{ '总经理'}}
						{{ userInfo.mobile || '没有填写手机号'}}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<view class="b-btn">
					{{'市场部'}}
				</view>
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					{{ siteInfo.web_site_title || '未知' }}
				</view>
				<text class="e-m">{{ siteInfo.web_contact || '技术支持QQ:21931118' }}</text>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view class="cover-container" :style="[
			{
				transform: coverTransform,
				transition: coverTransition
			}
		]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" :src="arc"></image>
			<!--个人中心-->
			<view class="promotion-center">
				<oa-list-cell icon="iconfenlei" :iconColor="themeColor.color" navigateType=""
					:title="applicationList.title"></oa-list-cell>
				<!-- 个人中心 -->
				<view class="order-section">
					<view class="category" v-for="(item, index) in applicationList.list" :key="index"
						@tap.stop="navTo(item.url)">
						<view class="order-item">
							<view class="img">
								<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
							</view>
							<view class="text">{{ item.title }}</view>
							<oa-badge v-if="item.num>0" type="error" size="small" class="badge" :text="item.num">
							</oa-badge>
						</view>

					</view>
				</view>

			</view>
			<!-- 个人资料 -->
			<view class="set">
				<view class="list-cell b-b" :class="{ 'm-t': item.class === 'mT' }" v-for="item in setList"
					:key="item.title" @tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
					<text class="cell-tit">{{ item.title }}</text>
					<text class="cell-tip">{{ item.content }}</text>
					<text class="cell-more iconfont iconyou"></text>
				</view>

			</view>

			<view class="cu-list menu sm-border card-menu" v-if="styleUserIsOpen">
				<view class="cu-item">
					<view class="content flex align-center">
						<text class="cuIcon-colorlens" :class="'text-' + themeColor.name"></text>
						<view class="padding solid radius shadow-blur" :class="'bg-' + themeColor.name"></view>
						<view class="title">主题色：<text :class="'text-' + themeColor.name">{{
							themeColor.title
						}}</text></view>
					</view>
					<view class="action">
						<button class="cu-btn round shadow" @click="showColorModal" :class="'bg-' + themeColor.name">
							<text class="cuIcon-colorlens"></text> 选择主题
						</button>
					</view>
				</view>
			</view>
			<view v-if="hasLogin" class="list-cell log-out-btn" :class="'text-' + themeColor.name" @tap="toLogout">
				<text class="cell-tit">退出登录</text>
			</view>

			<!-- 选择颜色模态框 -->
			<view class="cu-modal" :class="{ show: colorModal }">
				<view class="cu-dialog">
					<view class="cu-bar justify-end solid-bottom">
						<view class="content">选择颜色</view>
						<view class="action" @tap="colorModal = false">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="grid col-5 padding">
						<view class="padding-xs" v-for="(item, index) in themeList" :key="index" @tap="SetColor(item)"
							:data-color="item.name">
							<view class="padding-tb radius" :class="'bg-' + item.name">
								{{ item.title }}
							</view>
						</view>
					</view>
				</view>
			</view>


		</view>
		<!--页面加载动画-->
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
	import $mAssetsPath from '@/config/assets.config';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		data() {
			return {
				applicationList: {
					"title": "个人管理",
					"list": [{
						"title": "我的公告",
						"name": "Announce",
						"icon": "icontongzhi",
						"url": "/pages/application/Announce/index",
						"num": 4
					}, {
						"title": "我的日程",
						"name": "Calendar",
						"icon": "iconricheng",
						"url": "/pages/application/Calendar/index",
						"num": 0
					}, {
						"title": "我的日志",
						"name": "DailyWork",
						"icon": "iconzongjie",
						"url": "/pages/application/DailyWork/index",
						"num": 0
					}, {
						"title": "我的消息",
						"name": "Message",
						"icon": "iconxiaoxi7",
						"url": "/pages/application/Message/index",
						"num": 1
					}, {
						"title": "我的总结",
						"name": "Summary",
						"icon": "iconicon-test21",
						"url": "/pages/application/Summary/index",
						"num": 0
					}]
				},
				userInfo: {
					'realname': '张三',
					'mobile': '18986860001'
				},
				siteInfo: {
					"web_site_title": "维博网络科技",
					"web_about_me": "维博网络是一家提供高品质软件开发服务的精英团队",
					"web_contact": "联系地址:湖北省武汉市 联系方式QQ:21931118 我们可以为您提供全平台应用程序及游戏开发，其中包括移动应用程序"
				},
				colorModal: false,
				mycenterList: this.$mConstDataConfig.mycenterList,
				themeList: this.$mConstDataConfig.themeList,
				styleUserIsOpen: this.$mSettingConfig.styleUserIsOpen,
				setList: this.$mConstDataConfig.setList,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				vipCardBg: this.$mAssetsPath.vipCardBg,
				arc: this.$mAssetsPath.arc,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				loading: true,
				hasLogin: true
			};
		},
		onLoad() {
			this.setList[2].content = `${uni.getStorageInfoSync().currentSize} kb`;
			this.setList[5].content = `当前版本 2.1.1`;
			uni.setTabBarStyle({
				selectedColor: this.themeColor.color,
				borderStyle: 'white'
			});
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
			this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				uni.setTabBarItem({
					index,
					selectedIconPath
				});
			});
			this.loading = false;

		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}
		},
		methods: {
			// 退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: e => {
						if (e.confirm) {
							uni.reLaunch({
								url: '/pages/public/login'
							});
						}
					}
				});
			},
			showColorModal() {
				this.colorModal = true;
			},
			SetColor(item) {
				this.colorModal = false;
				this.themeColor = item;
				this.$mStore.commit('setThemeColor', item);
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

			// 统一跳转接口,拦截未登录路由
			navTo(route) {
				if (!route) return;
				if (!this.hasLogin) {
					uni.removeStorageSync('backToPage');
					this.$mRouter.push({
						route: '/pages/public/login'
					});
				} else {
					if (route === 'clearCache') {
						uni.showModal({
							content: '确定要清除缓存吗',
							success: e => {
								if (e.confirm) {
									uni.clearStorageSync();
									this.setList[2].content = '0 kb';
									this.$mHelper.toast('清除缓存成功');
								}
							}
						});
						return;
					}
					this.$mRouter.push({
						route
					});
				}
			},

			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}
				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},


		}
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: $page-color-base;
	}

	.user {
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

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.no-foot-print {
			text-align: center;
			padding: 48upx 0;

			.no-foot-print-icon {
				font-size: $font-lg + 2upx;
				margin-right: 10upx;
			}
		}

		.set {
			padding: $spacing-base 0;

		}

		.cu-list.card-menu {
			margin: $spacing-base 0;

			.title {
				margin-left: $spacing-base;
			}
		}

		.user-section {
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}

			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;

				.portrait-box {
					display: flex;
					align-items: center;

					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: $font-lg + 6upx;
						color: $color-white;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: $font-lg + 6upx;
						color: $font-color-dark;
						border: none;
					}

					button::after {
						border: none;
					}
				}
			}

			.vip-card-box {
				display: flex;
				flex-direction: column;
				color: #f7d680;
				height: 240upx;
				background: url('/static/vip-card.png');
				background-size: 100% 100%;
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;

				.b-btn {
					position: absolute;
					right: 24upx;
					top: 24upx;
					width: 160upx;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size: 22upx;
					color: #36343c;
					border-radius: 20px;
					background: linear-gradient(to left, #f9e6af, #ffd465);
					z-index: 1;
				}

				.tit {
					font-size: $font-base + 2upx;
					color: #f7d680;
					margin-bottom: 28upx;

					.iconfont {
						color: #f6e5a3;
						display: inline-block;
						margin-right: 16upx;
					}
				}
			}
		}

		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: $page-color-base;

			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}

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

			.tj-sction {
				@extend %section;
				display: flex;

				.tj-item {
					@extend %flex-center;
					flex: 1;
					flex-direction: column;
					margin: 30upx 0;
					font-size: $font-sm;
					color: #75787d;
					/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
				}

				/*.tj-item:last-child {*/
				/*border-right: none;*/
				/*}*/
				.num {
					font-size: $font-base;
				}

				.red {
					color: $base-color;
				}
			}

		}
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		justify-content: space-around;
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
</style>
