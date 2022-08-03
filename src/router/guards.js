import store from "@store/index";
import { setNavigationBarColor } from "kbone-api";

/**
 * @全局前置路由守卫
 */
export function frontGuard(to, from) {
	// console.log(`${from.name} => ${to.name}`);

	if (
		// 检查用户是否已登录
		store.getters.role === "unauthenticated" &&
		// ❗️ 避免无限重定向
		to.name !== "login"
	) {
		// 将用户重定向到登录页面
		return { name: "login" };
	}
}

/**
 * @全局后置路由守卫
 */
export function endGuard(to, from) {
	// console.log(`${from.name} => ${to.name}`);

	/**
	 * @设置是否显示底部导航栏
	 */
	if (to.meta.tabBar) {
		store.commit("SET_TAB_BAR", true);
	} else {
		store.commit("SET_TAB_BAR", false);
	}

	/**
	 * @设置是否显示返回按钮
	 */
	if (to.meta.backButton) {
		store.commit("SET_BACK_BUTTON", true);
	} else {
		store.commit("SET_BACK_BUTTON", false);
	}

	/**
	 * @设置顶部导航栏背景颜色
	 */
	if (to.meta.navBarBackgroundColor) {
		store.commit("SET_NAV_BAR_BACKGROUND_COLOR", to.meta.navBarBackgroundColor);
	} else {
		store.commit("SET_NAV_BAR_BACKGROUND_COLOR", null);
	}

	/**
	 * @设置顶部导航栏文字颜色（以及按钮）
	 */
	if (to.meta.navBarTitleTextColor) {
		store.commit("SET_NAV_BAR_TITLE_TEXT_COLOR", to.meta.navBarTitleTextColor);
		setNavigationBarColor({
			frontColor: to.meta.navBarTitleTextColor,
			backgroundColor: "#449968"
		});
	} else {
		store.commit("SET_NAV_BAR_TITLE_TEXT_COLOR", null);
		setNavigationBarColor({
			frontColor: "#ffffff",
			backgroundColor: "#449968"
		});
	}
}
