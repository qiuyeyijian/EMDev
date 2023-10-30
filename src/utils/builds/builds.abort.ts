/* Copyright 2022 Parsable Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { JenkinsRequests } from "../requests"
import { JobPath } from "../utils/jobPath"
import { JenkinsBuildAbortType } from "../types"

/**
 * Abort the build
 *
 * https://www.jenkins.io/doc/book/using/aborting-a-build/
 *
 * @param requests
 * @param {string} path - path to the job
 * @param {number} buildNumber - build number
 * @param {JenkinsBuildAbortType} [type] - the abort action - `stop`, `term` or `kill`. Default `stop`.
 *
 *  - `stop` - aborts a pipeline
 *  - `term` - forcibly terminates a build (should only be used if stop does not work)
 *  - `kill` - hard kill a pipeline. This is the most destructive way to stop a pipeline and should only be used as a last resort.
 *
 * @example
 *
 * await jenkins.jobs.abort('/job/my-job', 5);
 *
 */
export const abort = async (
  requests: JenkinsRequests,
  path: string,
  buildNumber: number,
  type: JenkinsBuildAbortType
): Promise<void> => {
  await requests.post(`${JobPath.parse(path).path()}/${buildNumber}/${type}`)
}
