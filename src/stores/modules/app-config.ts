import { ref } from "vue"
import { defineStore } from "pinia"
import { Store } from "tauri-plugin-store-api"
import { path } from "@tauri-apps/api"
import { useRefInstance } from "@/hooks/useRefInstance"

export const useAppConfigStore = defineStore("app-config", () => {
  const appConfig = useRefInstance<typeof Store>()
  const initFlag = useRefInstance<typeof Number>()

  async function init() {
    if (initFlag.value === 1) {
      return
    }
    initFlag.value = 1
    console.log("app config init")
    const configPath = await path.join(await path.configDir(), "emdev/config.json")
    appConfig.value = new Store(configPath)
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

  return { appConfig, init }
})
