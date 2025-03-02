import {
  VALID_CATEGORIES,
  type BaselinkerFetchError,
  type BaselinkerFetchSuccess,
  type Category,
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

/** Creates a type-safe BaseLinker API client
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
 *
 * ```
 */
export function createBaselinkerClient({
  apiKey,
  debug = false,
}: BaselinkerClientOptions): BaselinkerClient {
  if (!apiKey) {
    throw new Error("Baselinker API key is required");
  }

  const BASE_URL = "https://api.baselinker.com/connector.php";

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
            return async (params: unknown) => {
              if (debug) {
                console.log(
                  `Baselinker API Request - Category: ${String(category)}, Method: ${String(method)}, Params:`,
                  params,
                );
              }

              const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-BLToken": apiKey,
                },
                body: `method=${method}&parameters=${encodeURIComponent(
                  JSON.stringify(params || {}),
                )}`,
              });

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
                  `Baselinker API Response - Category: ${String(
                    category,
                  )}, Method: ${String(method)}, Data:`,
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
