import type {
  GetInventoryPurchaseOrderItemsResponse,
  GetInventoryPurchaseOrderSeriesResponse,
  GetInventoryPurchaseOrdersResponse,
} from "../../src";

export const getInventoryPurchaseOrders: GetInventoryPurchaseOrdersResponse = {
  purchase_orders: [
    {
      status: 1,
      currency: "PLN",
      date_add: 1679574400,
      order_id: 1,
      series_id: 1,
      payer_id: 1,
      total_cost: 100,
      items_count: 1,
      supplier_id: 1,
      invoice_no: "test",
      date_created: 1679574400,
      warehouse_id: 1,
      total_quantity: 1,
      date_received: 1679574400,
      document_number: "test",
      date_completed: 1679574400,
      completed_total_cost: 100,
      completed_items_count: 1,
      completed_total_quantity: 1,
      notes: "test",
    },
  ],
};

export const getInventoryPurchaseOrderItems: GetInventoryPurchaseOrderItemsResponse =
  {
    items: [
      {
        item_id: 1,
        position: 1,
        quantity: 1,
        item_cost: 100,
        location: "test",
        product_id: 1,
        serial_no: "test",
        product_ean: "test",
        product_sku: "test",
        product_name: "test",
        expiry_date: "2023-01-01",
        batch: "test",
        supplier_code: "test",
        completed_quantity: 1,
      },
    ],
  };

export const getInventoryPurchaseOrderSeries: GetInventoryPurchaseOrderSeriesResponse =
  {
    series: [
      {
        warehouse_id: 1,
        series_id: 1,
        name: "test",
        format: "test",
      },
    ],
  };
