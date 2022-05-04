<template>
	<view class="oa-notice-detail">
		<view class="article-meta" v-if="newsDetail.created_at">
			<text class="article-author">{{ newsDetail.author|| companyName || appName  }}</text>
			<text class="article-text">发布于</text>
			<text class="article-time">{{ newsDetail.created_at | time }}</text>
			<text class="article-text">浏览 {{ newsDetail.view }}</text>
		</view>
		<view class="article-content">
			<oa-uparse :content="newsDetail.content" />
		</view>
		<oa-empty
			info="暂无详情"
			v-if="!newsDetail && !loading"
		></oa-empty>
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
import { news } from '@/api/basic';
import moment from '@/common/moment';
export default {
	components: {
	},
	data() {
		return {
			newsDetail: {"id":1,"content":"<img src='http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg'>在“柔性玻璃盖板”体验展示台前，观展者惊奇地发现，人们印象中又硬又脆的玻璃竟可以被拉动卷曲！整个体验装置被摆放在一个透明玻璃匣中，仅有一根长柄把手外露。当人拉住把手向外拖动时，一张a4纸大小的“薄膜”在眼前缓缓展开。而放开手后，装置又会带动其卷曲使其还原。通过另一侧的手动折叠夹装置，参观者还可以亲手体验玻璃可折叠的神奇之处。此外，现场工作人员还展示了“柔性玻璃盖板”另一项“黑科技”特征即超强的抗压性，一支尖头笔在距离台面20厘米高的位置，反复坠落、击打“柔性玻璃盖板”后其依旧保持完好无损。\r\n\r\n\r\n\r\n研发这项黑科技的是北新泾街道服务的重点企业——上海尚钏科技有限公司。立足于符合上海“五型”经济发展和长宁重点产业发展布局，北新泾街道联手区科委引进了发展前景较好的上海尚钏科技有限公司。尚钏科技技术领先、发展潜力巨大，后期还将在上海长宁建立研发总部和地区总部，立足上海，辐射长三角，服务全球，预计三年左右实现子公司和母公司的整体上市。\r\n\r\n\r\n\r\n尚钏科技企业负责人表示，虽然目前99%的超薄柔性玻璃主要运用于智能手机行业，但随着显示产业往柔性、可折叠的趋势发展及生产技术的进一步成熟，未来超薄柔性玻璃盖板将逐渐向智慧穿戴、智慧出行、智慧教育、智慧办公等领域渗透，应用到汽车、机器人、手表、电脑、键盘、家居用品等越来越多的科技产品中，将进一步改变人们的生活。公司有信心在政府配套政策与产业能级扶持下，实现相关技术领域的“弯道超车”。目前，公司已与南通苏锡通科技产业园区签署投资协议，将投资60亿元人民币建设年产5,000万片超薄柔性玻璃盖板项目，项目全部建成后，产值将达到100亿元人民币，必将大大提高我国科技产业软实力。\r\n\r\n资料：北新泾\r\n\r\n编辑：吴友康、毕扬静\r\n\r\n\r\n\r\n","author":"UNI办公","view":376,"created_at":1617471384},
			appName: this.$mSettingConfig.appName,
			companyName:'维博网络',
			id: undefined,
			loading: false
		};
	},
	filters: {
		// 时间格式化
		time(val) {
			return moment(val * 1000).format('YYYY-MM-DD HH:mm');
		}
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
	
	// 下拉刷新
	onPullDownRefresh() {
		this.loading = false;
		uni.stopPullDownRefresh();
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
.oa-notice-detail {
	.banner {
		overflow: hidden;
		position: relative;
		background-color: #ccc;
		.banner-img {
			height: 300upx;
			width: 100%;
		}
		.banner-title {
			max-height: 84upx;
			overflow: hidden;
			position: absolute;
			bottom: 0;
			width: 100%;
			font-size: 32upx;
			font-weight: 400;
			line-height: 42upx;
			color: white;
			z-index: 11;
			background-color: rgba(0, 0, 0, 0.25);
			padding: 4upx 20upx;
		}
	}
	.banner-title {
		padding: $spacing-lg $spacing-lg 0;
		font-size: $font-lg;
	}
	.article-meta {
		padding: 20upx 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;

		.article-text {
			font-size: 30upx;
			margin: 0 20upx;
		}

		.article-author,
		.article-time {
			font-size: 30upx;
		}
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
}
</style>
