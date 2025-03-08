import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/external-storages.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  createBaselinkerClient,
  GetExternalStorageCategoriesParams,
  GetExternalStorageProductsDataParams,
  GetExternalStorageProductsListParams,
  GetExternalStorageProductsPricesParams,
  GetExternalStorageProductsQuantityParams,
  UpdateExternalStorageProductsQuantityParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Warehouse documents", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getExternalStoragesList",
      params: undefined,
      fixture: fixtures.getExternalStoragesList,
    },
    {
      idx: 1,
      method: "getExternalStorageCategories",
      params: {
        storage_id: "shop_1",
      } satisfies GetExternalStorageCategoriesParams,
      fixture: fixtures.getExternalStorageCategories,
    },
    {
      idx: 2,
      method: "getExternalStorageProductsData",
      params: {
        storage_id: "shop_1",
        products: [1],
      } satisfies GetExternalStorageProductsDataParams,
      fixture: fixtures.getExternalStorageProductsData,
    },
    {
      idx: 3,
      method: "getExternalStorageProductsList",
      params: {
        storage_id: "shop_1",
      } satisfies GetExternalStorageProductsListParams,
      fixture: fixtures.getExternalStorageProductsList,
    },
    {
      idx: 4,
      method: "getExternalStorageProductsPrices",
      params: {
        storage_id: "shop_1",
      } satisfies GetExternalStorageProductsPricesParams,
      fixture: fixtures.getExternalStorageProductsPrices,
    },
    {
      idx: 5,
      method: "getExternalStorageProductsQuantity",
      params: {
        storage_id: "shop_1",
      } satisfies GetExternalStorageProductsQuantityParams,
      fixture: fixtures.getExternalStorageProductsQuantity,
    },
    {
      idx: 6,
      method: "updateExternalSotrageProcuctsQuantity",
      params: {
        storage_id: "shop_1",
        products: [[1, 0, 100]],
      } satisfies UpdateExternalStorageProductsQuantityParams,
      fixture: fixtures.updateExternalStorageProductsQuantity,
    },
  ];

  const bl = createBaselinkerClient({
    apiKey: "test-api-key",
  });

  test.each(testCases)(
    "Method %# should work correctly",
    async ({ method, params, fixture }) => {
      mockFetch.mockReset();

      mockFetch.mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(fixture))),
      );

      const data = await bl.externalStorages[method](params);
      const encodedParams = encodeURIComponent(JSON.stringify(params || {}));

      expect(data).toEqual(fixture);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        BASELINKER_API_URL,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-BLToken": "test-api-key",
          },
          body: expect.stringContaining(
            `method=${method}&parameters=${encodedParams}`,
          ),
        }),
      );
    },
  );
});
