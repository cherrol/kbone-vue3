<template>
	<div>Page Home</div>
</template>

<script>
import { onMounted } from "vue";
import { setPageTitle } from "@utils/page";

export default {
	name: "PageHome",
	props: [],
	setup(props) {
		onMounted(() => {
			setPageTitle("Home");
		});

		return {
			props
		};
	}
};
</script>
