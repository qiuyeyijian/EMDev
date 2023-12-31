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
 * Create view
 *
 * @param {string} path - path to the folder with view
 * @param {string} name - new view name
 * @param {string} mode - view mode - `ListView` or `MyView`
 *
 * @example
 *
 * await jenkins.views.create('/', 'ViewName', 'ListView');
 *
 */
export const create = async (
  requests: JenkinsRequests,
  path: string,
  name: string,
  mode: "ListView" | "MyView"
): Promise<void> => {
  const data = { name, mode: `hudson.model.${mode}` }
  await requests.postForm(`${JobPath.parse(path).path()}createView`, {
    ...data,
    json: JSON.stringify(data)
  })
}
