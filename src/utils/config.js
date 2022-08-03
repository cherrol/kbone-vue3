// 请求相关配置
require("dotenv").config(".env.locale");

export const REQUEST_BASE_URL = process.env.REQUEST_BASE_URL;

export default { REQUEST_BASE_URL };
