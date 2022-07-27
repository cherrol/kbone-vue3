<template>
	<div id="app" class="flex flex-col h-full w-full">
		<div class="flex-none p-sm">
			<h1>role: {{ role }}</h1>
			<h1>uuid: {{ uuid }}</h1>
		</div>
		<div class="flex-auto p-sm">
			<!-- 路由出口 -->
			<!-- 路由匹配到的组件将渲染在这里 -->
			<div class="flex flex-col h-full">
				<div class="flex-auto">
					<router-view></router-view>
				</div>
				<div class="flex-none">
					<component :is="componentId"></component>
				</div>
			</div>
		</div>
		<div class="flex-none shadow-md van-hairline--top">
			<van-tabbar v-model="active" :fixed="false" route @change="onChange">
				<van-tabbar-item to="/" name="home" icon="home-o">
					Home
				</van-tabbar-item>
				<van-tabbar-item to="/staging" name="staging" icon="apps-o">
					Staging
				</van-tabbar-item>
				<van-tabbar-item to="/profile" name="profile" icon="user-o">
					Profile
				</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Button, Tabbar, TabbarItem } from "vant";
import "vant/lib/button/style";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";
import FooterHome from "@components/FooterHome.vue";
import FooterProfile from "@components/FooterProfile.vue";
import FooterStaging from "@components/FooterStaging.vue";

export default {
	components: {
		[Button.name]: Button,
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem,
		FooterHome,
		FooterProfile,
		FooterStaging
	},
	setup() {
		const store = useStore();
		const active = ref("home");
		const router = useRouter();
		const componentsFooter = ref({
			home: "FooterHome",
			profile: "FooterProfile",
			staging: "FooterStaging"
		});
		const componentId = ref("FooterHome");

		onMounted(() => {
			console.log("page1 mounted");
		});

		onUnmounted(() => {
			console.log("page1 unmounted");
		});

		function onChange(component) {
			router.push(component);
			componentId.value = componentsFooter.value[component];
		}

		return {
			active,
			role: computed(() => store.getters.role),
			uuid: computed(() => store.getters.uuid),
			componentId,
			componentsFooter,
			onChange
		};
	}
};
</script>

<style>
.cnt {
	margin-top: 20px;
}
a,
button {
	display: block;
	width: 100%;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 20px;
	border: 1px solid #ddd;
}
</style>
