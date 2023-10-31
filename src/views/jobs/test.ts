// import { JenkinsClient } from "jenkins-client-ts";

// const jenkins = new JenkinsClient({
//   baseUrl: "http://10.10.7.23:8080",
//   username: "longwei.zhang",
//   password: "Fighting@982121",
// });

// const jobPath = "/job/emos_tmp/";

// async function test01() {
//   const queueId = await jenkins.jobs.build(jobPath, undefined, {
//     waitForStart: true,
//   });
//   const buildNumber = (await jenkins.queue.get(queueId)).executable.number;
//   const logStream = await jenkins.builds.logStream(jobPath, buildNumber);

//   console.log(logStream);

//   logStream.on("data", (text) => {
//     console.log(text.toString());
//   });

//   logStream.on("end", () => {
//     console.log("Log transfer completed");
//   });

//   logStream.on("error", (error) => {
//     console.log(`There was an error ${error}`);
//   });
// }

// async function jobsList() {
//   const job2 = await jenkins.jobs.list("/");
//   console.log(job2);
// }

// async function jobsBuild() {
//   // trigger a job with parameters, wait for it to complete, then check wheter job result is 'SUCCESS'
//   const queueId = await jenkins.jobs.build(jobPath, undefined, {
//     waitForStart: true,
//   });
//   const buildNumber = (await jenkins.queue.get(queueId)).executable.number;
//   const build = await jenkins.builds.get(jobPath, buildNumber);

//   console.log(queueId);
//   console.log(buildNumber);
// //   console.log(build);

//   if (build.result === "SUCCESS") {
//     console.log("Success!");
//   } else {
//     console.log("Failure!");
//   }
// }

// async function jobsConfigXml() {
//   const config = await jenkins.jobs.configXml("/job/emos_tmp/");
//   console.log(config);
// }

// async function jobsSetConfig() {
//   await jenkins.jobs.setConfig(
//     jobPath,
//     `
//         <flow-definition plugin="workflow-job@1316.vd2290d3341a_f">
// <actions>
// <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobAction plugin="pipeline-model-definition@2.2144.v077a_d1928a_40"/>
// <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction plugin="pipeline-model-definition@2.2144.v077a_d1928a_40">
// <jobProperties/>
// <triggers/>
// <parameters/>
// <options/>
// </org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobPropertyTrackerAction>
// </actions>
// <description/>
// <keepDependencies>false</keepDependencies>
// <properties>
// <jenkins.model.BuildDiscarderProperty>
// <strategy class="hudson.tasks.LogRotator">
// <daysToKeep>10</daysToKeep>
// <numToKeep>10</numToKeep>
// <artifactDaysToKeep>-1</artifactDaysToKeep>
// <artifactNumToKeep>-1</artifactNumToKeep>
// </strategy>
// </jenkins.model.BuildDiscarderProperty>
// </properties>
// <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@3728.vd5c88eef9154">
// <script>
// pipeline {
//     agent{
//         label 'Ubuntu20.04(10.10.60.237)'
//     }
//     stages {
//         stage('Hello, EMOS') {
//             steps { echo 'Hello EMOS' }
//         }
//      }
// }
// </script>
// <sandbox>true</sandbox>
// </definition>
// <triggers/>
// <disabled>false</disabled>
// </flow-definition>
//         `
//   );
// }

// (async () => {
//   jobsSetConfig()
//   jobsBuild()
// })();
