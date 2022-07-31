<template>
	<div>
		<div>Page Profile</div>
		<div class="flex">
			<div class="px-sm">
				<van-button
					type="primary"
					:disabled="role === 'authenticated'"
					@click="login"
				>
					登录
				</van-button>
			</div>
			<div class="px-sm">
				<van-button
					type="warning"
					:disabled="role === 'unauthenticated'"
					@click="logout"
				>
					退出登录
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { setNavigationBarTitle, showModal } from "kbone-api";
import { Button } from "vant";
import "vant/lib/button/style";

export default {
	name: "UserLogin",
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

		return {
			role: () => store.getters.role,
			login: () =>
				store.commit("SET_PROFILE", {
					role: "authenticated",
					uuid: "authenticated"
				}),
			logout: async () => {
				await showModal({
					title: "提示！",
					content: "是否退出登录？"
				})
					.then(({ confirm }) => {
						if (confirm) {
							return store.commit("SET_PROFILE", {
								role: "unauthenticated",
								uuid: "unauthenticated"
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			props,
			title
		};
	}
};
</script>
