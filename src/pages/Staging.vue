<template>
	<div>Page Staging</div>
</template>

<script>
import { onMounted } from "vue";
import { setPageTitle } from "@utils/page";

export default {
	name: "PageStaging",
	props: [],
	setup(props) {
		onMounted(() => {
			setPageTitle("Staging");
		});

		return {
			props
		};
	}
};
</script>
