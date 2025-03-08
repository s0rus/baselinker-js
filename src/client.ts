import {
  isFetchOptions,
  BASELINKER_API_URL,
  VALID_CATEGORIES,
  VALID_METHODS,
  type BaselinkerFetchError,
  type BaselinkerFetchSuccess,
  type Category,
  type FetchOptions,
  type MethodsFor,
  type MethodsOf,
  type Prettify,
  type ResponseOf,
} from "./internal/utils.js";

export type BaselinkerClientOptions = {
  apiKey: string;
  debug?: boolean;
};

type BaselinkerClient = {
  [C in Category]: Prettify<MethodsFor<C>>;
};

/**
 * Creates a type-safe BaseLinker API client
 * @param apiKey - BaseLinker API key needed to authenticate requests
 * @param debug - Enables debug mode, which logs API requests and responses
 * @returns BaseLinker API client
 *
 * @example
 * ```typescript
 * import { createBaselinkerClient} from "baselinker-js";
 *
 * const bl = createBaselinkerClient({
 *   apiKey: "YOUR_API_KEY",
 * });
 * ```
 */
export function createBaselinkerClient({
  apiKey,
  debug = false,
}: BaselinkerClientOptions): BaselinkerClient {
  if (!apiKey) {
    throw new Error("Baselinker API key is required");
  }

  return new Proxy({} as BaselinkerClient, {
    get: (_, category: Category) => {
      if (!VALID_CATEGORIES.includes(category)) {
        throw new TypeError(
          `Cannot read properties of undefined (reading '${category}')`,
        );
      }

      return new Proxy(
        {},
        {
          get: (_, method: MethodsOf<typeof category>) => {
            if (!VALID_METHODS[category].includes(method)) {
              throw new TypeError(
                `Cannot read properties of undefined (reading '${method}')`,
              );
            }

            return async (...args: unknown[]) => {
              // NOTE: We need to swap params and options when method has no params
              // It seems kind of brittle, maybe there is a better way to do this?
              let params: unknown;
              let options: FetchOptions | undefined = undefined;

              if (args.length === 0) {
                params = {};
              } else if (isFetchOptions(args[0])) {
                params = {};
                options = args[0] as FetchOptions;
              } else {
                params = args[0];
                if (args.length > 1 && isFetchOptions(args[1])) {
                  options = args[1] as FetchOptions;
                }
              }

              if (debug) {
                console.log(
                  `<- Baselinker API Request | ${String(category)}.${String(method)} | params:`,
                  params,
                );
              }

              const finalOptions: RequestInit = {
                ...options,
                method: "POST",
                headers: {
                  ...options?.headers,
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-BLToken": apiKey,
                },
                body: `method=${method}&parameters=${encodeURIComponent(
                  JSON.stringify(params || {}),
                )}`,
              };

              const response = await fetch(BASELINKER_API_URL, finalOptions);

              if (!response.ok) {
                throw new Error(
                  "There was an error while connecting to Baselinker API",
                );
              }

              const data = (await response.json()) as
                | BaselinkerFetchSuccess<
                    ResponseOf<typeof category, typeof method>
                  >
                | BaselinkerFetchError;

              if (debug) {
                console.log(
                  `-> Baselinker API Response | ${String(
                    category,
                  )}.${String(method)} | data:`,
                  data,
                );
              }

              return data;
            };
          },
        },
      );
    },
  });
}
