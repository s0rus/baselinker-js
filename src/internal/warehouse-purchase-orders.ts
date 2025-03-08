import type {
  CurrencyCode,
  InventoryPurchaseOrderStatus,
} from "../external/index.js";

export type WarehousePurchaseOrdersCategory = {
  /**
   * The method allows you to retrieve a list of purchase orders from BaseLinker storage
   */
  getInventoryPurchaseOrders: {
    params?: {
      /**
       * Filter purchase orders by inventory ID
       * The list of IDs can be retrieved using the `getInventories` method
       */
      inventory_id?: number;
      /**
       * Filter purchase orders by supplier ID
       */
      supplier_id?: number;
      /**
       * Filter purchase orders by document series ID
       */
      series_id?: number;
      /**
       * Filter purchase orders by date from
       * Unix timestamp format
       */
      date_from?: number;
      /**
       * Filter purchase orders by date to
       * Unix timestamp format
       */
      date_to?: number;
      /**
       * Filter purchase orders by document number (full or partial match)
       */
      filter_document_number?: string;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Array of purchase orders
       */
      readonly purchase_orders: Array<{
        /**
         * Purchase order ID
         */
        readonly order_id: number;
        /**
         * Document series ID
         */
        readonly series_id: number;
        /**
         * Full document number
         */
        readonly document_number: string;
        /**
         * Date of document creation
         * Unix timestamp format
         */
        readonly date_add: number;
        /**
         * Date of document issue
         * Unix timestamp format
         */
        readonly date_created: number;
        /**
         * Date of document received
         * Unix timestamp format
         */
        readonly date_received?: number;
        /**
         * Date of document completion
         * Unix timestamp format
         */
        readonly date_completed?: number;
        /**
         * Warehouse ID
         */
        readonly warehouse_id: number;
        /**
         * Supplier ID
         */
        readonly supplier_id: number;
        /**
         * Payer ID
         */
        readonly payer_id?: number;
        /**
         * Three-letter currency code (e.g. USD, EUR, PLN)
         */
        readonly currency: CurrencyCode;
        /**
         * Total quantity of items
         */
        readonly total_quantity: number;
        /**
         * Total quantity of received items
         */
        readonly completed_total_quantity: number;
        /**
         * Total order cost
         */
        readonly total_cost: number;
        /**
         * Total cost of received items
         */
        readonly completed_total_cost: number;
        /**
         * Number of unique items in the purchase order
         */
        readonly items_count: number;
        /**
         * Number of unique received items in the purchase order
         */
        readonly completed_items_count: number;
        /**
         * Related invoice number
         */
        readonly invoice_no?: string;
        /**
         * Order notes/description
         */
        readonly notes?: string;
        /**
         * Purchase order status
         * Available values are:
         *  - 0 - Draft
         *  - 1 - Sent
         *  - 2 - Received
         *  - 3 - Completed
         *  - 4 - Completed partially
         *  - 5 - Cancelled
         */
        readonly status: InventoryPurchaseOrderStatus;
      }>;
    };
  };

  /**
   * The method allows you to retrieve items from a specific purchase order
   */
  getInventoryPurchaseOrderItems: {
    params: {
      /**
       * Purchase order ID
       */
      order_id: number;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Array of purchase order items
       */
      readonly items: Array<{
        /**
         * Item ID
         */
        readonly item_id: number;
        /**
         * Product ID
         */
        readonly product_id: number;
        /**
         * Line item number within the purchase order
         */
        readonly position: number;
        /**
         * Product name on document
         */
        readonly product_name: string;
        /**
         * Product SKU number
         */
        readonly product_sku: string;
        /**
         * Product EAN number
         */
        readonly product_ean: string;
        /**
         * Product code from supplier
         */
        readonly supplier_code?: string;
        /**
         * Ordered quantity
         */
        readonly quantity: number;
        /**
         * Received quantity
         */
        readonly completed_quantity: number;
        /**
         * Item unit cost
         */
        readonly item_cost: number;
        /**
         * Storage location
         */
        readonly location?: string;
        /**
         * Expiry date
         * Date format YYYY-MM-DD
         */
        readonly expiry_date?: string;
        /**
         * Batch number
         */
        readonly batch?: string;
        /**
         * Serial number
         */
        readonly serial_no?: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a list of purchase order document series from BaseLinker storage
   */
  getInventoryPurchaseOrderSeries: {
    params?: {
      /**
       * Filter purchase order series by warehouse ID
       */
      warehouse_id?: number;
    };
    response: {
      /**
       * Array of purchase order series
       */
      readonly series: Array<{
        /**
         * Document series ID
         */
        readonly series_id: number;
        /**
         * Name of the document series
         */
        readonly name: string;
        /**
         * Warehouse ID
         */
        readonly warehouse_id: number;
        /**
         * Document number format
         */
        readonly format: string;
      }>;
    };
  };
};
