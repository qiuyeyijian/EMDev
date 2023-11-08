import { ref } from "vue"
import { defineStore } from "pinia"
import { Store } from "tauri-plugin-store-api"
import { path } from "@tauri-apps/api"

const configPath = await path.join(await path.configDir(), "emdev/config.json")

export const useAppConfigStore = defineStore("app-config", () => {
  const appConfig = ref(new Store(configPath))

  if (import.meta.env.VITE_RUN_MODE === "dev") {
    appConfig.value.get("jenkins").then((res) => {
      if (!res) {
        appConfig.value.set("jenkins", {
          baseUrl: "http://192.168.1.39:8080/",
          username: "qiuyeyijian",
          password: "113cef47db0668bf6b18c56519c91c3571",
          token: "113cef47db0668bf6b18c56519c91c3571"
        })
      }
    })
  } else {
    appConfig.value.get("jenkins").then((res) => {
      if (!res) {
        appConfig.value.set("jenkins", {
          baseUrl: "http://10.10.7.23:8080/",
          username: "longwei.zhang",
          password: "11e96896b069851c967446523de2725171",
          token: "11e96896b069851c967446523de2725171"
        })
      }
    })
  }

  return { appConfig }
})
