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

import xmlParser from "fast-xml-parser"
import { JenkinsRequests } from "../requests"
import { credsPath } from "./credentials.utils"

/**
 * Get credentials config as json object
 *
 * @param requests
 * @param store
 * @param pathOrUser
 * @param {string} id - credential id
 * @param {string} [domain] - credential domain. Default `_`.
 *
 * @example
 *
 * const config = await jenkins.credentials.system().configJson('credential-name');
 *
 * @example
 *
 * const config = await jenkins.credentials.system().configJson('credential-name', 'my-domain');
 *
 * @example
 *
 * const config = await jenkins.credentials.folder('/my-folder').configJson('credential-name');
 *
 * @example
 *
 * const config = await jenkins.credentials.user('user').configJson('credential-name');
 *
 * @example Example result:
 *
 * {
 *   'com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl': {
 *     scope: 'GLOBAL',
 *     id: 'credential-name',
 *     description: 'some description',
 *     username: 'username',
 *     password: { 'secret-redacted': '' },
 *     usernameSecret: false,
 *   }
 * }
 *
 */

export const configJson = async (
  requests: JenkinsRequests,
  store: string,
  pathOrUser: string,
  id: string,
  domain?: string
): Promise<any> =>
  requests
    .get(`${credsPath(pathOrUser, store, domain, id)}/config.xml`)
    .then((res) => res.data)
    .then(xmlParser.parse)
