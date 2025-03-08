import type { Flag, WarehouseDocumentType } from "../external/index.js";

export type WarehouseDocumentsCategory = {
  /**
   * The method allows you to retrieve a list of inventory documents from BaseLinker
   */
  getInventoryDocuments: {
    params: {
      /**
       * Limit results to documents with a specific inventory document ID
       */
      filter_document_id?: number;
      /**
       * Limit results to documents with a specific document type
       * Available values are:
       *  - 0 - GR (Goods Received)
       *  - 1 - IGR (Internal Goods Received)
       *  - 2 - GI (Goods Issue)
       *  - 3 - IGI (Internal Goods Issue)
       *  - 4 - IT (Internal Transfer)
       *  - 5 - OB (Opening Balance)
       */
      filter_document_type?: WarehouseDocumentType;
      /**
       * Limit results to documents with a specific document status
       * Available values are:
       *  - 0 - Draft
       *  - 1 - Confirmed
       */
      filter_document_status?: Flag;
      /**
       * Limit results to documents with a minimum creation date
       * Unix timestamp format
       */
      filter_date_from?: number;
      /**
       * Limit results to documents with a maximum creation date
       * Unix timestamp format
       */
      filter_date_to?: number;
      /**
       * Limit results to documents with a specific warehouse ID
       */
      filter_warehouse_id?: number;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    readonly response: {
      /**
       * Array of inventory documents
       */
      readonly documents: Array<{
        /**
         * Document ID
         */
        readonly document_id: number;
        /**
         * Document type
         * Available values are:
         *  - 0 - GR (Goods Received)
         *  - 1 - IGR (Internal Goods Received)
         *  - 2 - GI (Goods Issue)
         *  - 3 - IGI (Internal Goods Issue)
         *  - 4 - IT (Internal Transfer)
         *  - 5 - OB (Opening Balance)
         */
        readonly document_type: WarehouseDocumentType;
        /**
         * Document status
         * Available values are:
         *  - 0 - Draft
         *  - 1 - Confirmed
         */
        readonly document_status: Flag;
        /**
         * Document direction
         * Available values are:
         *  - 0 - Incoming
         *  - 1 - Outgoing
         */
        readonly direction?: Flag;
        /**
         * ID of the document series
         */
        readonly document_series_id?: number;
        /**
         * Full document number
         */
        readonly full_number: string;
        /**
         * Date of document creation
         * Unix timestamp format
         */
        readonly date_created: number;
        /**
         * Date of document confirmation
         * Unix timestamp format
         *
         * `0` is returned if the document is not confirmed
         */
        readonly date_confirmed: number;
        /**
         * Main warehouse ID used for the document
         */
        readonly warehouse_id: number;
        /**
         * Second (destination) warehouse ID for transfers
         */
        readonly warehouse_id2?: number;
        /**
         * Number of items in the document
         */
        readonly items_count: number;
        /**
         * Total quantity of items in the document
         */
        readonly total_quantity: number;
        /**
         * Total price of items in the document
         */
        readonly total_price: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve document items for specific or for all inventory documents in BaseLinker
   */
  getInventoryDocumentItems: {
    params: {
      /**
       * Inventory document ID
       */
      document_id: number;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Array of document items
       */
      readonly items: Array<{
        /**
         * ID of document to which the item belongs
         */
        readonly document_id: number;
        /**
         * ID of the document item
         */
        readonly item_id: number;
        /**
         * Line item number within the document
         */
        readonly position: number;
        /**
         * Product ID
         */
        readonly product_id: number;
        /**
         * Product name
         */
        readonly product_name: string;
        /**
         * Product EAN number
         */
        readonly product_ean: string;
        /**
         * Product SKU number
         */
        readonly product_sku: string;
        /**
         * Quantity of the line item in the document
         */
        readonly quantity: number;
        /**
         * Unit price
         */
        readonly price: number;
        /**
         * Total value of the item
         */
        readonly total_price: number;
        /**
         * Inventory ID (if applicable)
         */
        readonly inventory_id?: number;
        /**
         * Location (location column)
         */
        readonly location_name: string;
        /**
         * Expiry date (if relevant)
         * Date format YYYY-MM-DD
         */
        readonly expiry_date: string;
        /**
         * Product batch
         */
        readonly batch: string;
        /**
         * Product serial number
         */
        readonly serial_no: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve information about available inventory document series in BaseLinker
   * Each series can be linked to a specific warehouse (`warehouse_id`) and can have it's own numbering format settings
   */
  getInventoryDocumentSeries: {
    params: void;
    response: {
      /**
       * Array of document series
       */
      readonly document_series: Array<{
        /**
         * ID of the document series
         */
        readonly document_series_id: number;
        /**
         * Name of the document series
         */
        readonly name: string;
        /**
         * Document type
         * Available values are:
         *  - 0 - GR (Goods Received)
         *  - 1 - IGR (Internal Goods Received)
         *  - 2 - GI (Goods Issue)
         *  - 3 - IGI (Internal Goods Issue)
         *  - 4 - IT (Internal Transfer)
         *  - 5 - OB (Opening Balance)
         */
        readonly document_type: WarehouseDocumentType;
        /**
         * Warehouse ID
         */
        readonly warehouse_id: number;
        /**
         * Format for document numbering
         * (e.g "%N/%M/%Y/GR" in the format column)
         */
        readonly format: string;
      }>;
    };
  };
};
