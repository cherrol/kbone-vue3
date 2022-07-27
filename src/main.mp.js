import { createApp as create } from "vue";
import App from "./App.vue";
import store from "@store/index";
import router from "@router/index";
import { ConfigProvider } from "vant";
import "./main.css";
import "windi.css";

export default function createApp() {
	const container = document.createElement("div");
	container.id = "app";
	container.style.width = "100%";
	container.style.height = "100%";
	document.body.appendChild(container);

	const app = create(App);

	app.use(store);
	app.use(router);
	app.use(ConfigProvider);

	app.mount("#app");

	return app;
}
