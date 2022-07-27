// 用户相关接口
import router from "@router/index";
import { Toast } from "vant";
import {
	setStorageSync,
	getStorageSync,
	login,
	checkSession,
	getUserProfile
} from "kbone-api";
import { GET, POST } from "../base/http";

// 登录微信
export function appLogin() {
	return new Promise((resolve, reject) => {
		login({
			success(res) {
				if (res.code) {
					resolve(res);
				} else {
					reject(res);
				}
			}
		});
	});
}

// 校验微信登录
export function checkAppLogin() {
	return new Promise((resolve, reject) => {
		checkSession({
			success(res) {
				if (res.errMsg && res.errMsg === "checkSession:ok") {
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			}
		});
	});
}

// 获取App用户信息
export function getAppProfile() {
	return new Promise((resolve, reject) => {
		wx.showModal({
			title: "提示！",
			content: "是否允许获取您的微信个人信息！",
			success(res) {
				if (res.confirm) {
					getUserProfile({
						desc: "AppLogin",
						success(appProfile) {
							resolve({ status: "ok", appProfile });
						},
						fail(err) {
							Toast.fail("获取微信个人信息失败");
							reject(new Error(err.errMsg));
						}
					});
				}

				if (res.cancel) {
					Toast.fail("您未授权获取微信个人信息，部分功能可能无法正常使用！");
					// reject({ status: "fail", errMsg: "您未授权获取微信个人信息，部分功能可能无法正常使用！" });
					reject(
						new Error("您未授权获取微信个人信息，部分功能可能无法正常使用！")
					);
				}
			},
			fail() {
				Toast.fail("您未授权获取微信个人信息，部分功能可能无法正常使用！");
				// reject({ status: "fail", errMsg: "您未授权获取微信个人信息，部分功能可能无法正常使用！" });
				reject(
					new Error("您未授权获取微信个人信息，部分功能可能无法正常使用！")
				);
			}
		});
	});
}

// 通过微信用户綁定注册用户
export function appUserBindAdminUser(data) {
	return POST("/api/v1/miniprogram/register?_format=json", {
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: {
			code: data.code, // 微信code
			user: data.user, // 手机验证码
			pass: data.pass // 手机号码
		}
	});
}

// 微信绑定手机注册用户
export function appUserBindAdminPhoneUser(data) {
	return POST("/api/v1/miniprogram/bind-register", {
		data: {
			code: data.code, // 微信code
			verification_code: data.verification_code, // 手机验证码
			mobile_number: data.mobile_number // 手机号码
		}
	});
}

// 微信用户登录后台
export function appUserLoginAdmin(info, code) {
	return POST("/api/v1/miniprogram/login?_format=json", {
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: {
			code,
			rawData: info.rawData,
			signature: info.signature,
			encryptedData: info.encryptedData,
			iv: info.iv
		}
	});
}

// 校验后台用户登录
export function checkAdminLogin() {
	return GET("/user/login_status?_format=json");
}

// 获取后台用户信息
export function getAdminProfile() {
	return GET("/api/v1/personalProfile");
}

// 获取手机验证码
export function getPhoneCaptcha(mobileNumber) {
	return POST("/api/v1/otp/generate?_format=json", {
		data: {
			auto_register: false,
			mobile_number: mobileNumber
		}
	});
}

// 登录流程
export async function auth() {
	try {
		// 判断微信登录是否已过期
		let isAppLogin = false;
		try {
			const { errMsg } = await checkAppLogin();
			isAppLogin = errMsg && errMsg === "checkSession:ok";
		} catch (error) {
			isAppLogin = false;
		}
		console.log(`isAppLogin: ${isAppLogin}`);

		// 读取本地缓存的微信个人信息
		let userInfo = getStorageSync("userInfo");
		const cookie = getStorageSync("sessionid");
		const token = getStorageSync("csrf_token");
		let profile = getStorageSync("profile");
		let isAdminLogin = false;
		let appCode = null;

		// 登录过期或者本地缓存过期，重新登陆
		if (!(isAppLogin && userInfo !== "" && cookie !== "" && token !== "")) {
			// 微信登录并获取到code
			const { errMsg, code } = await appLogin();
			// 登录失败
			if (!code) throw new Error(`微信登录授权失败：${errMsg}`);
			console.log(`code: ${code}`);
			appCode = code;

			// 微信信息未缓存则授权获取微信个人信息
			if (userInfo === "") {
				// 授权获取微信个人信息
				const appProfileRes = await getAppProfile();

				if (!appProfileRes) {
					throw new Error(
						"您未授权获取微信个人信息，部分功能可能无法正常使用！"
					);
				}

				const { appProfile, status } = appProfileRes;
				// 授权获取微信个人信息失败
				if (status === "fail") {
					throw new Error(appProfileRes.errMsg);
				}

				// 缓存微信个人信息
				userInfo = appProfile.userInfo;
				profile = appProfile;
				setStorageSync("profile", profile);
				setStorageSync("userInfo", userInfo);
			}
		}

		// 校验后台登录状态
		const adminLoginStatus = await checkAdminLogin();
		console.log(`isAdminLogin: ${isAdminLogin}`);
		isAdminLogin = adminLoginStatus.data === 1;
		// 未登录后台
		if (!isAdminLogin) {
			// 使用微信个人信息登录后台
			const appUserLoginAdminRes = await appUserLoginAdmin(profile, appCode);
			console.log(appUserLoginAdminRes.data);

			// 登录后台显示未绑定后台账号，跳转绑定页面
			if (appUserLoginAdminRes.data.errCode === 49005) {
				wx.showModal({
					title: "提示！",
					content: "您的微信未绑定注册账号，绑定后可快速登录，是否立即绑定？",
					success(res) {
						if (res.confirm) {
							// navigateTo({
							// 	url: "/pages/bindUser/bindUser"
							// });
							router.push("/user/bindUser");
						}
					}
				});

				throw new Error(appUserLoginAdminRes.data.errMsg);
			}

			// 微信登陆其他问题
			if (appUserLoginAdminRes.data.errCode !== 0) {
				throw new Error(appUserLoginAdminRes.data);
			}

			// 微信登陆成功并已经绑定注册用户
			setStorageSync("sessionid", appUserLoginAdminRes.header["Set-Cookie"]);
			setStorageSync("csrf_token", appUserLoginAdminRes.data.csrf_token);
		}

		// 获取用户信息
		const adminProfile = await getAdminProfile();
		if (!adminProfile.data) throw new Error(adminProfile.errMsg);

		console.log(adminProfile);
		setStorageSync("personalProfile", adminProfile.data);
		// 当用户角色包含律师，则为律师，否则取第一个角色
		const currentRole = adminProfile.data.roles.some(
			(role) => role.id === "lawyer"
		)
			? "lawyer"
			: adminProfile.data.roles[0].id;
		setStorageSync("role", currentRole);
	} catch (error) {
		Toast.fail(String(error));
	}
}
