import type {
  CountryCode,
  CurrencyCode,
  FieldType,
  Flag,
  OrderReturnFulfillmentStatus,
  OrderReturnLogType,
  OrderReturnSource,
  StorageType,
} from "../external/index.js";

export type OrderReturnsCategory = {
  /**
   * The method allows you to retrieve a list of return events from the last 3 days
   */
  getOrderReturnJournalList: {
    params: {
      /**
       * Log ID number from which the logs are to be retrieved
       */
      last_log_id: number;
      /**
       * Array of log types to be retrieved
       *
       * Types of logs:
       * - 1 - Return creation
       * - 2 - Return accepted
       * - 3 - Return completed
       * - 4 - Return cancelled
       * - 5 - Return refunded
       * - 6 - Editing return delivery data
       * - 7 - Adding a product to a return
       * - 8 - Editing a product in a return
       * - 9 - Editing return data
       * - 10 - Return status change
       * - 11 - Return item status change
       * - 12 - Return item status change
       */
      logs_types: Array<OrderReturnLogType>;
      /**
       * Return ID
       */
      return_id: number;
    };
    response: {
      /**
       * Array of return events
       */
      readonly logs: Array<{
        /**
         * Event ID
         */
        readonlyid: number;
        /**
         * Event type
         *
         * Types of events:
         * - 1 - Return creation
         * - 2 - Return accepted
         * - 3 - Return completed
         * - 4 - Return cancelled
         * - 5 - Return refunded
         * - 6 - Editing return delivery data
         * - 7 - Adding a product to a return
         * - 8 - Editing a product in a return
         * - 9 - Editing return data
         * - 10 - Return status change
         * - 11 - Return item status change
         * - 12 - Return item status change
         */
        readonly type: OrderReturnLogType;
        // TODO: No idea what to provide here as docs suck.
        /**
         * Additional information about the event based on the event type
         */
        readonly object_id: number;
        /**
         * Event date
         * Unix timestamp format
         */
        readonly date: number;
      }>;
    };
  };

  /**
   * The method allows you to add a new order return to BaseLinker
   */
  addOrderReturn: {
    params: {
      /**
       * Order ID from BaseLinker order list
       */
      order_id?: number;
      /**
       * Order return status ID
       * The list of available return statuses can be retrieved using the `getOrderReturnStatusList` method
       */
      status_id: number;
      /**
       * Custom order source ID defined in BaseLinker panel
       * If not provided, default order source is assigned
       */
      custom_source_id?: number;
      /**
       * Reference number from external source
       */
      reference_number?: string;
      /**
       * Date of order return creation
       * Unix timestamp
       */
      date_add: number;
      /**
       * 3-letter currency symbol e.g. EUR, PLN, USD
       */
      currency: CurrencyCode;
      /**
       * Flag indicating wether the order return is already refunded
       *  0 - Not refunded
       *  1 - Refunded
       */
      refunded: Flag;
      /**
       * Seller comments
       * Maximum length is 200 characters
       */
      admin_comments: string;
      /**
       * Buyer email address
       */
      email: string;
      /**
       * Buyer phone number
       */
      phone: string;
      /**
       * Marketplace user login
       */
      user_login: string;
      /**
       * Gross delivery price
       */
      delivery_price: number;
      /**
       * Delivery address - name and surname
       */
      delivery_fullname: string;
      /**
       * Delivery address - company
       */
      delivery_company: string;
      /**
       * Delivery address - street
       */
      delivery_address: string;
      /**
       * Delivery address - street and number
       */
      delivery_postcode: string;
      /**
       * Delivery address - city
       */
      delivery_city: string;
      /**
       * Delivery address - state/province
       */
      delivery_state: string;
      /**
       * Delivery address - country code (two letter, e.g. EN)
       */
      delivery_country_code: CountryCode;
      /**
       * Value of the "additional field 1" - the seller can store any information here
       */
      extra_field_1: string;
      /**
       * Value of the "additional field 2" - the seller can store any information here
       */
      extra_field_2: string;
      /**
       * Object containing order custom extra fields, where key is the extra field ID and value is an extra field content for the given extra field
       * The list of extra fields can be retrieved with the `getOrderReturnExtraFields` method
       *
       * In case of removing a field, pass an empty string for a given extra field ID
       * In case of a file  the following format is expected:
       * @example
       *
       * {
       *  "title": "file.pdf" // Max characters of 40
       *  "file": "data:4AAQSkZJRgABA[...]" // Base64 encoded binary with limit of 2MB
       * }
       */
      custom_extra_fields: Record<string, string>;
      /**
       * Array of products
       */
      products: Array<{
        /**
         * Type of magazine from which the product comes
         *  "db" - BaseLinker internal catalog
         *  "shop" - online store magazine
         *  "warehouse" - connected wholesaler
         */
        storage: StorageType;
        /**
         * Magazine ID from which the product comes
         * Pass "0" if the product comes from the BaseLinker internal catalog
         */
        storage_id: number;
        /**
         * Product ID in BaseLinker or store magazine
         * Blank if the product ID is not known
         */
        product_id: number;
        /**
         * Product variant ID
         * Blank if the product variant ID is not known
         */
        variant_id: number;
        /**
         * Product name
         */
        name: string;
        /**
         * Product SKU number
         */
        sku: string;
        /**
         * Product EAN number
         */
        ean: string;
        /**
         * Product location
         */
        location: string;
        /**
         * Product source warehouse ID
         * Applies only to products from BaseLinker internal catalog
         * By default, `warehouse_id` is determined based on the source of the order
         */
        warehouse_id: number;
        /**
         * Specific product attributes
         */
        attributes: string;
        /**
         * Single product gross price
         */
        price_brutto: number;
        /**
         * Product VAT tax rate e.g. 23
         * Value should be between 0 and 100 or:
         *  - -1 for EXPT/ZW exempt from VAT
         *  - -0.02 for NP annotation
         *  - -0.03 for OO VAT reverse charge
         */
        tax_rate: number;
        /**
         * Product quantity
         */
        quantity: number;
        /**
         * Single product weight
         */
        weight: number;
        /**
         * Return item status ID
         */
        status_id: number;
        /**
         * Return reason ID
         */
        return_reason_id: number;
      }>;
      /**
       * Bank account number to issue a refund
       */
      refund_account_number: string;
      /**
       * IBAN of the bank account
       */
      refund_iban: string;
      /**
       * SWIFT of the bank account
       */
      refund_swift: string;
    };
    response: {
      /**
       * Added return ID
       */
      readonly return_id: number;
    };
  };

  /**
   * The method allows you to retrieve extra fields defined for order returns
   * Values of those fields can be set using the `setOrderReturnFields` method
   * In order to retrieve values of those fields, `include_custom_extra_fields` flag has to be set to `true` in the `getOrderReturns` method
   */
  getOrderReturnExtraFields: {
    params: void;
    response: {
      // TODO: Is it an array or object? docs suck.
      /**
       * An array of available extra fields
       */
      readonly extra_fields: Array<{
        /**
         * Extra field ID
         */
        readonly extra_field_id: number;
        /**
         * Extra field name
         */
        readonly name: string;
        /**
         * Type of additional field
         * Available values are `text`, `number`, `select`, `checkbox`, `radio`, `date`, `file`
         */
        readonly editor_type: FieldType;
        /**
         * An array of values available for a given additional field
         * This field applies only to `select`, `checkbox` and `radio` field types
         */
        readonly options?: Array<string>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve order returns from the BaseLinker order manager
   * Maximum 100 returns can be retrieved at a time
   */
  getOrderReturns: {
    params: {
      /**
       * ID of the order the return was created from
       */
      order_id?: number;
      /**
       * Order return ID
       */
      return_id?: number;
      /**
       * Return creation date from which to retrieve returns
       * Unix timestamp format
       */
      date_from?: number;
      /**
       * Order return ID from which to retrieve returns
       */
      id_from?: number;
      /**
       * Flag indicating wether to include custom extra fields in the response
       * Default value is `false`
       */
      include_custom_extra_fields?: boolean;
      /**
       * Status ID from which order retruns are to be retrieved
       * Leave blank to retrieve returns from all statuses
       */
      status_id?: number;
      /**
       * Filter order return list by order return source, for instace "ebay", "amazon"
       * The list of order return sources can be retrieved using the `getOrderSources` method
       */
      filter_order_return_source?: string;
      /**
       * Filter order return list by order return source ID
       * Filtering by order return source ID requires `filter_order_return_source` to be set prior
       * The list of order return source IDs can be retrieved using the `getOrderSources` method
       */
      filter_order_return_source_id?: number;
    };
    response: {
      /**
       * Array of order returns
       */
      readonly returns: Array<{
        /**
         * Return order ID
         */
        readonly return_id: number;
        /**
         * Order ID from which the return was created
         */
        readonly order_id: number;
        /**
         * Order ID given by the store
         */
        readonly shop_order_id: number;
        /**
         * Order ID taken from external source e.g. the order number in the store, or the eBay transaction number
         */
        readonly external_order_id: string;
        /**
         * Reference number from external source
         */
        readonly reference_number: string;
        /**
         * Order return source type
         * Available values are:
         *  - "shop" - order created by the shop
         *  - "personal" - order created by the customer
         *  - "marketplace_code" - e.g. "ebay", "amazon", "ceneo", "emag", "allegro", etc.
         */
        readonly order_return_source: OrderReturnSource;
        /**
         * Order return source ID (e.g. internal Allegro account ID, internal shop ID, etc.)
         * Unique only in combination with `order_return_source` field
         */
        readonly order_return_source_id: number;
        /**
         * Order return status ID
         * List of available order return statuses can be retrieved using the `getOrderReturnStatusList` method
         */
        readonly status_id: number;
        /**
         * Date of order return creation
         * Unix timestamp format
         */
        readonly date_add: number;
        /**
         * Date from which the order is in the current order status
         * Unix timestamp format
         */
        readonly date_in_status: number;
        /**
         * Marketplace user login
         */
        readonly user_login: string;
        /**
         * 3-letter currency symbol e.g. EUR, PLN, USD
         */
        readonly currency: CurrencyCode;
        // TODO: I have no idea what this field is, its of type char(3) and in sample data its given "0.00" ???
        //       Docs suuuuuuuuck.
        /**
         * Flag indicating wether the order return is already refunded
         */
        readonly refunded: string;
        /**
         * Buyer email address
         */
        readonly email: string;
        /**
         * Buyer phone number
         */
        readonly phone: string;
        /**
         * Gross delivery price of a return
         */
        readonly delivery_price: number;
        /**
         * Delivery address - name and surname
         */
        readonly delivery_fullname: string;
        /**
         * Delivery address - company
         */
        readonly delivery_company: string;
        /**
         * Delivery address - street and number
         */
        readonly delivery_address: string;
        /**
         * Delivery address - postcode
         */
        readonly delivery_postcode: string;
        /**
         * Delivery address - city
         */
        readonly delivery_city: string;
        /**
         * Delivery address - state/province
         */
        readonly delivery_state: string;
        /**
         * Delivery address - country
         */
        readonly delivery_country: string;
        /**
         * Delivery address - country code (two-letter, e.g. EN)
         */
        readonly delivery_country_code: CountryCode;
        /**
         * Value of the "additional field 1" - the seller can store any information here
         */
        readonly extra_field_1: string;
        /**
         * Value of the "additional field 2" - the seller can store any information here
         */
        readonly extra_field_2: string;
        /**
         * Object containing order custom extra fields, where key is the extra field ID and value is an extra field content for the given extra field
         * The list of extra fields can be retrieved with the `getOrderReturnExtraFields` method
         *
         * In case of a file  the following format is expected:
         * @example
         *
         * {
         *  "title": "file.pdf" // Max characters of 40
         *  "file": "data:4AAQSkZJRgABA[...]" // Base64 encoded binary with limit of 2MB
         * }
         */
        readonly custom_extra_fields: Record<string, string>;
        /**
         * Seller comments
         * Maximum length is 200 characters
         */
        readonly admin_comments: string;
        /**
         * Courier name (if the shipment was created)
         */
        readonly delivery_package_module: string;
        /**
         * Shipping number (if the shipment was created)
         */
        readonly delivery_package_nr: string;
        /**
         * Array of order return products
         */
        readonly products: Array<{
          /**
           * Type of magazine from which the product comes
           *  "db" - BaseLinker internal catalog
           *  "shop" - online store magazine
           *  "warehouse" - connected wholesaler
           */
          readonly storage: StorageType;
          /**
           * Magazine ID from which the product comes
           * It has a value `0` if the product comes from the BaseLinker internal catalog
           */
          readonly storage_id: number;
          /**
           * Order return product ID from BaseLinker order manager
           */
          readonly order_return_product_id: number;
          /**
           * Product ID in BaseLinker or shop storage
           * Blank if the product ID is not known
           */
          readonly product_id: number;
          /**
           * Product variant ID
           * Blank if the product variant ID is not known
           */
          readonly variant_id: number;
          /**
           * Product name
           */
          readonly name: string;
          /**
           * Product SKU number
           */
          readonly sku: string;
          /**
           * Product EAN number
           */
          readonly ean: string;
          /**
           * Product location
           */
          readonly location: string;
          /**
           * Product source warehouse ID
           * Applies only to products from BaseLinker internal catalog
           */
          readonly warehouse_id: number;
          /**
           * Specific product attributes
           */
          readonly attributes: string;
          /**
           * Single product gross price
           */
          readonly price_brutto: number;
          /**
           * Product VAT tax rate e.g. 23
           * Value should be between 0 and 100 or:
           *  - -1 for EXPT/ZW exempt from VAT
           *  - -0.02 for NP annotation
           *  - -0.03 for OO VAT reverse charge
           */
          readonly tax_rate: number;
          /**
           * Product quantity
           */
          readonly quantity: number;
          /**
           * Single product weight
           */
          readonly weight: number;
          /**
           * ID of the bundle that was split to aquire this order product
           * Applies only to bundles from BaseLinker inventory
           * Returns `0` if the product was not aquired from splitting a bundle
           */
          readonly bundle_id: number;
          /**
           * Return item status ID
           */
          readonly status_id: number;
          /**
           * Return reason ID
           */
          readonly return_reason_id: number;
        }>;
        /**
         * Bank account number to issue a refund
         */
        readonly order_return_account_number: string;
        /**
         * IBAN of the bank account
         */
        readonly order_return_iban: string;
        /**
         * SWIFT of the bank account
         */
        readonly order_return_swift: string;
        /**
         * Return fulfillment status
         * Possible values:
         *  - 0 - Active
         *  - 1 - Done
         *  - 2 - Cancelled
         *  - 5 - Accepted
         */
        readonly fulfillment_status: OrderReturnFulfillmentStatus;
      }>;
    };
  };

  getOrderReturnStatusList: {
    params: void;
    response: {
      /**
       * Array of order return statuses
       */
      readonly statuses: Array<{
        /**
         * Order return status ID
         */
        readonly id: number;
        /**
         * Order return status name
         */
        readonly name: string;
        /**
         * Long status name (displayed to the customer on the order return page)
         */
        readonly name_for_customer: string;
        /**
         * Order return status color in HEX format
         */
        readonly color?: string;
      }>;
    };
  };

  getOrderReturnPaymentsHistory: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * Flag indicating whether to include full history
       * False by default - only retrieves entries containing an external payment ID
       */
      show_full_history?: boolean;
    };
    response: {
      /**
       * Array of payment history entries
       */
      readonly payments: Array<{
        /**
         * Total amount paid before the given change
         */
        readonly paid_before: number;
        /**
         * Total amount paid after the given change
         */
        readonly paid_after: number;
        /**
         * Total order price
         */
        readonly total_price: number;
        /**
         * 3-letter currency symbol (e.g. EUR, PLN, USD)
         */
        readonly currency: CurrencyCode;
        /**
         * External payment ID
         */
        readonly external_payment_id: string;
        /**
         * Date of change record
         * Unix timestamp
         */
        readonly date: number;
      }>;
    };
  };

  /**
   * The method allows you to edit selected fields of a specific order return
   */
  setOrderReturnFields: {
    params: {
      /**
       * Order return ID
       */
      return_id: number;
      /**
       * Seller comments
       * Maximum length is 200 characters
       */
      admin_comments?: string;
      /**
       * Buyer email address
       */
      email?: string;
      /**
       * Buyer phone number
       */
      phone?: string;
      /**
       * Buyer login
       */
      user_login?: string;
      /**
       * Gross delivery price
       */
      delivery_price?: number;
      /**
       * Delivery address - name and surname
       */
      delivery_fullname?: string;
      /**
       * Delivery address - company
       */
      delivery_company?: string;
      /**
       * Delivery address - street and number
       */
      delivery_address?: string;
      /**
       * Delivery address - postcode
       */
      delivery_postcode?: string;
      /**
       * Delivery address - city
       */
      delivery_city?: string;
      /**
       * Delivery address - state/province
       */
      delivery_state?: string;
      /**
       * Delivery address - country code (two-letter, e.g. EN)
       */
      delivery_country_code?: string;
      /**
       * Value of the "additional field 1" - the seller can store any information here
       */
      extra_field_1?: string;
      /**
       * Value of the "additional field 2" - the seller can store any information here
       */
      extra_field_2?: string;
      /**
       * Object containing order custom extra fields, where key is the extra field ID and value is an extra field content for the given extra field
       * The list of extra fields can be retrieved with the `getOrderReturnExtraFields` method
       *
       * In case of removing a field, pass an empty string for a given extra field ID
       * In case of a file  the following format is expected:
       * @example
       *
       * {
       *  "title": "file.pdf" // Max characters of 40
       *  "file": "data:4AAQSkZJRgABA[...]" // Base64 encoded binary with limit of 2MB
       * }
       */
      custom_extra_fields?: Record<string, string>;
    };
    response: object;
  };

  addOrderReturnProduct: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * Type of magazine from which the product comes
       *  "db" - BaseLinker internal catalog
       *  "shop" - online store magazine
       *  "warehouse" - connected wholesaler
       */
      storage: StorageType;
      /**
       * Magazine ID from which the product comes
       */
      storage_id: number;
      /**
       * Product ID in BaseLinker or store magazine
       * Blank if the product ID is not known
       */
      product_id: number;
      /**
       * Product variant ID
       * Blank if the product variant ID is not known
       */
      variant_id: number;
      /**
       * Auction ID (if the order comes from eBay/Allegro)
       */
      auction_id?: string;
      /**
       * Product name
       */
      name: string;
      /**
       * Product SKU number
       */
      sku: string;
      /**
       * Product EAN number
       */
      ean: string;
      /**
       * Product location
       */
      location: string;
      /**
       * Product source warehouse ID
       * Applies only to products from BaseLinker internal catalog
       * By default, `warehouse_id` is determined based on the source of the order
       */
      warehouse_id: number;
      /**
       * Specific product attributes
       */
      attributes: string;
      /**
       * Single product gross price
       */
      price_brutto: number;
      /**
       * Product VAT tax rate e.g. 23
       * Value should be between 0 and 100 or:
       *  - -1 for EXPT/ZW exempt from VAT
       *  - -0.02 for NP annotation
       *  - -0.03 for OO VAT reverse charge
       */
      tax_rate: number;
      /**
       * Product quantity
       */
      quantity: number;
      /**
       * Single product weight
       */
      weight: number;
      /**
       * Return item status ID
       * List of available return statuses can be retrieved using the `getOrderReturnProductStatuses` method
       */
      status_id: number;
      /**
       * Return reason ID
       * List of available return reasons can be retrieved using the `getOrderReturnReasons` method
       */
      return_reason_id: number;
    };
    response: {
      /**
       * Added order return product ID
       */
      readonly order_return_product_id: number;
    };
  };

  /**
   * The method allows you to edit the fiels of selected order return product
   */
  setOrderReturnProductFields: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * Order return product ID from BaseLinker order manager
       */
      order_return_product_id: number;
      /**
       * Type of magazine from which the product comes
       *  "db" - BaseLinker internal catalog
       *  "shop" - online store magazine
       *  "warehouse" - connected wholesaler
       */
      storage?: StorageType;
      /**
       * Magazine ID from which the product comes
       */
      storage_id?: number;
      /**
       * Product ID in BaseLinker or store magazine
       * Blank if the product ID is not known
       */
      product_id?: number;
      /**
       * Product variant ID
       * Blank if the product variant ID is not known
       */
      variant_id?: number;
      /**
       * Auction ID (if the order comes from eBay/Allegro)
       */
      auction_id?: string;
      /**
       * Product name
       */
      name?: string;
      /**
       * Product SKU number
       */
      sku?: string;
      /**
       * Product EAN number
       */
      ean?: string;
      /**
       * Product location
       */
      location?: string;
      /**
       * Product source warehouse ID
       * Applies only to products from BaseLinker internal catalog
       * By default, `warehouse_id` is determined based on the source of the order
       */
      warehouse_id?: number;
      /**
       * Specific product attributes
       */
      attributes?: string;
      /**
       * Single product gross price
       */
      price_brutto?: number;
      /**
       * Product VAT tax rate e.g. 23
       * Value should be between 0 and 100 or:
       *  - -1 for EXPT/ZW exempt from VAT
       *  - -0.02 for NP annotation
       *  - -0.03 for OO VAT reverse charge
       */
      tax_rate?: number;
      /**
       * Product quantity
       */
      quantity?: number;
      /**
       * Single product weight
       */
      weight?: number;
      /**
       * Return item status ID
       * List of available return statuses can be retrieved using the `getOrderReturnProductStatuses` method
       */
      status_id?: number;
    };
    response: object;
  };

  /**
   * The method allows you to remove a product from an order return
   */
  deleteOrderReturnProduct: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * Order return product ID from BaseLinker order manager
       */
      order_return_product_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to mark an order return as refunded
   * Note this method does not issue an actual money refund
   */
  setOrderReturnRefund: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * The amount of the refund
       * Value changes the current refund in the order return (not added to the previous value)
       * If the amount matches the order return value, the order return will be marked as refunded
       */
      order_refund_done: number;
      /**
       * Date of the refund
       * Unix timestamp format
       */
      refund_date: number;
      /**
       * Additional comment for the refund
       * Maximum length is 50 characters
       */
      refund_comment: string;
      /**
       * External refund ID
       */
      external_refund_id?: string;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve a list of order return reasons
   * Values of those fields can be set using the `setOrderReturnFields` method
   */
  getOrderReturnReasonsList: {
    params: void;
    response: {
      /**
       * Array of order return reasons
       */
      readonly return_reasons: Array<{
        /**
         * Return reason ID
         */
        readonly return_reason_id: number;
        /**
         * Order return reason name
         */
        readonly name: string;
      }>;
    };
  };

  /**
   * The method allows you to change order return status
   */
  setOrderReturnStatus: {
    params: {
      /**
       * Order return ID
       */
      return_id: number;
      /**
       * Order return status ID
       * List of available order return statuses can be retrieved using the `getOrderReturnStatusList` method
       */
      status_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to change multiple order return statuses at once
   */
  setOrderReturnStatuses: {
    params: {
      /**
       * Array of order return IDs
       */
      return_ids: Array<number>;
      /**
       * Order return status ID
       * List of available order return statuses can be retrieved using the `getOrderReturnStatusList` method
       */
      status_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to run personal trigger for order returns automatic actions
   */
  runOrderReturnMacroTrigger: {
    params: {
      /**
       * Order return ID from BaseLinker order manager
       */
      return_id: number;
      /**
       * Trigger ID
       */
      trigger_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve a list of order return product statuses
   * Values of those fields can be set using the `setOrderReturnFields` method
   */
  getOrderReturnProductStatuses: {
    params: void;
    response: {
      /**
       * Array of order return product statuses
       */
      readonly order_return_product_statuses: Array<{
        /**
         * Order return product status ID
         */
        readonly status_id: number;
        /**
         * Order return product status name
         */
        readonly name: string;
      }>;
    };
  };
};
