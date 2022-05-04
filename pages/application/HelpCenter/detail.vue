<template>
	<view class="helper-detail" v-if="!loading">
		<view v-if="helperDetail.title" class="detail">
			<oa-parser lazy-load :html="helperDetail.content || ''"></oa-parser>
		</view>
		<oa-empty :info="`暂无帮助内容`" v-if="!helperDetail.title && !loading"></oa-empty>
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
	export default {
		data() {
			return {
				loading: true,
				helperDetail: {
					'title': '怎样注册用户',
					'content': '<img src="http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg">第一步：输入手机号，接收验证码进行注册<br><br><img src="http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg">第二步：输入密码并确认密码'
				},
			};
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
		},
		onLoad(option) {
			this.loading = false;
			uni.setNavigationBarTitle({
				title: '怎样注册用户'
			});
		},
		methods: {


		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $page-color-base;
	}

	.helper-detail {
		.detail {
			text-align: left;
			padding: $spacing-base $spacing-base;

			.title {
				font-size: $font-lg;
				color: $font-color-dark;
				padding: $spacing-base 0;
			}
		}
	}
</style>
