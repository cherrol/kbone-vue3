import { createRouter, createWebHistory } from "vue-router";
import { endGuard, frontGuard } from "@router/guards";
import Home from "@pages/Home.vue";
import Profile from "@pages/Profile.vue";
import Staging from "@pages/Staging.vue";
import Login from "@pages/user/Login.vue";
import Register from "@pages/user/Register.vue";

/**
 * @tabBar 是否显示底部导航栏
 * @backButton 是否显示返回按钮
 * @navBarBackgroundColor 顶部导航栏背景颜色
 * @navBarTitleTextColor 支对齐微信小程序设置，仅支持 #ffffff 和 #000000
 */
const routes = [
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: { backButton: true }
	},
	{
		path: "/register",
		name: "register",
		component: Register,
		meta: {
			backButton: true,
			navBarBackgroundColor: "#eee",
			navBarTitleTextColor: "#000000"
		}
	},
	{
		path: "/home",
		component: Home,
		name: "home",
		meta: { tabBar: true }
	},
	{
		path: "/profile",
		component: Profile,
		name: "profile",
		meta: { tabBar: true }
	},
	{
		path: "/staging",
		component: Staging,
		name: "staging",
		meta: { tabBar: true }
	},
	/**
	 * @没有匹配的路由时重定向到首页
	 */
	{
		path: "/",
		redirect: (to) => {
			return {
				path: "/home",
				query: { q: to.params.searchText }
			};
		}
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

// 全局路由守卫
router.beforeEach(frontGuard);
router.afterEach(endGuard);

export default router;
