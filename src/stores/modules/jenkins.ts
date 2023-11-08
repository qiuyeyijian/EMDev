import { ref } from "vue"
import { defineStore } from "pinia"
import { JenkinsClient } from "@/utils/jenkins/index"
import { useAppConfigStore } from "./app-config"
const appConfig = useAppConfigStore().appConfig
const jenkinsConfig: any = await appConfig.get("jenkins")

export const useJenkinsStore = defineStore("jenkins", () => {
  const jenkins = ref(
    new JenkinsClient({
      baseUrl: jenkinsConfig["baseUrl"],
      username: jenkinsConfig["username"],
      password: jenkinsConfig["password"]
    })
  )

  return { jenkins }
})
