/**
*@des 
*@author yiiframe 21931118@qq.com
*@blog http://www.yiiframe.com
*@date 2019/1/1 07:25:00
*/
/*
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// 权限路由 在main.js可实现路由拦截 所以路由都需要注册 待完善
	promoCode: {
		name: '我的',
		path: '/pages/profile/profile',
		requiresAuth: true
	},

	// 非权限路由
	main: {
		name: '首页',
		path: '/pages/index/index'
	},
	login: {
		name: '登录',
		path: '/pages/public/login'
	},
	index: {
		name: '注册',
		path: '/pages/public/register'
	},
	
};
