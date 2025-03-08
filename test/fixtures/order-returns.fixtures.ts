import type {
  AddOrderReturnProductResponse,
  AddOrderReturnResponse,
  GetJournalListResponse,
  GetOrderReturnExtraFieldsResponse,
  GetOrderReturnPaymentsHistoryResponse,
  GetOrderReturnProductStatusesResponse,
  GetOrderReturnReasonListResponse,
  GetOrderReturnsResponse,
  GetOrderReturnStatusListResponse,
} from "../../src";

export const getOrderReturnJournalList: GetJournalListResponse = {
  logs: [
    {
      order_id: 1,
      id: 1,
      date: 1673219200,
      log_type: 1,
    },
  ],
};

export const addOrderReturn: AddOrderReturnResponse = {
  return_id: 1,
};

export const getOrderReturnExtraFields: GetOrderReturnExtraFieldsResponse = {
  extra_fields: [
    {
      name: "test",
      editor_type: "text",
      extra_field_id: 1,
    },
  ],
};

export const getOrderReturns: GetOrderReturnsResponse = {
  returns: [
    {
      return_id: 1,
      order_id: 1,
      currency: "PLN",
      date_add: 1673219200,
      email: "test@test.com",
      phone: "123456789",
      products: [
        {
          name: "test",
          ean: "test",
          sku: "test",
          weight: 1,
          storage: "db",
          location: "warehouse",
          quantity: 1,
          tax_rate: 23,
          bundle_id: 1,
          status_id: 1,
          product_id: 1,
          storage_id: 1,
          variant_id: 1,
          price_brutto: 100,
          warehouse_id: 1,
          return_reason_id: 1,
          order_return_product_id: 1,
          attributes: "",
        },
      ],
      status_id: 1,
      refunded: "0.00",
      user_login: "test",
      delivery_city: "test",
      extra_field_1: "test",
      extra_field_2: "test",
      shop_order_id: 1,
      admin_comments: "test",
      date_in_status: 1673219200,
      delivery_price: 100,
      delivery_state: "test",
      delivery_address: "test",
      delivery_company: "test",
      delivery_country: "test",
      reference_number: "test",
      delivery_fullname: "test",
      delivery_postcode: "test",
      external_order_id: "test",
      order_return_iban: "test",
      fulfillment_status: 0,
      order_return_swift: "test",
      custom_extra_fields: {},
      delivery_package_nr: "test",
      order_return_source: "shop",
      delivery_country_code: "PL",
      order_return_source_id: 1,
      delivery_package_module: "test",
      order_return_account_number: "test",
    },
  ],
};

export const getOrderReturnStatusList: GetOrderReturnStatusListResponse = {
  statuses: [
    {
      id: 1,
      name: "test",
      name_for_customer: "test",
      color: "test",
    },
  ],
};

export const getOrderReturnPaymentsHistory: GetOrderReturnPaymentsHistoryResponse =
  {
    payments: [
      {
        date: 1673219200,
        currency: "PLN",
        paid_after: 100,
        paid_before: 0,
        total_price: 100,
        external_payment_id: "test",
      },
    ],
  };

export const setOrderReturnFields = {};

export const addOrderReturnProduct: AddOrderReturnProductResponse = {
  order_return_product_id: 1,
};

export const setOrderReturnProductFields = {};

export const deleteOrderReturnProduct = {};

export const setOrderReturnRefund = {};

export const getOrderReturnReasonsList: GetOrderReturnReasonListResponse = {
  return_reasons: [
    {
      name: "test",
      return_reason_id: 1,
    },
  ],
};

export const setOrderReturnStatus = {};

export const setOrderReturnStatuses = {};

export const runOrderReturnMacroTrigger = {};

export const getOrderReturnProductStatuses: GetOrderReturnProductStatusesResponse =
  {
    order_return_product_statuses: [
      {
        name: "test",
        status_id: 1,
      },
    ],
  };
