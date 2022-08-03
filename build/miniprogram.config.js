require("dotenv").config({ path: ".env.locale" });
// console.log(process.env.WECHAT_APPID);

module.exports = {
	origin: "https://test.miniprogram.com",
	entry: "/",
	router: {
		index: ["/*"]
	},
	redirect: {
		notFound: "index",
		accessDenied: "index"
	},
	generate: {
		autoBuildNpm: "npm",
		globalVars: [["SVGElement", "function SVGElement() {}"]] // 兼容 vue3 3.0.8+ 版本
	},
	app: {
		navigationStyle: "custom"
	},
	projectConfig: {
		appid: process.env.WECHAT_APPID,
		projectname: "信使小程序"
	}
};
