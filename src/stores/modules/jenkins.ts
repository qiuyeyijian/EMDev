import { defineStore } from "pinia"
import { JenkinsClient } from "@/utils/jenkins/index"
import { useAppConfigStore } from "./app-config"
import { useRefInstance } from "@/hooks/useRefInstance"

const appConfigStore = useAppConfigStore()

export const useJenkinsStore = defineStore("jenkins", () => {
  const jenkins = useRefInstance<typeof JenkinsClient>()
  const initFlag = useRefInstance<typeof Number>()

  async function init() {
    if (initFlag.value === 1) {
      return
    }
    initFlag.value = 1
    console.log("jenkins init")
    await appConfigStore.init()
    const jenkinsConfig: any = await appConfigStore.appConfig.get("jenkins")

    jenkins.value = new JenkinsClient({
      baseUrl: jenkinsConfig["baseUrl"],
      username: jenkinsConfig["username"],
      password: jenkinsConfig["password"]
    })
  }

  return { jenkins, init }
})
