<template>
	<div class="page-register">Page Register</div>
</template>
<script>
import { setPageTitle } from "@utils/page";
import { onMounted } from "vue";

export default {
	name: "PageRegister",
	props: [],
	setup(props) {
		onMounted(() => {
			setPageTitle("Register");
		});

		return {
			props
		};
	}
};
</script>
