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

import { JenkinsRequests } from "../../requests"
import { credsPath } from "../credentials.utils"

/**
 * Check whether credential domain exists
 *
 * @param requests
 * @param store
 * @param pathOrUser
 * @param {string} domain - domain name
 *
 * @example
 *
 * const domainExists = await jenkins.credentials.system().domains.exists('github');
 *
 * @example
 *
 * const domainExists = await jenkins.credentials.folder('/my-folder').domains.exists('github');
 *
 * @example
 *
 * const domainExists = await jenkins.credentials.user('user').domains.exists('github');
 *
 */
export const exists = async (
  requests: JenkinsRequests,
  store: string,
  pathOrUser: string,
  domain: string
): Promise<boolean> => requests.exists(`${credsPath(pathOrUser, store, domain)}/api/json`)
