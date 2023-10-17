<script lang="ts" setup>
import { request } from "@/utils/service"
import { ElMessageBox, ElMessage } from "element-plus"
import { reactive, onMounted } from "vue"
import { JenkinsClient } from "jenkins-client-ts"

const jenkins = new JenkinsClient({
  baseUrl: "/jenkins",
  username: "longwei.zhang",
  password: "Fighting@982121"
})

// const handleDelete = (index: any, row: any) => {
//   console.log(index, row)
// }

// const handlEdit = (index: any, row: any) => {
//   console.log(index, row)
//   ElMessageBox.prompt("请输入你的持仓成本价", "Tip", {
//     confirmButtonText: "OK",
//     cancelButtonText: "Cancel",
//     inputPattern: /^\d+(?:\.\d+)?$/,
//     inputErrorMessage: "无效输入"
//   })
//     .then(({ value }) => {
//       ElMessage({
//         type: "success",
//         message: `你的持仓成本价是:${value}`
//       })
//       row.f_hold_nav = value
//       request({
//         url: `${VITE_BASE_API}/fund/hold/${row.f_code}/${value}`,
//         method: "patch"
//       })
//     })
//     .catch(() => {
//       ElMessage({
//         type: "info",
//         message: "Input canceled"
//       })
//     })
// }

interface IPipelineInfo {
  name: string
}

const tableData = reactive<IPipelineInfo[]>([])
async function getAllPipelineInfo() {
  const jobs = await jenkins.jobs.list("/")
  tableData.push(...jobs)
  console.log(jobs)
}

onMounted(() => {
  getAllPipelineInfo()
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Pipeline" width="400" />
  </el-table>
</template>
