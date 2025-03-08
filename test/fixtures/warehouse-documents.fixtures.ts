import type {
  GetInventoryDocumentItemsResponse,
  GetInventoryDocumentSeriesResponse,
  GetInventoryDocumentsResponse,
} from "../../src";

export const getInventoryDocuments: GetInventoryDocumentsResponse = {
  documents: [
    {
      document_id: 1,
      document_type: 0,
      document_status: 0,
      direction: 0,
      document_series_id: 1,
      full_number: "1/1/2023/GR",
      date_created: 1679574400,
      date_confirmed: 0,
      warehouse_id: 1,
      warehouse_id2: 0,
      items_count: 1,
      total_quantity: 1,
      total_price: 100,
    },
  ],
};

export const getInventoryDocumentItems: GetInventoryDocumentItemsResponse = {
  items: [
    {
      document_id: 1,
      item_id: 1,
      position: 1,
      product_id: 1,
      product_name: "Product 1",
      product_ean: "1234567890123",
      product_sku: "SKU-1",
      quantity: 1,
      price: 100,
      total_price: 100,
      inventory_id: 1,
      location_name: "Warehouse 1",
      expiry_date: "2023-01-01",
      batch: "Batch 1",
      serial_no: "Serial 1",
    },
  ],
};

export const getInventoryDocumentSeries: GetInventoryDocumentSeriesResponse = {
  document_series: [
    {
      document_series_id: 1,
      name: "Series 1",
      document_type: 0,
      warehouse_id: 1,
      format: "%N/%M/%Y/GR",
    },
  ],
};
