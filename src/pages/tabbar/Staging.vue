<template>
	<div>Page Staging</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setNavigationBarTitle } from "kbone-api";
import { setPageTitle } from "@utils/page";

export default {
	name: "PageStaging",
	props: [],
	setup(props) {
		const title = ref("Page Staging");

		setNavigationBarTitle({
			title: title.value
		});

		onMounted(() => {
			setPageTitle("Staging");
		});

		return {
			props,
			title
		};
	}
};
</script>
