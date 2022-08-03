<template>
	<div>
		<div>
			<div>Role: {{ role }}</div>
		</div>
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { showModal } from "kbone-api";
import { Button } from "vant";
import "vant/lib/button/style";
import { setPageTitle } from "@utils/page";

export default {
	name: "UserLogin",
	components: {
		[Button.name]: Button
	},
	props: [],
	setup(props) {
		const store = useStore();

		onMounted(() => {
			setPageTitle("Login");
		});

		const login = () =>
			store.commit("SET_PROFILE", {
				role: "authenticated",
				uuid: "authenticated"
			});

		const logout = () => {
			showModal({
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
		};

		return {
			role: computed(() => store.getters.role),
			login,
			logout,
			props
		};
	}
};
</script>
