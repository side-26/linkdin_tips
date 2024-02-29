import type { AsyncData, AsyncDataOptions, NuxtError } from "nuxt/app";
// @ts-ignore
import type { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";
import type { NuxtApp } from "nuxt/schema";
export const useAppAsyncData = async <DataT, DataE>(
  key: string,
  handler: (ctx?: NuxtApp | undefined) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, Ref<DataE | null>>> => {
  const { data, error, execute, pending, refresh, status } = useAsyncData<
    DataT,
    DataE
    // @ts-ignore
  >(key, handler, {
    ...options,
  });
  // it just for handling errors in ssr-ssg mode
  handleErrorPage(options?.server, error);
  return {
    data: data as Ref<DataT>,
    error: error as Ref<Ref<DataE | null> | null>,
    execute,
    pending,
    refresh,
    status,
  };
};
function handleErrorPage(isServer: boolean | undefined, error: any) {
  if (isServer === true) {
    if (unref(error)?.["statusCode"] || unref(error)?.["statusMessage"]) {
      showError({
        statusMessage: unref(error)?.["statusMessage"],

        statusCode: unref(error)?.["statusCode"],
      });
    }
  }
}
