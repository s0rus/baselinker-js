import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/order-returns.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  AddOrderReturnParams,
  AddOrderReturnProductParams,
  createBaselinkerClient,
  DeleteOrderReturnProductParams,
  GetOrderReturnJournalListParams,
  GetOrderReturnPaymentsHistoryParams,
  GetOrderReturnsParams,
  RunOrderMacroTriggerParams,
  SetOrderReturnProductFieldsParams,
  SetOrderReturnRefundParams,
  SetOrderReturnStatusesParams,
  SetOrderReturnStatusParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Order returns", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getOrderReturnJournalList",
      params: {
        return_id: 1,
        logs_types: [1],
        last_log_id: 1,
      } satisfies GetOrderReturnJournalListParams,
      fixture: fixtures.getOrderReturnJournalList,
    },
    {
      idx: 1,
      method: "addOrderReturn",
      params: {
        status_id: 1,
        currency: "PLN",
        email: "test@test.com",
        phone: "123456789",
        date_add: 1673219200,
        refunded: 0,
        products: [
          {
            status_id: 1,
            name: "test",
            return_reason_id: 1,
            ean: "test",
            sku: "test",
            weight: 1,
            storage: "db",
            location: "warehouse",
            quantity: 1,
            tax_rate: 23,
            attributes: "",
            product_id: 1,
            storage_id: 1,
            variant_id: 1,
            price_brutto: 100,
            warehouse_id: 1,
          },
        ],
        order_id: 1,
        user_login: "test",
        refund_iban: "test",
        refund_swift: "test",
        delivery_city: "test",
        extra_field_1: "test",
        extra_field_2: "test",
        admin_comments: "test",
        delivery_price: 100,
        delivery_state: "test",
        delivery_address: "test",
        delivery_company: "test",
        delivery_fullname: "test",
        delivery_postcode: "test",
        custom_source_id: 1,
        reference_number: "test",
        custom_extra_fields: {},
        delivery_country_code: "PL",
        refund_account_number: "test",
      } satisfies AddOrderReturnParams,
      fixture: fixtures.addOrderReturn,
    },
    {
      idx: 2,
      method: "getOrderReturnExtraFields",
      params: undefined,
      fixture: fixtures.getOrderReturnExtraFields,
    },
    {
      idx: 3,
      method: "getOrderReturns",
      params: {
        order_id: 1,
        id_from: 1,
        date_from: 1677721600,
        return_id: 1,
        status_id: 1,
        filter_order_return_source: "amazon",
        include_custom_extra_fields: true,
        filter_order_return_source_id: 1,
      } satisfies GetOrderReturnsParams,
      fixture: fixtures.getOrderReturns,
    },
    {
      idx: 4,
      method: "getOrderReturnStatusList",
      params: undefined,
      fixture: fixtures.getOrderReturnStatusList,
    },
    {
      idx: 5,
      method: "getOrderReturnPaymentsHistory",
      params: {
        return_id: 1,
        show_full_history: true,
      } satisfies GetOrderReturnPaymentsHistoryParams,
      fixture: fixtures.getOrderReturnPaymentsHistory,
    },
    {
      idx: 6,
      method: "setOrderReturnFields",
      params: undefined,
      fixture: fixtures.setOrderReturnFields,
    },
    {
      idx: 7,
      method: "addOrderReturnProduct",
      params: {
        return_id: 1,
        warehouse_id: 1,
        price_brutto: 100,
        variant_id: 1,
        storage_id: 1,
        product_id: 1,
        attributes: "",
        tax_rate: 23,
        quantity: 1,
        location: "test",
        storage: "db",
        weight: 1,
        sku: "test",
        ean: "test",
        return_reason_id: 1,
        name: "test",
        status_id: 1,
      } satisfies AddOrderReturnProductParams,
      fixture: fixtures.addOrderReturnProduct,
    },
    {
      idx: 8,
      method: "setOrderReturnProductFields",
      params: {
        return_id: 1,
        name: "test",
        order_return_product_id: 1,
      } satisfies SetOrderReturnProductFieldsParams,
      fixture: fixtures.setOrderReturnProductFields,
    },
    {
      idx: 9,
      method: "deleteOrderReturnProduct",
      params: {
        order_return_product_id: 1,
        return_id: 1,
      } satisfies DeleteOrderReturnProductParams,
      fixture: fixtures.deleteOrderReturnProduct,
    },
    {
      idx: 10,
      method: "setOrderReturnRefund",
      params: {
        return_id: 1,
        refund_date: 1677721600,
        refund_comment: "test",
        order_refund_done: 100,
        external_refund_id: "test",
      } satisfies SetOrderReturnRefundParams,
      fixture: fixtures.setOrderReturnRefund,
    },
    {
      idx: 11,
      method: "getOrderReturnReasonsList",
      params: undefined,
      fixture: fixtures.getOrderReturnReasonsList,
    },
    {
      idx: 12,
      method: "setOrderReturnStatus",
      params: {
        return_id: 1,
        status_id: 1,
      } satisfies SetOrderReturnStatusParams,
      fixture: fixtures.setOrderReturnStatus,
    },
    {
      idx: 13,
      method: "setOrderReturnStatuses",
      params: {
        return_ids: [1],
        status_id: 1,
      } satisfies SetOrderReturnStatusesParams,
      fixture: fixtures.setOrderReturnStatuses,
    },
    {
      idx: 14,
      method: "runOrderReturnMacroTrigger",
      params: {
        order_id: 1,
        trigger_id: 1,
      } satisfies RunOrderMacroTriggerParams,
      fixture: fixtures.runOrderReturnMacroTrigger,
    },
    {
      idx: 15,
      method: "getOrderReturnProductStatuses",
      params: undefined,
      fixture: fixtures.getOrderReturnProductStatuses,
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

      const data = await bl.orderReturns[method](params);
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
