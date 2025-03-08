import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/warehouse-documents.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  createBaselinkerClient,
  GetInventoryDocumentItemsParams,
  GetInventoryDocumentsParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Warehouse documents", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getInventoryDocuments",
      params: { page: 1 } satisfies GetInventoryDocumentsParams,
      fixture: fixtures.getInventoryDocuments,
    },
    {
      idx: 1,
      method: "getInventoryDocumentItems",
      params: { document_id: 1 } satisfies GetInventoryDocumentItemsParams,
      fixture: fixtures.getInventoryDocumentItems,
    },
    {
      idx: 2,
      method: "getInventoryDocumentSeries",
      params: undefined,
      fixture: fixtures.getInventoryDocumentSeries,
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

      const data = await bl.warehouseDocuments[method](params);
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
