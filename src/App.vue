<template>
	<div class="w-full h-full flex flex-col">
		<div
			v-if="!isWin"
			class="flex-none bg-primary custom-nav-bar"
			:style="{
				paddingTop: statusBarHeight + 'px',
				'--van-nav-bar-height': navBarHeight + 'px'
			}"
		>
			<van-nav-bar :title="title" left-arrow @click-left="$router.back()" />
		</div>
		<div class="flex-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted, inject, computed } from "vue";
import { useStore } from "vuex";
import { getSystemInfoSync } from "kbone-api";
import { setPageTitle } from "@utils/page";
import "vant/lib/nav-bar/style";

export default {
	setup() {
		const statusBarHeight = ref(0);
		const navBarHeight = ref(0);
		const isWin = ref(false);
		const store = useStore();

		onMounted(() => {
			console.log("App mounted");
			setPageTitle("Page App");

			const sysInfo = getSystemInfoSync();
			// console.log(JSON.stringify(sysInfo, null, 2));

			// 设置设备状态栏高度留白
			statusBarHeight.value = sysInfo.statusBarHeight;

			// 判断是 IOS 还是 Android
			if (sysInfo.system.indexOf("iOS") > -1) {
				console.log("is iOS");
				navBarHeight.value = 48;
			} else if (sysInfo.system.indexOf("Android") > -1) {
				console.log("is Android");
				navBarHeight.value = 44;
			} else {
				console.log("is others");
				navBarHeight.value = 46;
			}

			// windows 小程序不支持自定义状态栏
			if (sysInfo.system.indexOf("Windows") > -1) {
				console.log("is windows");
				navBarHeight.value = 0;
				isWin.value = true;
			}

			console.log(isWin.value);
		});

		onUnmounted(() => {
			console.log("App unmounted");
		});

		return {
			statusBarHeight,
			navBarHeight,
			isWin,
			title: computed(() => store.state.title)
		};
	}
};
</script>
<style lang="scss">
:root {
	--van-nav-bar-background-color: var(--van-primary-color);
	--van-nav-bar-title-text-color: var(--van-white);
	--van-nav-bar-icon-color: var(--van-white);
	--van-nav-bar-height: 46px;
}
</style>
