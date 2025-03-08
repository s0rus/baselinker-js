import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/warehouse-purchase-orders.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  createBaselinkerClient,
  GetInventoryPurchaseOrdersParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Warehouse purchase orders", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getInventoryPurchaseOrders",
      params: {
        inventory_id: 1,
        supplier_id: 1,
      } satisfies GetInventoryPurchaseOrdersParams,
      fixture: fixtures.getInventoryPurchaseOrders,
    },
    {
      idx: 1,
      method: "getInventoryPurchaseOrderItems",
      params: {
        supplier_id: 1,
        series_id: 1,
      } satisfies GetInventoryPurchaseOrdersParams,
      fixture: fixtures.getInventoryPurchaseOrderItems,
    },
    {
      idx: 2,
      method: "getInventoryPurchaseOrderSeries",
      params: {
        supplier_id: 1,
        inventory_id: 1,
      } satisfies GetInventoryPurchaseOrdersParams,
      fixture: fixtures.getInventoryPurchaseOrderSeries,
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

      const data = await bl.warehousePurchaseOrders[method](params);
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
