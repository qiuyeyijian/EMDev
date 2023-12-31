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

export const DEFAULT_NODE_TYPE = "hudson.slaves.DumbSlave"
export const DEFAULT_NODE_CONFIG = {
  mode: "NORMAL",
  numExecutors: "1",
  launcher: { "stapler-class": "hudson.slaves.JNLPLauncher" },
  retentionStrategy: { "stapler-class": "hudson.slaves.RetentionStrategy$Always" },
  nodeProperties: { "stapler-class-bag": "true" }
}
