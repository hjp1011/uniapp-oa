<template>
	<view class="oa-notice-detail">

		<view class="input-title">
			<text>{{worksDetail.content}}</text>
		</view>

		<view class="covers-body covers-uploader oa-uploader" v-if="imageList&&imageList.length !== 0 ">
			<view class="uni-uploader">
				
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<oa-image class="uni-uploader__img" :src="image"></oa-image>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-timeline">
			<view class="uni-timeline-item" :class="[
						index === 0 ? `text-${themeColor.name} uni-timeline-first-item` : '',
						index === approveDetail.length - 1 ? 'uni-timeline-last-item' : ''
					]"
			 v-for="(item, index) in approveDetail" :key="index">
				<view class="uni-timeline-item-divider"></view>
				<view class="uni-timeline-item-content">
					<view>
						{{ item.approve }}
					</view>
					<view class="datetime">
						{{item.name}} {{ item.suggest }} {{ item.time | time }}
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="feedback-title">
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入 <text class="iconfont iconxia"></text></text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请详细描述您的意见..." v-model="sendDate.suggest" class="feedback-textare" />
			</view>
		<view class="footer" >
				<view v-for="(item, index) in radioList" :key="index">
				<button class="action-btn" :class="'bg-' + themeColor.name" @tap="handleWorksOperation(item.id)">
					{{item.title}}
				</button>
				</view>
		</view>
		
		<!--加载动画-->
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

	export default {
		data() {
			return {
				reset:0,
				audit_id:'',
				type:'',
				msgContents: [
					'同意',
					'不同意',
					'其他原因'
				],
				sendDate: {
					type: '1',
					suggest: '',
					contact_way: ''
				},
				worksDetail: {"id":3,"merchant_id":0,"member_id":1,"cate_id":1,"content":"YiiFrame申请设备报修报修,报修原因:东西坏了","log":[{"id":2,"time":1649755005,"action":"Repair/agree","suggest":"同意了","name":"李四","approve":"通过"},{"id":2,"time":1649754391,"action":"Repair/audit","suggest":"","name":"李四","approve":"审核"},{"id":1,"time":1649749891,"action":"Repair/apply","suggest":"提交申请","name":"YiiFrame","approve":"申请"}],"remind":1,"sort":0,"state":"agree","covers":null,"status":"Repair/agree","created_at":1649749891,"updated_at":1649755005},
				approveDetail:[{"id":2,"time":1649755005,"action":"Repair/agree","suggest":"同意了","name":"李四","approve":"通过"},{"id":2,"time":1649754391,"action":"Repair/audit","suggest":"","name":"李四","approve":"审核"},{"id":1,"time":1649749891,"action":"Repair/apply","suggest":"提交申请","name":"YiiFrame","approve":"申请"}],
				radioList:[{"id":"Get/audit","title":"审核"},{"id":"Get/refused","title":"拒绝"}],
				imageList:['http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg','http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg','http://wephp-oa.oss-cn-shenzhen.aliyuncs.com/images/2021/02/28/image_1614523552_Kn0343m3.jpg',],
				loading: true
			};
		},
		computed: {

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
		
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: `/pages/index/notice/detail?id=${this.id}`
			};
		},
		methods: {
			// 快速输入
			chooseMsg() {
				uni.showActionSheet({
					itemList: this.msgContents,
					success: res => {
						this.sendDate.suggest = this.msgContents[res.tapIndex];
					}
				});
			},

			async handleWorksOperation(status) {//审核
					this.$mHelper.toast('操作成功');
					this.$mRouter.back();
			},
			
		},
		
	};
</script>

<style lang="scss">
	.oa-notice-detail {
		
		.uni-timeline {
			padding: $spacing-lg;
			background-color: $color-white;
		}
		.feedback-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: $spacing-base;
			margin-top: $spacing-base;
			font-size: $font-base;
			background-color: $color-white;
		}

		.feedback-star-view.feedback-title {
			justify-content: flex-start;
			margin: 0;
		}

		.feedback-quick {
			position: relative;
			padding-right: 40upx;
			.iconfont {
				font-size: $font-sm;
			}
		}

		.feedback-body {
			background: $color-white;
			padding: $spacing-sm $spacing-base;
			.gender-item {
				margin-right: 20upx;

				.gender-item-text {
					padding-left: 10upx;
				}

				radio .wx-radio-input.wx-radio-input-checked {
					background: $uni-color-primary;
					border-color: $uni-color-primary;
				}
			}
		}

		.feedback-textare {
			height: 1200upx;
			font-size: 34upx;
			line-height: 50upx;
			width: 100%;
			box-sizing: border-box;
			padding: 20upx 30upx 0;
		}
		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 98;
			width: 100%;
			background-color: $color-white;
			color: $font-color-base;
			box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 15upx $spacing-base;
			.action-btn {
				font-size: $font-sm;
				margin: 0 0 0 15upx;
				padding: 0 $spacing-lg;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				// background-color: #F37B1D;
				// color: #fff;
			}
		}
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
			padding: 20upx 40upx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			color: gray;

			.article-text {
				font-size: 26upx;
				line-height: 50upx;
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

		.input-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: $spacing-base;
			margin-top: $spacing-base;
			font-size: $font-base;
			background: $color-white;
		}

		.input-body {
			background: $color-white;
			padding: $spacing-sm $spacing-base;
		}
		.covers-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: $spacing-base;
			margin-top: $spacing-base;
			font-size: $font-base;

		}
		.covers-body {
			background: $color-white;
			padding: $spacing-sm $spacing-base;
			.gender-item {
				margin-right: 20upx;

				.gender-item-text {
					padding-left: 10upx;
				}

				radio .wx-radio-input.wx-radio-input-checked {
					background: $uni-color-primary;
					border-color: $uni-color-primary;
				}
			}
		}
		.covers-uploader {
			padding: 22upx 20upx;
		}
	}
</style>
