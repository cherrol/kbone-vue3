import { createRouter, createWebHistory } from "vue-router";
import TabBar from "@pages/TabBar.vue";
import Home from "@pages/tabbar/Home.vue";
import Profile from "@pages/tabbar/Profile.vue";
import Staging from "@pages/tabbar/Staging.vue";
import Login from "@pages/user/Login.vue";
import Register from "@pages/user/Register.vue";

const routes = [
	{
		path: "/",
		component: TabBar,
		children: [
			{ path: "home", component: Home },
			{ path: "profile", component: Profile },
			{ path: "staging", component: Staging }
		]
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: "/register",
		component: Register
	}
];

export default createRouter({
	history: createWebHistory(),
	routes
});
