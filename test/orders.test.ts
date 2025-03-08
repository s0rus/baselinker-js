import { describe, expect, test } from "bun:test";
import { mockFetch } from "./test-setup";
import * as fixtures from "./fixtures/orders.fixtures.js";
import {
  AddInvoiceParams,
  AddOrderInvoiceFileParams,
  AddOrderParams,
  AddOrderProductParams,
  AddOrderReceiptFileParams,
  createBaselinkerClient,
  DeleteOrderProductParams,
  GetInvoiceFileParams,
  GetInvoicesParams,
  GetJournalListParams,
  GetNewReceiptsParams,
  GetOrderPaymentsHistoryParams,
  GetOrderPickPackHistoryParams,
  GetOrdersByEmailParams,
  GetOrdersByPhoneParams,
  GetOrdersParams,
  GetOrderTransactionDataParams,
  GetReceiptParams,
  SetOrderFieldsParams,
  SetOrderPaymentParams,
  SetOrderProductFieldsParams,
  SetOrderReceiptParams,
  SetOrderStatusesParams,
  SetOrderStatusParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Orders", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "getJournalList",
      params: {
        order_id: 1,
        logs_types: [1],
        last_log_id: 1,
      } satisfies GetJournalListParams,
      fixture: fixtures.getJournalList,
    },
    {
      idx: 1,
      method: "addOrder",
      params: {
        paid: 1,
        email: "test@example.com",
        phone: "1234567890",
        currency: "USD",
        date_add: 1677721600,
        extra_field_1: "test",
        user_login: "test",
        invoice_nip: "test",
        invoice_city: "test",
        want_invoice: 1,
        delivery_city: "test",
        extra_field_2: "test",
        delivery_address: "test",
        delivery_state: "test",
        invoice_state: "test",
        user_comments: "test",
        admin_comments: "test",
        delivery_price: 100,
        payment_method: "test",
        delivery_method: "test",
        invoice_address: "test",
        invoice_company: "test",
        order_status_id: 1,
        delivery_company: "test",
        invoice_fullname: "test",
        invoice_postcode: "test",
        delivery_fullname: "test",
        delivery_point_id: "test",
        delivery_postcode: "test",
        custom_source_id: 1,
        payment_method_cod: 1,
        custom_extra_fields: {},
        delivery_point_city: "test",
        delivery_point_name: "test",
        invoice_country_code: "PL",
        delivery_country_code: "PL",
        delivery_point_address: "test",
        delivery_point_postcode: "test",
        products: [
          {
            name: "test",
            ean: "test",
            sku: "test",
            weight: 25,
            storage: "db",
            location: "test",
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
      } satisfies AddOrderParams,
      fixture: fixtures.addOrder,
    },
    {
      idx: 2,
      method: "getOrderSources",
      params: undefined,
      fixture: fixtures.getOrderSources,
    },
    {
      idx: 3,
      method: "getOrderExtraFields",
      params: undefined,
      fixture: fixtures.getOrderExtraFields,
    },
    {
      idx: 4,
      method: "getOrders",
      params: {} satisfies GetOrdersParams,
      fixture: fixtures.getOrders,
    },
    {
      idx: 5,
      method: "getOrderTransactionData",
      params: {
        order_id: 1,
      } satisfies GetOrderTransactionDataParams,
      fixture: fixtures.getOrderTransactionData,
    },
    {
      idx: 6,
      method: "getOrdersByEmail",
      params: {
        email: "test@example.com",
      } satisfies GetOrdersByEmailParams,
      fixture: fixtures.getOrdersByEmail,
    },
    {
      idx: 7,
      method: "getOrdersByPhone",
      params: {
        phone: "1234567890",
      } satisfies GetOrdersByPhoneParams,
      fixture: fixtures.getOrdersByPhone,
    },
    {
      idx: 8,
      method: "addInvoice",
      params: {
        order_id: 1,
        series_id: 1,
        vat_rate: "DEFAULT",
      } satisfies AddInvoiceParams,
      fixture: fixtures.addInvoice,
    },
    {
      idx: 9,
      method: "getInvoices",
      params: {
        order_id: 1,
        series_id: 1,
      } satisfies GetInvoicesParams,
      fixture: fixtures.getInvoices,
    },
    {
      idx: 10,
      method: "getSeries",
      params: undefined,
      fixture: fixtures.getSeries,
    },
    {
      idx: 11,
      method: "getOrderStatusList",
      params: undefined,
      fixture: fixtures.getOrderStatusList,
    },
    {
      idx: 12,
      method: "getOrderPaymentsHistory",
      params: {
        order_id: 1,
      } satisfies GetOrderPaymentsHistoryParams,
      fixture: fixtures.getOrderPaymentsHistory,
    },
    {
      idx: 13,
      method: "getOrderPickPackHistory",
      params: {
        order_id: 1,
      } satisfies GetOrderPickPackHistoryParams,
      fixture: fixtures.getOrderPickPackHistory,
    },
    {
      idx: 14,
      method: "getNewReceipts",
      params: {
        series_id: 1,
      } satisfies GetNewReceiptsParams,
      fixture: fixtures.getNewReceipts,
    },
    {
      idx: 15,
      method: "getReceipt",
      params: {
        order_id: 1,
      } satisfies GetReceiptParams,
      fixture: fixtures.getReceipt,
    },
    {
      idx: 16,
      method: "setOrderFields",
      params: {
        order_id: 1,
        email: "test@example.com",
      } satisfies SetOrderFieldsParams,
      fixture: fixtures.setOrderFields,
    },
    {
      idx: 17,
      method: "addOrderProduct",
      params: {
        order_id: 1,
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
        weight: 25,
        sku: "test",
        ean: "test",
        name: "test",
      } satisfies AddOrderProductParams,
      fixture: fixtures.addOrderProduct,
    },
    {
      idx: 18,
      method: "setOrderProductFields",
      params: {
        order_id: 1,
        name: "test",
        order_product_id: 1,
      } satisfies SetOrderProductFieldsParams,
      fixture: fixtures.setOrderProductFields,
    },
    {
      idx: 19,
      method: "deleteOrderProduct",
      params: {
        order_product_id: 1,
        order_id: 1,
      } satisfies DeleteOrderProductParams,
      fixture: fixtures.deleteOrderProduct,
    },
    {
      idx: 20,
      method: "setOrderPayment",
      params: {
        order_id: 1,
        payment_date: 1677721600,
        payment_done: 1,
        payment_comment: "test",
      } satisfies SetOrderPaymentParams,
      fixture: fixtures.setOrderPayment,
    },
    {
      idx: 21,
      method: "setOrderStatus",
      params: {
        order_id: 1,
        status_id: 1,
      } satisfies SetOrderStatusParams,
      fixture: fixtures.setOrderStatus,
    },
    {
      idx: 22,
      method: "setOrderStatuses",
      params: {
        status_id: 1,
        order_ids: [1],
      } satisfies SetOrderStatusesParams,
      fixture: fixtures.setOrderStatuses,
    },
    {
      idx: 23,
      method: "setOrderReceipt",
      params: {
        date: 1677721600,
        receipt_id: 1,
      } satisfies SetOrderReceiptParams,
      fixture: fixtures.setOrderReceipt,
    },
    {
      idx: 24,
      method: "addOrderInvoiceFile",
      params: {
        file: "data:4AAQSkZJRgABA[...]",
        invoice_id: 1,
      } satisfies AddOrderInvoiceFileParams,
      fixture: fixtures.addOrderInvoiceFile,
    },
    {
      idx: 25,
      method: "addOrderReceiptFile",
      params: {
        file: "data:4AAQSkZJRgABA[...]",
        receipt_id: 1,
      } satisfies AddOrderReceiptFileParams,
      fixture: fixtures.addOrderReceiptFile,
    },
    {
      idx: 26,
      method: "getInvoiceFile",
      params: {
        invoice_id: 1,
      } satisfies GetInvoiceFileParams,
      fixture: fixtures.getInvoiceFile,
    },
    {
      idx: 27,
      method: "runOrderMacroTrigger",
      params: undefined,
      fixture: fixtures.runOrderMacroTrigger,
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

      const data = await bl.orders[method](params);
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
