<script>
/**
*@des 
*@author yiiframe 21931118@qq.com
*@blog http://www.yiiframe.com
*@date 2019/1/1 07:25:00
*/
/* eslint-disable */
import Vue from 'vue';
import { configList, bindingEquipment } from '@/api/basic';
import { verifyAccessToken } from '@/api/login'
import { mapMutations } from 'vuex';
export default {
	async onLaunch() {
		await this.initData();
	},
	onHide() {},
	methods: {
		...mapMutations(['setNotifyNum']),
		// 数据初始化
		async initData() {
			// 获取页面设置配置

			const _this = this;
			const token = uni.getStorageSync('accessToken');
			// #ifdef APP-PLUS
			// 5+ push 消息推送 ps:使用:H5+的方式监听，实现推送
			plus.push.addEventListener(
				'click',
				function(msg) {
					_this.navTo(JSON.parse(msg.content));
				},
				false
			);
			// 监听在线消息事件
			plus.push.addEventListener(
				'receive',
				function(msg) {
					_this.navTo(JSON.parse(msg.content));
				},
				false
			);
			// #endif
			// 获取系统title高度
			await this.initSystemInfo();
			if (token) {
				await this.handleVerifyAccessToken(token);
			}
			if (this.$mStore.getters.hasLogin) {
				// 初始化数量
				this.setNotifyNum(uni.getStorageSync('notifyNum') || 0);
				// #ifdef APP-PLUS
				const info = plus.push.getClientInfo();
				await this.handleBindingEquipment(info.clientid, token);
				// #endif
			}
			
		},
		// 初始化系统信息
		initSystemInfo() {
			uni.getSystemInfo({
				success(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform === 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 43;
					}
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					const custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
		},


		// 设备绑定(app推送)
		async handleBindingEquipment(id, token) {
			const oauth_client = uni.getSystemInfoSync().platform;
		
		},
		async handleVerifyAccessToken (token) {
			
    },
		// 推送消息跳转
		async navTo(item) {
			let route;
			const id = item.target_id;
			const type = item.target_type;
			switch (type) {
				
				default:
					route = '/pages/index/index';
					break;
			}
			if (route) this.$mRouter.push({ route });
		},
	}
};
</script>
<style lang="scss">
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';
// 导入阿里巴巴矢量图标库
/*#ifdef MP*/
@import './static/css/iconfont/iconfont.css';
/*#endif*/
/*#ifndef MP*/
@import url('https://at.alicdn.com/t/font_1823374_98c45zxwb3c.css');
/*#endif*/
@import './static/css/reset.scss';
@import './static/css/uni.scss';
</style>
