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

/**
 * Delete build
 *
 * @param requests
 * @param {string} path - path to the job
 * @param {number} buildNumber - job build number
 *
 * @example
 *
 * await jenkins.builds.delete('my-job', 1);
 *
 */
export const deleteBuild = async (requests: JenkinsRequests, path: string, buildNumber: number): Promise<void> => {
  await requests.post(`${JobPath.parse(path).path()}/${buildNumber}/doDelete`)
}
