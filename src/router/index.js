import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@pages/Home.vue";
import PageProfile from "@pages/Profile.vue";
import PageStaging from "@pages/Staging.vue";

const routes = [
	{ path: "/", component: PageHome },
	{ path: "/profile", component: PageProfile },
	{ path: "/staging", component: PageStaging }
];

export default createRouter({
	history: createWebHistory(),
	routes
});
