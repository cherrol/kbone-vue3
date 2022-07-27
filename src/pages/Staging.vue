<template>
	<div>Page Staging</div>
</template>

<script>
import { ref } from "vue";
import { setNavigationBarTitle } from "kbone-api";

export default {
	name: "PageStaging",
	props: [],
	setup(props) {
		const title = ref("Page Staging");
		setNavigationBarTitle({
			title: title.value
		});

		return {
			props,
			title
		};
	}
};
</script>
