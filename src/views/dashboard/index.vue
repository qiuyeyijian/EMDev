<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { fs, path } from "@tauri-apps/api"
import Admin from "./components/Admin.vue"
import Editor from "./components/Editor.vue"
import { ref } from "vue"

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")

path.appDataDir().then((res) => {
  console.log("appData", res)
})

path.homeDir().then((res) => {
  console.log("homeDir", res)
})

path.configDir().then((res) => {
  console.log("configDir", res)
})

async function write(content: string) {
  const isExists = await fs.exists("emdev", { dir: fs.BaseDirectory.Config })

  if (!isExists) {
    await fs.createDir("emdev", { dir: fs.BaseDirectory.Config, recursive: true })
  }
  return await fs.writeTextFile("emdev/config.json", content, { dir: fs.BaseDirectory.Config })
}

write("Hello world!")
</script>

<template>
  <!-- <component :is="isAdmin ? Admin : Editor" /> -->
  <div>Hello, World!</div>
</template>
