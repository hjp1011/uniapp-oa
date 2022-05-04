<template>
	<view class="about" v-if="!loading">
		<view class="detail-info ">
			<view class="about-content" v-if="detail">
				<oa-uparse :content="detail" />
			</view>
		</view>
		<oa-empty :info="`暂无${title}`" v-if="!detail && !loading"></oa-empty>
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
	import {
		configList
	} from '@/api/basic';
	export default {
		components: {
		},
		data() {
			return {
				detail: '<img src="http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg">维博网络是一家提供高品质软件开发服务的精英团队，专注于互联网领域解决方案的发展与创新，我们已为全国多家知名企业提供了相应的技术解决方案，并树立了良好的口碑，积累了丰富的开发经验和成功案例，我们凭借专业的技能，及良好的售后服务质量，亦赢得客户的广泛认可，持续帮助企业实现卓越的业务成果。 移动互联网是当下互联网发展的大趋势，创新网站建设和手机应用也成为众多企业关注的热点。我们可以为您提供全平台应用程序及游戏开发，其中包括移动应用程序（Android，IOS），桌面应用程序（Windows，Linux，Mac），以及浏览器端应用程序（桌面端，移动端）等开发。选择我们，不会错，我们一起拼搏！<p><br>UNI办公系统支持模块化插件安装，通过灵活的功能插件，让企业搭建个性化的CRM、ERP、OA、进销存等系统，具有完善的权限管理，支持企业版和集团版。</p><p><br>UNI办公系统主要为国内企业提供办公自动化信息服务，功能如：工作流、工作审批（报修申请、报销申请、领用申请、申购申请、请假申请、出差申请、加班申请、用工申请、接待申请、用车申请）；个人中心(公告管理、消息管理、工作日志、我的日程、工作总结)；知识管理(新闻动态、管理制度、下载中心等)；日常管理(资产管理、车辆管理、档案管理、考勤管理、巡更巡检、合同管理、后勤采购、就餐统计、通讯录)；人事管理(员工信息、奖惩管理、社保管理等)、考勤管理(班次管理、排班管理、我的排班、签到签退)；巡更巡检(地点管理、巡更班次、巡更计划、我的排班、巡更记录)；意见反馈、站点帮助、在线客服、一键换肤等功能模块。</p>',
				title: null,
				loading: false
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
		onLoad(options) {
			this.initData(options);
		},
		methods: {
			// 数据初始化
			initData(options) {
				this.title = options.title;
				uni.setNavigationBarTitle({
					title: options.title
				});
			},
			
		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
		position: relative;

		.about {
			.detail-info {
				.about-content {
					padding: $spacing-lg;
				}

				text-align: left;

				image {
					width: 240upx;
					height: 240upx;
				}
			}
		}
	}
</style>
