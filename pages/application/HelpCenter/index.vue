<template>
	<view class="helperList" v-if="!loading">
		<!-- 帮助列表 -->
		<view v-if="helperList.length > 0">
			<uni-collapse v-for="(fItem, fIndex) in helperList" :key="fIndex">
				<uni-collapse-item open :title="fItem.title">
					<view class="helper-child-item" v-for="(sItem, sIndex) in fItem.child" :key="sIndex"
						@tap="navTo(`/pages/application/HelpCenter/detail?id=${sItem.id}`)">
						<text>{{ sItem.title }}</text>
						<text class="iconfont iconyou"></text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<oa-empty info="暂无站点帮助" v-if="helperList.length === 0 && !loading"></oa-empty>
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
				helperList: [{
					"id": "1",
					"title": "用户中心",
					"pid": "0",
					"level": "1",
					"child": [{
						"id": "2",
						"title": "怎样注册用户",
						"pid": "1",
						"level": "2",
						"child": []
					}, {
						"id": "3",
						"title": "用户密码忘记了怎么办？",
						"pid": "1",
						"level": "2",
						"child": []
					}, {
						"id": "4",
						"title": "能使用手机验证码登陆吗？",
						"pid": "1",
						"level": "2",
						"child": []
					}, {
						"id": "5",
						"title": "可自动记住账号密码吗？",
						"pid": "1",
						"level": "2",
						"child": []
					}]
				}, {
					"id": "6",
					"title": "审批流程",
					"pid": "0",
					"level": "1",
					"child": [{
						"id": "7",
						"title": "怎样报销？",
						"pid": "6",
						"level": "2",
						"child": []
					}, {
						"id": "8",
						"title": "报修流程",
						"pid": "6",
						"level": "2",
						"child": []
					}, {
						"id": "9",
						"title": "怎样领用物品",
						"pid": "6",
						"level": "2",
						"child": []
					}, {
						"id": "10",
						"title": "怎样请假？",
						"pid": "6",
						"level": "2",
						"child": []
					}]
				}, {
					"id": "11",
					"title": "考勤管理",
					"pid": "0",
					"level": "1",
					"child": [{
						"id": "12",
						"title": "排班",
						"pid": "11",
						"level": "2",
						"child": []
					}, {
						"id": "13",
						"title": "班次设置",
						"pid": "11",
						"level": "2",
						"child": []
					}, {
						"id": "14",
						"title": "怎样查看自己的排班",
						"pid": "11",
						"level": "2",
						"child": []
					}, {
						"id": "15",
						"title": "怎样签到和签退",
						"pid": "11",
						"level": "2",
						"child": []
					}]
				}],
				page: 1
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
		onLoad() {
			this.loading = false;
		},
		methods: {
			// 通用跳转
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},

		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $page-color-base;
	}

	.helperList {
		margin-top: $spacing-base;

		.helper-child-item {
			margin: $spacing-base $spacing-lg;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
