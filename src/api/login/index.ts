import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  // const tmp = request<Login.LoginResponseData>({
  //   url: "users/login",
  //   method: "post",
  //   data
  // })
  return Promise.resolve({
    code: 0,
    data: { token: "token-admin" },
    message: "登陆成功"
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  // const tmp = request<Login.UserInfoResponseData>({
  //   url: "users/info",
  //   method: "get"
  // })

  return Promise.resolve({
    code: 0,
    data: {
      username: "admin",
      roles: ["admin"]
    },
    message: "获取用户详情成功"
  })
}
