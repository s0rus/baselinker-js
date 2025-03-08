import type {
  AddInvoiceResponse,
  AddOrderProductResponse,
  AddOrderResponse,
  GetInvoiceFileResponse,
  GetInvoicesResponse,
  GetJournalListResponse,
  GetNewReceiptsResponse,
  GetOrderExtraFieldsResponse,
  GetOrderPaymentsHistoryResponse,
  GetOrderPickPackHistoryResponse,
  GetOrdersByEmailResponse,
  GetOrdersByPhoneResponse,
  GetOrderSourcesResponse,
  GetOrdersResponse,
  GetOrderStatusListResponse,
  GetOrderTransactionDataResponse,
  GetReceiptResponse,
  GetSeriesResponse,
} from "../../src/";

export const getJournalList: GetJournalListResponse = {
  logs: [
    {
      date: 1677721600000,
      id: 1,
      log_type: 1,
      order_id: 1,
    },
  ],
};

export const addOrder: AddOrderResponse = {
  order_id: 1,
};

export const getOrderSources: GetOrderSourcesResponse = {
  sources: {
    shop: {
      "1": "test",
    },
    personal: {
      "1": "test",
    },
  },
};

export const getOrderExtraFields: GetOrderExtraFieldsResponse = {
  extra_fields: [
    {
      name: "test",
      editor_type: "text",
      extra_field_id: 1,
    },
  ],
};

export const getOrders: GetOrdersResponse = {
  orders: [
    {
      order_id: 1,
      email: "test@test.com",
      phone: "1234567890",
      currency: "USD",
      date_add: 1677721600000,
      date_confirmed: 1677721600000,
      date_in_status: 1677721600000,
      extra_field_1: "test",
      extra_field_2: "test",
      confirmed: true,
      order_page: "test",
      pack_state: 1,
      pick_state: 1,
      user_login: "test",
      invoice_nip: "test",
      invoice_city: "test",
      order_source: "personal",
      payment_done: 100,
      want_invoice: 1,
      delivery_city: "test",
      shop_order_id: 1,
      invoice_state: "test",
      user_comments: "test",
      admin_comments: "test",
      delivery_price: 100,
      delivery_state: "test",
      payment_method: "test",
      delivery_method: "test",
      invoice_address: "test",
      invoice_company: "test",
      invoice_country: "test",
      order_source_id: 1,
      order_status_id: 1,
      delivery_address: "test",
      delivery_company: "test",
      delivery_country: "test",
      invoice_fullname: "test",
      invoice_postcode: "test",
      delivery_fullname: "test",
      delivery_point_id: "test",
      delivery_postcode: "test",
      external_order_id: "test",
      order_source_info: "test",
      payment_method_cod: 1,
      delivery_package_nr: "test",
      delivery_point_city: "test",
      delivery_point_name: "test",
      invoice_country_code: "PL",
      delivery_country_code: "PL",
      delivery_point_address: "test",
      delivery_package_module: "test",
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
          bundle_id: 1,
          product_id: 1,
          storage_id: 1,
          attributes: "",
          price_brutto: 100,
          warehouse_id: 1,
          order_product_id: 1,
          variant_id: 1,
        },
      ],
    },
  ],
};

export const getOrderTransactionData: GetOrderTransactionDataResponse = {
  ship_date_to: 1677721600000,
  ship_date_from: 1677721600000,
  delivery_date_to: 1677721600000,
  delivery_date_from: 1677721600000,
};

export const getOrdersByEmail: GetOrdersByEmailResponse = {
  orders: [
    {
      order_status_id: 1,
      date_in_status: 1677721600000,
      date_add: 1677721600000,
      order_id: 1,
    },
  ],
};

export const getOrdersByPhone: GetOrdersByPhoneResponse = {
  orders: [
    {
      order_id: 1,
      date_add: 1677721600000,
      date_in_status: 1677721600000,
      order_status_id: 1,
      delivery_fullname: "test",
      delivery_company: "test",
    },
  ],
};

export const addInvoice: AddInvoiceResponse = {
  invoice_id: 1,
};

