import { createStore } from "vuex";
import { setStorageSync, getStorageSync } from "kbone-api";

export default createStore({
	state: {
		profile: getStorageSync("profile"),
		userInfo: null,
		title: "App",
		tabBar: true,
		backButton: false,
		navBarBackgroundColor: "#449968",
		navBarTitleTextColor: "#ffffff"
	},
	getters: {
		role({ profile }) {
			return profile ? profile.role : "unauthenticated";
		},
		uuid({ profile }) {
			return profile ? profile.uuid : "unauthenticated";
		},
		showBackButton({ showTabBar }) {
			return showTabBar ? false : true;
		}
	},
	mutations: {
		SET_PROFILE(state, data) {
			setStorageSync("profile", data);
			state.profile = data;
		},
		SET_TITLE(state, data) {
			state.title = data;
		},
		SET_TAB_BAR(state, data) {
			state.tabBar = data;
		},
		SET_BACK_BUTTON(state, data) {
			state.backButton = data;
		},
		SET_NAV_BAR_BACKGROUND_COLOR(state, data) {
			state.navBarBackgroundColor = data;
		},
		SET_NAV_BAR_TITLE_TEXT_COLOR(state, data) {
			state.navBarTitleTextColor = data;
		}
	}
});
