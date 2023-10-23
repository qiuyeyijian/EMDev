<script lang="ts" setup>
import { request } from "@/utils/service"
import { ElMessageBox, ElMessage } from "element-plus"
import { reactive, onMounted } from "vue"
import { JenkinsClient } from "jenkins-client-ts"
import { JobPath } from "jenkins-client-ts"

const jenkins = new JenkinsClient({
  baseUrl: import.meta.env.VITE_JENKINS_BASE_URL,
  username: import.meta.env.VITE_JENKINS_USERNAME,
  password: import.meta.env.VITE_JENKINS_PASSWORD
})

interface IPipelineInfo {
  name: string
  url: string
  color: string
}

const tableData = reactive<IPipelineInfo[]>([])
async function getAllPipelineInfo() {
  const jobs: any = await jenkins.jobs.list("/")
  console.log("jobs", jobs)
  console.log("jenkins", jenkins)
  tableData.push(...jobs)
  console.log(jobs)
}

const handleRun = async (row: any) => {
  console.log(row)
  row.color = "gray"
  const jobPath = JobPath.parse(row.url).path()
  // trigger a job with parameters, wait for it to complete, then check wheter job result is 'SUCCESS'
  const queueId = await jenkins.jobs.build(jobPath, undefined, {
    waitForStart: true
  })
  const buildNumber = (await jenkins.queue.get(queueId)).executable.number
  const build = await jenkins.builds.get(jobPath, buildNumber)

  console.log(queueId)
  console.log(buildNumber)
  console.log(build.result)

  if (build.result === "SUCCESS") {
    row.color = "blue"
  } else {
    row.color = "red"
  }
}

const handleConfig = (row: any) => {
  console.log(row)
}

const handleWeb = (row: any) => {
  window.open(row.url, "_blank")
}

onMounted(() => {
  getAllPipelineInfo()
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Pipeline" width="400" />
    <el-table-column prop="color" label="状态" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.color === 'blue'" type="success" effect="plain">成功</el-tag>
        <el-tag v-else-if="scope.row.color === 'gray'" type="warning" effect="plain">运行中</el-tag>
        <el-tag v-else type="danger" effect="plain">失败</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" prop="url" label="操作" width="200" align="center">
      <template #default="scope">
        <el-button type="primary" text bg size="small" @click="handleRun(scope.row)">运行</el-button>
        <el-button type="danger" text bg size="small" @click="handleConfig(scope.row)">配置</el-button>
        <el-button type="info" text bg size="small" @click="handleWeb(scope.row)">网页版</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
