import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/baselinker-connect.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  AddConnectContractorCreditParams,
  createBaselinkerClient,
  GetConnectContractorCreditHistoryParams,
  GetConnectIntegrationContractorsParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Baselinker Connect", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getConnectIntegrations",
      params: undefined,
      fixture: fixtures.getConnectIngegrations,
    },
    {
      idx: 1,
      method: "getConnectIntegrationContractors",
      params: {
        connect_integration_id: 1,
      } satisfies GetConnectIntegrationContractorsParams,
      fixture: fixtures.getConnectIntegrationContractors,
    },
    {
      idx: 2,
      method: "getConnectContractorCreditHistory",
      params: {
        connect_contractor_id: 1,
      } satisfies GetConnectContractorCreditHistoryParams,
      fixture: fixtures.getConnectContractorCreditHistory,
    },
    {
      idx: 3,
      method: "addConnectContractorCredit",
      params: {
        connect_contractor_id: 1,
        amount: 100,
        message: "Credit entry 1",
      } satisfies AddConnectContractorCreditParams,
      fixture: fixtures.addConnectContractorCredit,
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

      const data = await bl.baselinkerConnect[method](params);
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
