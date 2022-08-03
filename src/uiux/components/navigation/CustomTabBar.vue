<template>
	<van-tabbar v-model="active" :fixed="false" route>
		<van-tabbar-item to="/home" name="home" icon="wap-home">
			Home
		</van-tabbar-item>
		<van-tabbar-item to="/staging" name="staging" icon="point-gift">
			Staging
		</van-tabbar-item>
		<van-tabbar-item to="/profile" name="profile" icon="manager">
			Profile
		</van-tabbar-item>
	</van-tabbar>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import { Button, Tabbar, TabbarItem } from "vant";
import "vant/lib/button/style";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";

export default {
	name: "CustomTabBar",
	components: {
		[Button.name]: Button,
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	setup() {
		const active = ref("home");

		onMounted(() => {
			// console.log("page1 mounted");
		});

		onUnmounted(() => {
			// console.log("page1 unmounted");
		});

		return {
			active
		};
	}
};
</script>

<style lang="scss"></style>
