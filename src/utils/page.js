/**
 * @页面相关操作
 */
import store from "@store/index";

// 设置页面标题
export function setPageTitle(title = "App") {
	store.commit("SET_TITLE", title);
}