export const getInvoices: GetInvoicesResponse = {
  invoices: [
    {
      invoice_id: 1,
      date_add: 1677721600000,
      order_id: 1,
      invoice_country_code: "PL",
      invoice_postcode: "test",
      invoice_fullname: "test",
      invoice_country: "test",
      invoice_company: "test",
      invoice_address: "test",
      invoice_city: "test",
      invoice_nip: "test",
      currency: "USD",
      type: "normal",
      year: 2023,
      month: 1,
      issuer: "test",
      number: "test",
      seller: "test",
      sub_id: 1,
      payment: "test",
      postfix: "test",
      date_sell: 1677721600000,
      series_id: 1,
      date_pay_to: 1677721600000,
      external_id: 1,
      exchange_date: "2023-01-01",
      exchange_info: "test",
      exchange_rate: 100,
      additional_info: "test",
      correcting_data: true,
      correcting_items: true,
      correcting_reason: "test",
      exchange_currency: "PLN",
      total_price_netto: 100,
      total_price_brutto: 100,
      external_invoice_number: "test",
      correcting_to_invoice_id: 1,
      items: [
        {
          order_product_id: 1,
          price_brutto: 100,
          tax_rate: 23,
          quantity: 1,
          sku: "test",
          ean: "test",
          name: "test",
          is_shipment: 0,
          price_netto: 100,
        },
      ],
    },
  ],
};

export const getSeries: GetSeriesResponse = {
  series: [
    {
      type: "INVOICE",
      name: "test",
      id: 1,
      format: "test",
    },
  ],
};

export const getOrderStatusList: GetOrderStatusListResponse = {
  statuses: [
    {
      id: 1,
      name: "test",
      name_for_customer: "test",
    },
  ],
};

export const getOrderPaymentsHistory: GetOrderPaymentsHistoryResponse = {
  payments: [
    {
      currency: "USD",
      date: 1677721600000,
      comment: "test",
      paid_after: 100,
      paid_before: 0,
      total_price: 100,
      external_payment_id: "100",
    },
  ],
};

export const getOrderPickPackHistory: GetOrderPickPackHistoryResponse = {
  history: [
    {
      cart_id: 1,
      profile: "test",
      entry_date: 1677721600000,
      station_id: 1,
      action_type: 1,
    },
  ],
};

export const getNewReceipts: GetNewReceiptsResponse = {
  orders: [
    {
      series_id: 1,
      order_id: 1,
      date_add: 1677721600000,
      payment_method: "test",
      nip: "test",
      receipt_id: 1,
      receipt_full_nr: "test",
      products: [
        {
          name: "test",
          ean: "test",
          sku: "test",
          quantity: 1,
          tax_rate: 23,
          price_brutto: 100,
        },
      ],
    },
  ],
};

export const getReceipt: GetReceiptResponse = {
  receipt_full_nr: "test",
  receipt_id: 1,
  nip: "test",
  payment_method: "test",
  date_add: 1677721600000,
  order_id: 1,
  series_id: 1,
  currency: "USD",
  total_price_brutto: 100,
  exchange_currency: "PLN",
  exchange_rate: 100,
  exchange_info: "test",
  exchange_date: "2023-01-01",
  sub_id: 1,
  month: 1,
  year: 2023,
  external_receipt_number: "test",
  items: [
    {
      price_brutto: 100,
      tax_rate: 23,
      quantity: 1,
      sku: "test",
      ean: "test",
      name: "test",
    },
  ],
};

export const setOrderFields = {};

export const addOrderProduct: AddOrderProductResponse = {
  order_product_id: 1,
};

export const setOrderProductFields = {};

export const deleteOrderProduct = {};

export const setOrderPayment = {};

export const setOrderStatus = {};

export const setOrderStatuses = {};

export const setOrderReceipt = {};

export const addOrderInvoiceFile = {};

export const addOrderReceiptFile = {};

export const getInvoiceFile: GetInvoiceFileResponse = {
  invoice: "test",
  invoice_number: "test",
};

export const runOrderMacroTrigger = {};
