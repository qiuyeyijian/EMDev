import { ref } from "vue"
import { defineStore } from "pinia"
import { Store } from "tauri-plugin-store-api"
import { path } from "@tauri-apps/api"

const configPath = await path.join(await path.configDir(), "emdev/config.json")

export const useAppConfigStore = defineStore("appConfig", () => {
  const appConfig = ref(new Store(configPath))
  appConfig.value.set("configPath", configPath)
  return { appConfig }
})
