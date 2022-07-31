import { createStore } from "vuex";
import { setStorageSync, getStorageSync } from "kbone-api";

export default createStore({
	state: {
		profile: getStorageSync("profile"),
		userInfo: null,
		title: "App"
	},
	getters: {
		role({ profile }) {
			return profile ? profile.role : "unauthenticated";
		},
		uuid({ profile }) {
			return profile ? profile.uuid : "unauthenticated";
		}
	},
	mutations: {
		SET_PROFILE(state, data) {
			console.log(data);
			setStorageSync("profile", data);
			state.profile = data;
		},
		SET_TITLE(state, data) {
			console.log(`title: ${data}`);
			state.title = data;
		}
	}
});
