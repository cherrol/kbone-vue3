<template>
	<van-nav-bar
		:title="title"
		:left-arrow="backButton"
		@click-left="$router.back()"
	/>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { NavBar } from "vant";
import "vant/lib/nav-bar/style";

export default {
	name: "CustomNavBar",
	components: {
		[NavBar.name]: NavBar
	},
	props: [],
	setup(props) {
		const store = useStore();
		const title = computed(() => store.state.title);
		const backButton = computed(() => store.state.backButton);

		return {
			props,
			backButton,
			title
		};
	}
};
</script>

<style lang="scss"></style>
