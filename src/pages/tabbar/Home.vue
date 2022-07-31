<template>
	<div>Page Home</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setNavigationBarTitle } from "kbone-api";
import { setPageTitle } from "@utils/page";

export default {
	name: "PageHome",
	props: [],
	setup(props) {
		const title = ref("Page Home");
		setNavigationBarTitle({
			title: title.value
		});

		onMounted(() => {
			setPageTitle("Home");
		});

		return {
			props,
			title
		};
	}
};
</script>
