<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { reactive, onMounted } from "vue"
import { JobPath } from "@/utils/jenkins/index"
import { useJenkinsStore } from "@/stores/modules/jenkins"

const jenkinsStore = useJenkinsStore()

interface IPipelineInfo {
  name: string
  url: string
  color: string
}

const tableData = reactive<IPipelineInfo[]>([])
async function getAllPipelineInfo() {
  await jenkinsStore.init()
  const jobs: any = await jenkinsStore.jenkins.jobs.list("/")
  tableData.push(...jobs)
}

const handleRun = async (row: any) => {
  console.log(row)
  row.color = "gray"
  const jobPath = JobPath.parse(row.url).path()
  const queueId = await jenkinsStore.jenkins.jobs.build(jobPath, undefined, {
    wait: true
  })
  const buildNumber = (await jenkinsStore.jenkins.queue.get(queueId)).executable.number
  const build = await jenkinsStore.jenkins.builds.get(jobPath, buildNumber)

  console.log(queueId)
  console.log(buildNumber)
  console.log(build.result)

  if (build.result === "SUCCESS") {
    row.color = "blue"
    ElMessage.success("success")
  } else {
    row.color = "red"
    ElMessage.error("failed")
  }
}

const handleConfig = (row: any) => {
  console.log(row)
}

onMounted(() => {
  getAllPipelineInfo()
})
</script>

<template>
  <div>
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
          <el-button type="info" text bg size="small">
            <a :href="scope.row.url" target="_blank"> 网页版</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
