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

// eslint-disable-next-line max-classes-per-file
import { JenkinsRequests } from "../requests"
import { JenkinsCredentialsStoreApi } from "./credentials.store"

export class JenkinsCredentialsApi {
  private requests: JenkinsRequests

  constructor(requests: JenkinsRequests) {
    this.requests = requests
  }

  folder(path: string): JenkinsCredentialsStoreApi {
    return new JenkinsCredentialsStoreApi(this.requests, "folder", path)
  }

  system(): JenkinsCredentialsStoreApi {
    return new JenkinsCredentialsStoreApi(this.requests, "system")
  }

  user(user: string): JenkinsCredentialsStoreApi {
    return new JenkinsCredentialsStoreApi(this.requests, "user", user)
  }
}
