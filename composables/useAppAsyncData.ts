import type { AsyncData, AsyncDataOptions, NuxtError } from "nuxt/app";
// @ts-ignore
import type { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";
import type { NuxtApp } from "~/node_modules/nuxt/dist/app/nuxt";
export const useAppAsyncData = async <DataT, DataE>(
  key: string,
  handler: (ctx?: NuxtApp | undefined) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
  initialCache:boolean=true
): Promise<AsyncData<DataT, Ref<DataE | null>>> => {
  const nuxtApp = useNuxtApp();
  const { data, error, execute, pending, refresh, status } = useAsyncData<
    DataT,
    DataE
  >(key, handler, {
    getCachedData(key) {
      return implimentInitialCache(key, nuxtApp, initialCache);
    },
    ...options,
  });
  return {
    data: data as Ref<DataT>,
    error: error as Ref<Ref<DataE | null> | null>,
    execute,
    pending,
    refresh,
    status,
  };
};

function implimentInitialCache(
  key: string,
  nuxtApp: NuxtApp,
  initialCache: boolean = true
) {
  if (initialCache)
    return nuxtApp?.payload?.data[key] || nuxtApp?.static?.data[key];
}
