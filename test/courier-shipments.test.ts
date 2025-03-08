import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/courier-shipments.fixtures";
import { mockFetch } from "./test-setup";
import {
  createBaselinkerClient,
  CreatePackageManualParams,
  CreatePackageParams,
  DeleteCourierPackageParams,
  GetCourierAccountsParams,
  GetCourierFieldsParams,
  GetCourierPackagesStatusHistoryParams,
  GetCourierServicesParams,
  GetLabelParams,
  GetOrderPackagesParams,
  GetProtocolParams,
  GetRequestParcelPickupFieldsParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Courier shipments", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "createPackage",
      params: {
        order_id: 1,
        courier_code: "test",
        account_id: 1,
        fields: [
          {
            id: "test",
            value: "test",
          },
        ],
        packages: [
          {
            weight: 1,
            height: 25,
          },
        ],
      } satisfies CreatePackageParams,
      fixture: fixtures.createPackage,
    },
    {
      idx: 1,
      method: "createPackageManual",
      params: {
        order_id: 1,
        courier_code: "test",
        package_number: "test",
        pickup_date: 1673219200,
        return_shipment: false,
      } satisfies CreatePackageManualParams,
      fixture: fixtures.createPackageManual,
    },
    {
      idx: 2,
      method: "getCouriersList",
      params: undefined,
      fixture: fixtures.getCouriersList,
    },
    {
      idx: 3,
      method: "getCourierFields",
      params: {
        courier_code: "test",
      } satisfies GetCourierFieldsParams,
      fixture: fixtures.getCourierFields,
    },
    {
      idx: 4,
      method: "getCourierServices",
      params: {
        courier_code: "test",
        order_id: 1,
        account_id: 1,
        fields: [
          {
            id: "test",
            value: "test",
          },
        ],
        packages: [
          {
            weight: 1,
            height: 25,
          },
        ],
      } satisfies GetCourierServicesParams,
      fixture: fixtures.getCourierServices,
    },
    {
      idx: 5,
      method: "getCourierAccounts",
      params: {
        courier_code: "test",
      } satisfies GetCourierAccountsParams,
      fixture: fixtures.getCourierAccounts,
    },
    {
      idx: 6,
      method: "getLabel",
      params: {
        courier_code: "test",
        package_id: 1,
      } satisfies GetLabelParams,
      fixture: fixtures.getLabel,
    },
    {
      idx: 7,
      method: "getProtocol",
      params: {
        courier_code: "test",
        account_id: 1,
        package_ids: [1],
      } satisfies GetProtocolParams,
      fixture: fixtures.getProtocol,
    },
    {
      idx: 8,
      method: "getOrderPackages",
      params: {
        order_id: "1",
      } satisfies GetOrderPackagesParams,
      fixture: fixtures.getOrderPackages,
    },
    {
      idx: 9,
      method: "getCourierPackagesStatusHistory",
      params: {
        package_ids: [1],
      } satisfies GetCourierPackagesStatusHistoryParams,
      fixture: fixtures.getCourierPackagesStatusHistory,
    },
    {
      idx: 10,
      method: "deleteCourierPackage",
      params: {
        courier_code: "test",
        package_id: 1,
      } satisfies DeleteCourierPackageParams,
      fixture: fixtures.deleteCourierPackage,
    },
    {
      idx: 11,
      method: "requestParcelPickup",
      params: undefined,
      fixture: fixtures.requestParcelPickup,
    },
    {
      idx: 12,
      method: "getRequestParcelPickupFields",
      params: {
        courier_code: "test",
      } satisfies GetRequestParcelPickupFieldsParams,
      fixture: fixtures.getRequestParcelPickupFields,
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

      const data = await bl.courierShipments[method](params);
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
