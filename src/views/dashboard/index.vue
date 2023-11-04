<script lang="ts" setup>
import { useAppConfigStore } from "@/stores/modules/app-config"
const appConfig = useAppConfigStore().appConfig

// appConfig.set("key2", "value2")
// console.log(appConfig.get("key1"))
// appConfig.set("key3", "vlaue3")
// import { useUserStore } from "@/stores/modules/user"
// import Admin from "./components/Admin.vue"
// import Editor from "./components/Editor.vue"
// import { ref } from "vue"

// const userStore = useUserStore()
// const isAdmin = userStore.roles.includes("admin")

// async function write(content: string) {
//   const isExists = await fs.exists("emdev", { dir: fs.BaseDirectory.Config })

//   if (!isExists) {
//     await fs.createDir("emdev", { dir: fs.BaseDirectory.Config, recursive: true })
//   }
//   return await fs.writeTextFile("emdev/config.json", content, { dir: fs.BaseDirectory.Config })
// }

// write("Hello world!")
</script>

<template>
  <!-- <component :is="isAdmin ? Admin : Editor" /> -->
  <div>Hello, World!</div>
</template>
