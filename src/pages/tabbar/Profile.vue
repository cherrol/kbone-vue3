<template>
	<div>
		<div>Page Profile</div>

		<div v-if="role === 'authenticated'" class="flex-none p-sm">
			<h1>role: {{ role }}</h1>
			<h1>uuid: {{ uuid }}</h1>
		</div>

		<div v-if="role !== 'authenticated'" class="flex">
			<div class="px-sm">
				<van-button type="primary" @click="$router.push('/login')">
					去登录
				</van-button>
			</div>
			<div class="px-sm">
				<van-button type="warning" @click="$router.push('/register')">
					去注册
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { setNavigationBarTitle } from "kbone-api";
import { Button } from "vant";
import "vant/lib/button/style";
import { setPageTitle } from "@utils/page";

export default {
	name: "PageProfile",
	components: {
		[Button.name]: Button
	},
	props: [],
	setup(props) {
		const title = ref("Page Profile");
		const store = useStore();

		setNavigationBarTitle({
			title: title.value
		});

		onMounted(() => {
			setPageTitle("Profile");
		});

		return {
			role: () => store.getters.role,
			props,
			title
		};
	}
};
</script>
