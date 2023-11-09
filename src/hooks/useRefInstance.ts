import { Component, ref, Ref } from "vue"

export const useRefInstance = <T extends abstract new (...args: any[]) => Component>() => ref() as Ref<InstanceType<T>>
// const jenkins = useInstance<typeof JenkinsClient>()
