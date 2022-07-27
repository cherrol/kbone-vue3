// 对请求进行封装
import { request, getStorageSync, uploadFile } from "kbone-api";
import { REQUEST_BASE_URL } from "@utils/config";

export default function http(url, options = {}) {
	return new Promise((resolve, reject) => {
		const defaultOptions = {
			header: {
				cookie: getStorageSync("sessionid"),
				"X-CSRF-Token": getStorageSync("csrf_token"),
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		};

		request({
			url: REQUEST_BASE_URL + url,
			success(res) {
				if ([200, 201, 204].includes(res.statusCode)) {
					console.log(`-------------`);
					console.log(url);
					console.log(res.data);
					console.log(`-------------`);
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			},
			...defaultOptions,
			...options
		});
	});
}

export function GET(url, options = {}) {
	return http(url, options);
}

export function POST(url, options = {}) {
	const method = "POST";
	return http(url, { method, ...options });
}

export function PATCH(url, options = {}) {
	const method = "POST";
	const header = {
		"X-HTTP-Method-Override": "PATCH"
	};

	return http(url, { method, header, ...options });
}

export function DELETE(url, options = {}) {
	const method = "DELETE";
	return http(url, { method, ...options });
}

export function UPLOAD(url, options = {}) {
	const defaultOptions = {
		header: {
			cookie: getStorageSync("sessionid"),
			"X-CSRF-Token": getStorageSync("csrf_token"),
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	};

	return uploadFile({
		url: REQUEST_BASE_URL + url,
		method: "POST",
		...defaultOptions,
		...options
	});

	// uploadTask.progress((res) => {
	// 	console.log("上传进度", res.progress);
	// 	console.log("已经上传的数据长度", res.totalBytesSent);
	// 	console.log("预期需要上传的数据总长度", res.totalBytesExpectedToSend);
	// });

	// 取消上传任务
	// uploadTask.abort();
}
