import { createApp as create } from "vue";
import { ConfigProvider, NavBar } from "vant";
import App from "./App.vue";
import store from "@store/index";
import router from "@router/index";
import "./style/van-variables.css";
import "./main.css";
import "windi.css";

export default function createApp() {
	const container = document.createElement("div");
	container.id = "app";
	container.style.width = "100%";
	container.style.height = "100%";
	document.body.appendChild(container);

	const app = create(App);

	// store and router
	app.use(store);
	app.use(router);

	// van-components
	app.use(ConfigProvider);
	app.use(NavBar);

	// mount app
	app.mount("#app");

	return app;
}
