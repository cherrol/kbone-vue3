<template>
	<div class="page-app w-full h-full flex flex-col">
		<div
			class="flex-none custom-nav-bar"
			:style="{
				paddingTop: statusBarHeight + 'px',
				'--van-nav-bar-height': navBarHeight + 'px',
				'--nav-bar-background-color': navBarBackgroundColor,
				'--van-nav-bar-title-text-color': navBarTitleTextColor,
				'--van-nav-bar-icon-color': navBarTitleTextColor
			}"
		>
			<CustomNavBar />
		</div>
		<div class="flex-auto">
			<router-view />
		</div>
		<div v-if="tabBar" class="flex-none custom-tab-bar">
			<CustomTabBar />
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted, onUpdated, computed } from "vue";
import { useStore } from "vuex";
import { getSystemInfoSync } from "kbone-api";
import CustomNavBar from "@components/navigation/CustomNavBar.vue";
import CustomTabBar from "@components/navigation/CustomTabBar.vue";
import { setPageTitle } from "@utils/page";

export default {
	components: { CustomNavBar, CustomTabBar },
	setup() {
		const statusBarHeight = ref(0);
		const navBarHeight = ref(0);
		const store = useStore();
		const tabBar = computed(() => store.state.tabBar);
		const navBarBackgroundColor = computed(
			() => store.state.navBarBackgroundColor
		);
		const navBarTitleTextColor = computed(
			() => store.state.navBarTitleTextColor
		);

		onMounted(() => {
			console.log("App Mounted");

			setPageTitle("App");

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
				console.log("is Others");
				navBarHeight.value = 46;
			}
		});

		onUpdated(() => {
			// console.log(showLeftArrow.value);
		});

		onUnmounted(() => {
			console.log("App Unmounted");
		});

		return {
			statusBarHeight,
			navBarHeight,
			tabBar,
			navBarBackgroundColor,
			navBarTitleTextColor
		};
	}
};
</script>
<style lang="scss">
.custom-nav-bar {
	background-color: var(--nav-bar-background-color);
}
</style>
