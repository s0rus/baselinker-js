import type {
  CountryCode,
  CurrencyCode,
  FieldType,
  Flag,
  InvoiceVatRate,
  OrderLogType,
  OrderPickPackActionType,
  OrderSource,
  StorageType,
} from "../external/index.js";

export type OrdersCategory = {
  /**
   * The method allows you to retrieve a list of order events from the last 3 days
   */
  getJournalList: {
    params: {
      /**
       * Log ID number from which the logs are to be retrieved
       */
      last_log_id: number;
      // TODO: Better logs_types type
      /**
       * Array of log types to be retrieved
       *
       * Types of logs:
       *  1 - Order creation
       *  2 - DOF download (order confirmation)
       *  3 - Payment of the order
       *  4 - Removal of order/invoice/receipt
       *  5 - Merging the orders
       *  6 - Splitting the order
       *  7 - Issuing an invoice
       *  8 - Issuing a receipt
       *  9 - Package creation
       *  10 - Deleting a package
       *  11 - Editing delivery data
       *  12 - Adding a product to an order
       *  13 - Editing the product in the order
       *  14 - Removing the product form the order
       *  15 - Adding a buyer to a blacklist
       *  16 - Editing order data
       *  17 - Copying an order
       *  18 - Order status change
       *  19 - Invoice deletion
       *  20 - Receipt deletion
       *  21 - Editing invoice data
       */
      logs_types: Array<OrderLogType>;
      // TODO: Validate if it is necessary to pass the order_id
      /**
       * Order ID
       */
      order_id?: number;
    };
    response: {
      readonly logs: Array<{
        /**
         * Event ID
         */
        readonly id: number;
        /**
         * Order ID
         */
        readonly order_id: number;
        /**
         * Event type
         *
         * Types of events:
         *  1 - Order creation
         *  2 - DOF download (order confirmation)
         *  3 - Payment of the order
         *  4 - Removal of order/invoice/receipt
         *  5 - Merging the orders
         *  6 - Splitting the order
         *  7 - Issuing an invoice
         *  8 - Issuing a receipt
         *  9 - Package creation
         *  10 - Deleting a package
         *  11 - Editing delivery data
         *  12 - Adding a product to an order
         *  13 - Editing the product in the order
         *  14 - Removing the product form the order
         *  15 - Adding a buyer to a blacklist
         *  16 - Editing order data
         *  17 - Copying an order
         *  18 - Order status change
         *  19 - Invoice deletion
         *  20 - Receipt deletion
         *  21 - Editing invoice data
         */
        readonly log_type: OrderLogType;
        // TODO: Better object_id type (?)
        /**
         * Additional information about the event based on the event type
         *
         * Additional information by event type:
         *  5 - ID of the merged order
         *  6 - ID of the new order created by the order separation
         *  7 - Invoice ID
         *  9 - Created parcel ID
         *  10 - Deleted parcel ID
         *  14 - Deleted product ID
         *  17 - Created order ID
         *  18 - Order status ID
         */
        readonly object_id?: number;
        /**
         * Event date
         * Unix timestamp
         */
        readonly date: number;
      }>;
    };
  };

  /**
   * The method allows you to add an order to the BaseLinker oder manager
   *
   * To edit an order, use the `setOrderFields` method
   */
  addOrder: {
    params: {
      /**
       * Order status ID
       * List of available order statuses can be retrieved using the `getOrderStatusList` method
       */
      order_status_id: number;
      /**
       * Custom order source ID
       * The custom order source ID can be defined in the BaseLinker panel
       * If not provided, default order source is assigned
       */
      custom_source_id?: number;
      /**
       *  Date of the order creation
       *  Unix timestamp format
       */
      date_add: number;
      /**
       * 3-letter currency symbol e.g. PLN, EUR, USD
       */
      currency: CurrencyCode;
      /**
       * Payment method
       * This string will be visible in the BaseLinker order panel
       */
      payment_method: string;
      /**
       * Flag indicating whether the payment method is "Cash On Delivery"
       */
      payment_method_cod: Flag;
      /**
       * Flag indicating whether the order is paid or not
       */
      paid: Flag;
      /**
       * Additional comments from the user
       * Maximum length is 510 characters
       */
      user_comments: string;
      /**
       * Additional comments from the administrator
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
       * eBay or Allegro user login
       * Leave this field empty if you are using another solution
       */
      user_login: string;
      /**
       * Delivery method name
       * This string will be visible in the BaseLinker order panel
       */
      delivery_method: string;
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
       * Delivery address - street and number
       */
      delivery_address: string;
      /**
       * Delivery address - postcode
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
       * Delivery address - country code (two-letter, e.g. EN)
       */
      delivery_country_code: CountryCode;
      /**
       * Pick-up point delivery - pick-up point ID
       */
      delivery_point_id: string;
      /**
       * Pick-up point delivery - pick-up point name
       */
      delivery_point_name: string;
      /**
       * Pick-up point delivery - pick-up point address
       */
      delivery_point_address: string;
      /**
       * Pick-up point delivery - pick-up point postcode
       */
      delivery_point_postcode: string;
      /**
       * Pick-up point delivery - pick-up point city
       */
      delivery_point_city: string;
      /**
       * Billing details - name and surname
       */
      invoice_fullname: string;
      /**
       * Billing details - company
       */
      invoice_company: string;
      /**
       * Billing details - NIP
       */
      invoice_nip: string;
      /**
       * Billing details - street and number
       */
      invoice_address: string;
      /**
       * Billing details - postcode
       */
      invoice_postcode: string;
      /**
       * Billing details - city
       */
      invoice_city: string;
      /**
       * Billing details - state/province
       */
      invoice_state: string;
      /**
       * Billing details - country code (two-letter, e.g. EN)
       */
      invoice_country_code: CountryCode;
      /**
       * Flag indicating whether invoice is wanted
       *  "1" - Yes
       *  "0" - No
       */
      want_invoice: Flag;
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
       * The list of extra fields can be retrieved with the `getOrderExtraFields` method
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
       * Array of products for the order
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
         * Leave empty if the product ID is not known
         */
        product_id: number;
        /**
         * Product variant ID
         * Leave empty if the product variant ID is not known
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
         * To assign multiple locations, separate them with a comma
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
      }>;
    };
    response: {
      /**
       * Added order ID
       */
      readonly order_id: number;
    };
  };

  // TODO: Better order source types (?)
  /**
   * The method allows you to retrieve a list of available order sources along with their IDs
   *
   * Order sources are grouped by their type that corresponds to a field `order_source` from `getOrders` method
   * Available sources are:
   *  - "personal"
   *  - "shop"
   *  - "marketplace_code" - e.g. "ebay", "amazon", "ceneo", "emag", "allegro", etc.
   */
  getOrderSources: {
    params: void;
    response: {
      // TODO: OrderSource should be nullable (?)
      /**
       * Object containing order sources, where key is the source type and value is a record where key is the source ID and value is the source name
       */
      readonly sources: Record<OrderSource, Record<string, string>>;
    };
  };

  /**
   * The method allows you to retrieve extra fields defined for the orders
   * Values of those fields can be set uing the `setOrderFields` method
   *
   * In order to retrieve values of those fields, `include_custom_extra_fields` flag has to be set to `true` in the `getOrders` method
   */
  getOrderExtraFields: {
    params: void;
    response: {
      // TODO: Is it an array or an object??? docs suck.
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
   * The method allows you to retrieve orders from the BaseLinker order manager
   *
   * Maximum 100 orders can be retrieved at a time
   */
  getOrders: {
    params?: {
      /**
       * Order ID
       * When provided, only the order with the given ID is retrieved
       */
      order_id?: number;
      /**
       * Date of confirmation from which to retrieve orders
       * Unix timestamp format
       */
      date_confirmed_from?: number;
      /**
       * Date from which to retrieve orders
       * Unix timestamp format
       */
      date_from?: number;
      /**
       * Order ID from which to retrieve orders
       */
      id_from?: number;
      /**
       * Flag indicating whether to retrieve unconfirmed orders
       * It is `false` by default
       * Unconfirmed orders may not be complete yet, shipping method and price is also unknown
       */
      get_unconfirmed_orders?: boolean;
      /**
       * Flag indicating whether to include custom extra fields in the response
       */
      include_custom_extra_fields?: boolean;
      /**
       * Order status ID from which to retrieve orders
       * Leave blank to retrieve orders from all statuses
       */
      status_id?: number;
      /**
       * Filter order list by email address
       */
      filter_email?: string;
      /**
       * Filter order list by order source
       * The list of order sources can be retrieved using the `getOrderSources` method
       */
      filter_order_source?: string;
      /**
       * Filter order list by order source ID
       * Filtering by order source ID requires `filter_order_source` to be set prior
       * The list of order source IDs can be retrieved using the `getOrderSources` method
       */
      filter_order_source_id?: number;
    };
    response: {
      /**
       * Array of orders
       */
      readonly orders: Array<{
        /**
         * Order ID from BaseLinker order manager
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
         * Order source type
         * Available values are:
         *  - "shop"
         *  - "personal"
         *  - "order_return"
         *  - "marketplace_code" - e.g. "ebay", "amazon", "ceneo", "emag", "allegro", etc.
         */
        readonly order_source: OrderSource;
        /**
         * Order source ID
         */
        readonly order_source_id: number;
        /**
         * Order source description
         */
        readonly order_source_info: string;
        /**
         * Order status ID
         * List of available order statuses can be retrieved using the `getOrderStatusList` method
         */
        readonly order_status_id: number;
        /**
         *  Date of the order creation
         *  Unix timestamp format
         */
        readonly date_add: number;
        /**
         * Date of the order confirmation (if the order is confirmed)
         * Unix timestamp format
         */
        readonly date_confirmed: number;
        /**
         * Date from which the order is in the current order status
         * Unix timestamp format
         */
        readonly date_in_status: number;
        /**
         * Flag indicating whether the order is confirmed
         */
        readonly confirmed: boolean;
        /**
         * 3-letter currency symbol e.g. PLN, EUR, USD
         */
        readonly currency: CurrencyCode;
        /**
         * eBay or Allegro user login
         * Leave this field empty if you are using another solution
         */
        readonly user_login: string;
        /**
         * Payment method
         * This string will be visible in the BaseLinker order panel
         */
        readonly payment_method: string;
        /**
         * Flag indicating whether the payment method is "Cash On Delivery"
         */
        readonly payment_method_cod: Flag;
        /**
         * Amount of money paid
         */
        readonly payment_done: number;
        /**
         * Additional comments from the user
         * Maximum length is 510 characters
         */
        readonly user_comments: string;
        /**
         * Additional comments from the administrator
         * Maximum length is 200 characters
         */
        readonly admin_comments: string;
        /**
         * Buyer email address
         */
        readonly email: string;
        /**
         * Buyer phone number
         */
        readonly phone: string;
        /**
         * Delivery method name
         * This string will be visible in the BaseLinker order panel
         */
        readonly delivery_method: string;
        /**
         * Gross delivery price
         */
        readonly delivery_price: number;
        /**
         * Courier name (if the shipment was created)
         */
        readonly delivery_package_module: string;
        /**
         * Shipping number (if the shipment was created)
         */
        readonly delivery_package_nr: string;
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
         * Delivery address - country name
         */
        readonly delivery_country: string;
        /**
         * Delivery address - country code (two-letter, e.g. EN)
         */
        readonly delivery_country_code: CountryCode;
        /**
         * Pick-up point delivery - pick-up point ID
         */
        readonly delivery_point_id: string;
        /**
         * Pick-up point delivery - pick-up point name
         */
        readonly delivery_point_name: string;
        /**
         * Pick-up point delivery - pick-up point address
         */
        readonly delivery_point_address: string;
        /**
         * Pick-up point delivery - pick-up point postcode
         */
        readonly delivery_point_postcode: string;
        /**
         * Pick-up point delivery - pick-up point city
         */
        readonly delivery_point_city: string;
        /**
         * Billing details - name and surname
         */
        readonly invoice_fullname: string;
        /**
         * Billing details - company
         */
        readonly invoice_company: string;
        /**
         * Billing details - NIP
         */
        readonly invoice_nip: string;
        /**
         * Billing details - street and number
         */
        readonly invoice_address: string;
        /**
         * Billing details - postcode
         */
        readonly invoice_postcode: string;
        /**
         * Billing details - city
         */
        readonly invoice_city: string;
        /**
         * Billing details - state/province
         */
        readonly invoice_state: string;
        /**
         * Billing details - country name
         */
        readonly invoice_country: string;
        /**
         * Billing details - country code (two-letter, e.g. EN)
         */
        readonly invoice_country_code: CountryCode;
        /**
         * Flag indicating whether invoice is wanted
         *  "1" - Yes
         *  "0" - No
         */
        readonly want_invoice: Flag;
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
         * These extra fields are retrieven only when the `include_custom_extra_fields` flag is set to `true` in the `getOrders` method
         * The list of extra fields can be retrieved with the `getOrderExtraFields` method
         *
         * In case of a file  the following format is expected:
         * @example
         *
         * {
         *  "title": "file.pdf" // Max characters of 40
         *  "file": "data:4AAQSkZJRgABA[...]" // Base64 encoded binary with limit of 2MB
         * }
         */
        readonly custom_extra_fields?: Record<string, string>;
        /**
         * Order information page URL
         */
        readonly order_page: string;
        /**
         * Flag indicating wether the order products are collected
         *  1 - all products are collected
         *  0 - not all products are collected
         */
        readonly pick_state: Flag;
        /**
         * Flag indicating wether the order products are packed
         *  1 - all products are packed
         *  0 - not all products are packed
         */
        readonly pack_state: Flag;
        /**
         * Array of products for the order
         */
        readonly products: Array<{
          /**
           * Type of magazin from which the product comes
           *  "db" - BaseLinker internal catalog
           *  "shop" - online store magazine
           *  "warehouse" - connected wholesaler
           */
          readonly storage: StorageType;
          /**
           * Magazine ID from which the product comes
           */
          readonly storage_id: number;
          /**
           * Order product ID from BaseLinker order manager
           */
          readonly order_product_id: number;
          /**
           * Product ID in BaseLinker or store magazine
           * Field is empty if the product ID is not known
           */
          readonly product_id: number;
          /**
           * Product variant ID
           * Field is empty if the product variant ID is not known
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
           * To assign multiple locations, separate them with a comma
           */
          readonly location: string;
          /**
           * Product source warehouse ID
           * Applies only to products from BaseLinker internal catalog
           * By default, `warehouse_id` is determined based on the source of the order
           */
          readonly warehouse_id: number;
          /**
           * Listing ID number (if the order comes from eBay/Allegro)
           */
          readonly auction_id?: string;
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
        }>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve transaction details for a selected order
   */
  getOrderTransactionData: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
    };
    response: {
      /**
       * ONLY FOR AMAZON ORDERS
       * Array of information about the Amazon fulfillment shipments found
       */
      readonly fulfillment_shipments?: Array<{
        /**
         * Product SKU number
         */
        readonly product_sku: string;
        /**
         * Product name
         */
        readonly product_name: string;
        /**
         * Product quantity
         */
        readonly quantity: number;
        /**
         * Amazon storage ID
         */
        readonly fba: string;
      }>;
      /**
       * Ship date from
       * Unix timestamp format
       */
      readonly ship_date_from: number;
      /**
       * Ship date to
       * Unix timestamp format
       */
      readonly ship_date_to: number;
      /**
       * Delivery date from
       * Unix timestamp format
       */
      readonly delivery_date_from: number;
      /**
       * Delivery date to
       * Unix timestamp format
       */
      readonly delivery_date_to: number;
    };
  };

  /**
   * The method allows you to retrieve orders related to the given email address
   * This method is designed to be used in plugins for mail clients (Thunderbird, Outlook, etc.)
   */
  getOrdersByEmail: {
    params: {
      /**
       * Email address to search for
       */
      email: string;
    };
    response: {
      /**
       * Array of orders related to the given email address
       */
      readonly orders: Array<{
        /**
         * Order ID from BaseLinker order manager
         */
        readonly order_id: number;
        /**
         * Order status ID
         * List of available order statuses can be retrieved using the `getOrderStatusList` method
         */
        readonly order_status_id: number;
        /**
         * Date from which the order is in the current order status
         * Unix timestamp format
         */
        readonly date_in_status: number;
        /**
         * Date of the order creation
         * Unix timestamp format
         */
        readonly date_add: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve orders related to the given phone number
   * This method is intended for use in caller recognition programs
   */
  getOrdersByPhone: {
    params: {
      /**
       * Phone number to search for
       */
      phone: string;
    };
    response: {
      /**
       * Array of orders related to the given phone number
       */
      readonly orders: Array<{
        /**
         * Order ID from BaseLinker order manager
         */
        readonly order_id: number;
        /**
         * Order status ID
         * List of available order statuses can be retrieved using the `getOrderStatusList` method
         */
        readonly order_status_id: number;
        /**
         * Delivery address - name and surname
         */
        readonly delivery_fullname: string;
        /**
         * Delivery address - company
         */
        readonly delivery_company: string;
        /**
         * Date from which the order is in the current order status
         * Unix timestamp format
         */
        readonly date_in_status: number;
        /**
         * Date of the order creation
         * Unix timestamp format
         */
        readonly date_add: number;
      }>;
    };
  };

  /**
   * The method allows you to issue an order invoice
   */
  addInvoice: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Series numbering ID
       */
      series_id: number;
      /**
       * VAT rate
       * The following values are allowed:
       *  - "DEFAULT" - according to the numbering series (is the default value)
       *  - "ITEM" - use the rate assigned to the item of the order
       *  - "EXPT" / "ZW" - exempt from VAT
       *  - "NP" - annotation NP
       *  - "OO" - VAT reverse charge
       *  - number from 0 to 100
       */
      vat_rate?: InvoiceVatRate;
    };
    response: {
      /**
       * Added invoice ID
       */
      readonly invoice_id: number;
    };
  };

  /**
   * The method allows you to retrieve invoices issued from the BaseLinker order manager
   *
   * Maximum of 100 invoces can be retrieved at a time
   */
  getInvoices: {
    params?: {
      /**
       * Filter by invoice ID
       */
      invoice_id?: number;
      /**
       * Filter by order ID
       */
      order_id?: number;
      /**
       * Filter by date from
       * Unix timestamp
       */
      date_from?: number;
      /**
       * Filter by ID from which subsequent incoies are to be retrieved
       */
      id_from?: number;
      /**
       * Filter by series ID
       */
      series_id?: number;
      /**
       * Flag indicating whether external invoices should be retrieved
       * If set to `false`, invoices that already have an external invoice file uploaded using the `addOrderInvoiceFile` method will be omitted
       *
       * Useful for ERP integrations uploading files to BaseLinker
       */
      get_external_invoices?: boolean;
    };
    response: {
      /**
       * Array of invoices
       */
      readonly invoices: Array<{
        /**
         * Invoice ID
         */
        readonly invoice_id: number;
        /**
         * Order ID for which the invoice was issued
         */
        readonly order_id: number;
        /**
         * Invoice numbering series ID
         */
        readonly series_id: number;
        /**
         * Type of invoice
         * Possible values:
         *  - "normal" - regular invoice
         *  - "correcting" - correcting invoice
         */
        readonly type: "normal" | "correcting";
        /**
         * Full invoice number
         *
         * Format depends on account settings (Usually [no]/[month]/[year])
         */
        readonly number: string;
        /**
         * Monthly/yearly number - invoice number element
         */
        readonly sub_id: number;
        /**
         * Month - element of invoice number (0 if annual numbering is used)
         */
        readonly month: number;
        /**
         * Year - element of invoice number
         */
        readonly year: number;
        /**
         * Suffix - element of invoice number
         */
        readonly postfix: string;
        /**
         * Invoice creation date
         * Unix timestamp
         */
        readonly date_add: number;
        /**
         * Sale date
         * Unix timestamp
         */
        readonly date_sell: number;
        /**
         * Due date
         * Unix timestamp
         *
         * Not completed by default - signified by value `0`
         */
        readonly date_pay_to: number;
        /**
         * 3-letter currency symbol (e.g. EUR, PLN, USD)
         */
        readonly currency: CurrencyCode;
        /**
         * Total gross invoice value
         */
        readonly total_price_brutto: number;
        /**
         * Total net invoice value
         */
        readonly total_price_netto: number;
        /**
         * Payment method name
         */
        readonly payment: string;
        /**
         * Additional information/invoice remarks
         */
        readonly additional_info: string;
        /**
         * Billing details - name and surname
         */
        readonly invoice_fullname: string;
        /**
         * Billing details - company
         */
        readonly invoice_company: string;
        /**
         * Billing details - VAT Reg. no./tax number
         */
        readonly invoice_nip: string;
        /**
         * Billing details - street and number
         */
        readonly invoice_address: string;
        /**
         * Billing details - postcode */
        readonly invoice_postcode: string;
        /**
         * Billing details - city
         */
        readonly invoice_city: string;
        /**
         * Billing details - country
         */
        readonly invoice_country: string;
        /**
         * Billing details - country code (two-letter, e.g. EN)
         */
        readonly invoice_country_code: CountryCode;
        /**
         * Full seller data
         */
        readonly seller: string;
        /**
         * Full issuer data
         */
        readonly issuer: string;
        /**
         * ID of the corrected invoice
         * Applies only to correcting invoices
         */
        readonly correcting_to_invoice_id: number;
        /**
         * Correction reason
         * Applies only to correcting invoices
         */
        readonly correcting_reason: string;
        /**
         * Flag indicating whether the invoice items are corrected
         * Applies only to correcting invoices
         */
        readonly correcting_items: boolean;
        /**
         * Flag indicating whether the buyer data is corrected
         * Applies only to correcting invoices
         */
        readonly correcting_data: boolean;
        /**
         * External system invoice number
         */
        readonly external_invoice_number: string;
        /**
         * Target currency into which the invoice value was additionally converted
         * Applies only to converted invoices
         */
        readonly exchange_currency: CurrencyCode;
        /**
         * Exchange rate (conversion from field `currency` to field `exchange_currency`)
         * Applies only to converted invoices
         */
        readonly exchange_rate: number;
        /**
         * Date of the exchange rate
         * Applies only to converted invoices
         */
        readonly exchange_date: string;
        /**
         * Information on the exchange rate source (NBP table number)
         * Applies only to converted invoices
         */
        readonly exchange_info: string;
        /**
         * Invoice ID used in a remote accounting system
         */
        readonly external_id: number;
        /**
         * Array of invoice items
         */
        readonly items: Array<{
          /**
           * Item name
           */
          readonly name: string;
          /**
           * Item SKU number
           */
          readonly sku: string;
          /**
           * Item EAN number
           */
          readonly ean: string;
          /**
           * Single item gross price
           */
          readonly price_brutto: number;
          /**
           * Single item net price
           */
          readonly price_netto: number;
          /**
           * Item VAT tax rate e.g. 23
           * Value should be between 0 and 100 or:
           *  - -1 for EXPT/ZW exempt from VAT
           *  - -0.02 for NP annotation
           *  - -0.03 for OO VAT reverse charge
           */
          readonly tax_rate: number;
          /**
           * Item quantity
           */
          readonly quantity: number;
          /**
           * Flag indicating whether the item is a shipment (`0` - no, `1` - yes)
           */
          readonly is_shipment: Flag;
          /**
           * ID of order item from BaseLinker order manager
           */
          readonly order_product_id: number;
        }>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a series of invoice/receipt numbering
   */
  getSeries: {
    params: void;
    response: {
      /**
       * Array of numbering series information
       */
      readonly series: Array<{
        /**
         * Series numbering ID
         */
        readonly id: number;
        /**
         * Numbering type
         */
        readonly type: "INVOICE" | "CORRECTION" | "RECEIPT";
        /**
         * Numbering name
         */
        readonly name: string;
        /**
         * Numbering format
         */
        readonly format: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve order statuses createdy in the BaseLinker order manager
   */
  getOrderStatusList: {
    params: void;
    response: {
      /**
       * Array of order statuses
       */
      readonly statuses: Array<{
        /**
         * Order status ID
         */
        readonly id: number;
        /**
         * Order status name
         */
        readonly name: string;
        /**
         * Long status name (displayed to the customer on the order page)
         */
        readonly name_for_customer: string;
        /**
         * Order status color in HEX format
         */
        readonly color?: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve the payment history for a selected order, including an external payment ID from the payment gateway
   * One order can have multiple payment history entries, caused by subchargesm order value changes, manual payment editing
   */
  getOrderPaymentsHistory: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
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
        /**
         * Comment added when setting the payment for this order
         */
        readonly comment: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve pick pack history for a selected order
   */
  getOrderPickPackHistory: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Event type to retrieve
       * Possible values:
       *  - 1 - Reservation of an order for products collecting
       *  - 2 - Picking products started
       *  - 3 - Picking products cancelled
       *  - 4 - Products picking status changed: in progess
       *  - 5 - Products picking status changed: finished
       *  - 6 - Products picking status changed: error
       *  - 7 - Reservation of an order for products packing
       *  - 8 - Packing products started
       *  - 9 - Packing products cancelled
       *  - 10 - Products packing status changed: in progess
       *  - 11 - Products packing status changed: finished
       *  - 12 - Products packing status changed: error
       *  - 13 - Products photo initialized
       *  - 14 - Products photo taken
       *  - 15 - Products photo deleted
       *  - 16 - Error when trying to save products photo
       *  - 17 - Error when trying to save product image: image size too big
       */
      action_type?: OrderPickPackActionType;
    };
    response: {
      /**
       * Array of pick pack history entries
       */
      readonly history: Array<{
        /**
         * Event type
         * Possible values:
         *  - 1 - Reservation of an order for products collecting
         *  - 2 - Picking products started
         *  - 3 - Picking products cancelled
         *  - 4 - Products picking status changed: in progess
         *  - 5 - Products picking status changed: finished
         *  - 6 - Products picking status changed: error
         *  - 7 - Reservation of an order for products packing
         *  - 8 - Packing products started
         *  - 9 - Packing products cancelled
         *  - 10 - Products packing status changed: in progess
         *  - 11 - Products packing status changed: finished
         *  - 12 - Products packing status changed: error
         *  - 13 - Products photo initialized
         *  - 14 - Products photo taken
         *  - 15 - Products photo deleted
         *  - 16 - Error when trying to save products photo
         *  - 17 - Error when trying to save product image: image size too big
         */
        readonly action_type: OrderPickPackActionType;
        /**
         * Name of the profile performing the change
         */
        readonly profile: string;
        /**
         * Packing station ID
         */
        readonly station_id: number;
        /**
         * Cart ID assigned to the order
         */
        readonly cart_id: number;
        /**
         * Date of the history entry
         * Unix timestamp
         */
        readonly entry_date: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve receipts waiting to be issued
   * This method should be used in creating integration with a fiscal printer
   *
   * The method can be requested for new receipts every e.g. 10 seconds
   * If any receipts appear in response, they should be confirmed using the `setOrderReceipt` method after pringting to disappear from the waiting list
   */
  getNewReceipts: {
    params?: {
      /**
       * Filter by numbering series ID
       *
       * Using multiple series numbering for receipts is recommended when the user has multiple fiscal printeris
       * Each fiscal printer should have a separate series
       */
      series_id?: number;
      /**
       * ID from which subsequent receipts are to be retrieved
       * Default value is `0`
       */
      id_from?: number;
    };
    response: {
      /**
       * Array of information about receipts found
       */
      readonly orders: Array<{
        /**
         * Receipt ID
         */
        readonly receipt_id: number;
        /**
         * Numbering series ID
         */
        readonly series_id: number;
        /**
         * Number assigned by BaseLinker when creating the receipt
         */
        readonly receipt_full_nr: string;
        /**
         * Order ID from BaseLinker order manager
         */
        readonly order_id: number;
        /**
         * Date of order creation
         * Unix timestamp
         */
        readonly date_add: number;
        /**
         * Payment method name
         */
        readonly payment_method: string;
        /**
         * Payer details - VAT Reg No.
         */
        readonly nip: string;
        /**
         * Array of order products
         */
        readonly products: Array<{
          /**
           * Product name
           */
          readonly name: string;
          /**
           * Single product gross price
           */
          readonly price_brutto: number;
          /**
           * VAT tax rate
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
           * Product SKU number
           */
          readonly sku: string;
          /**
           * Product EAN number
           */
          readonly ean: string;
        }>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a single receipt from the BaseLinker order manager
   *
   * To retrieve a list of new receipts, use the `getNewReceipts` method
   */
  getReceipt: {
    params?: {
      /**
       * Receipt ID, not required if `order_id` is provided
       */
      receipt_id?: number;
      /**
       * Order ID, not required if `receipt_id` is provided
       */
      order_id?: number;
    };
    response: {
      /**
       * Receipt ID
       */
      readonly receipt_id: number;
      /**
       * Numbering series ID
       */
      readonly series_id: number;
      /**
       * Number assigned by BaseLinker when creating the receipt
       */
      readonly receipt_full_nr: string;
      /**
       * Year - element of receipt number
       */
      readonly year: number;
      /**
       * Month - element of receipt number (`0` if annual numbering is used)
       */
      readonly month: number;
      /**
       * Monthly/yearly number - receipt number element
       */
      readonly sub_id: number;
      /**
       * Order ID from BaseLinker order manager
       */
      readonly order_id: number;
      /**
       * Date of order creation
       * Unix timestamp
       */
      readonly date_add: number;
      /**
       * Payment method name
       */
      readonly payment_method: string;
      /**
       * Payer details - VAT Reg No.
       */
      readonly nip: string;
      /**
       * 3-letter currency symbol (e.g. EUR, PLN, USD)
       */
      readonly currency: CurrencyCode;
      /**
       * Total gross receipt value
       */
      readonly total_price_brutto: number;
      /**
       * Receipt number from the fiscal cash register or from the external system
       */
      readonly external_receipt_number: string;
      /**
       * Target currency into which the receipt value was additionally converted
       * Applies only to converted receipts
       */
      readonly exchange_currency: CurrencyCode;
      /**
       * Exchange rate (conversion from field `currency` to field `exchange_currency`)
       * Applies only to converted receipts
       */
      readonly exchange_rate: number;
      /**
       * Date of the exchange rate
       * Applies only to converted receipts
       */
      readonly exchange_date: string;
      /**
       * Information on the exchange rate source (NBP table number)
       * Applies only to converted receipts
       */
      readonly exchange_info: string;
      /**
       * Array of receipt items
       */
      readonly items: Array<{
        /**
         * Item name
         */
        readonly name: string;
        /**
         * Item SKU number
         */
        readonly sku: string;
        /**
         * Item EAN number
         */
        readonly ean: string;
        /**
         * Single item gross price
         */
        readonly price_brutto: number;
        /**
         * VAT tax rate
         * Value should be between 0 and 100 or:
         *  - -1 for EXPT/ZW exempt from VAT
         *  - -0.02 for NP annotation
         *  - -0.03 for OO VAT reverse charge
         */
        readonly tax_rate: number;
        /**
         * Item quantity
         */
        readonly quantity: number;
      }>;
    };
  };

  /**
   * The method allows you to edit selected fields (e.g. address data, notes, etc.) of a specific order
   */
  setOrderFields: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Seller comments
       * Maximum length is 200 characters
       */
      admin_comments?: string;
      /**
       * Buyer comments
       * Maximum length is 510 characters
       */
      user_comments?: string;
      /**
       * Payment method
       */
      payment_method?: string;
      /**
       * Flag indicating whether the payment method is "Cash On Delivery"
       */
      payment_method_cod?: Flag;
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
       * Delivery method name
       */
      delivery_method?: string;
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
      delivery_country_code?: CountryCode;
      /**
       * Pick-up point delivery - pick-up point ID
       */
      delivery_point_id?: string;
      /**
       * Pick-up point delivery - pick-up point name
       */
      delivery_point_name?: string;
      /**
       * Pick-up point delivery - pick-up point address
       */
      delivery_point_address?: string;
      /**
       * Pick-up point delivery - pick-up point postcode
       */
      delivery_point_postcode?: string;
      /**
       * Pick-up point delivery - pick-up point city
       */
      delivery_point_city?: string;
      /**
       * Billing details - name and surname
       */
      invoice_fullname?: string;
      /**
       * Billing details - company
       */
      invoice_company?: string;
      /**
       * Billing details - NIP
       */
      invoice_nip?: string;
      /**
       * Billing details - street and number
       */
      invoice_address?: string;
      /**
       * Billing details - postcode
       */
      invoice_postcode?: string;
      /**
       * Billing details - city
       */
      invoice_city?: string;
      /**
       * Billing details - state/province
       */
      invoice_state?: string;
      /**
       * Billing details - country code (two-letter, e.g. EN)
       */
      invoice_country_code?: CountryCode;
      /**
       * Flag indicating whether invoice is wanted
       */
      want_invoice?: Flag;
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
       * The list of extra fields can be retrieved with the `getOrderExtraFields` method
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
      /**
       * Flag indicating wether the order products are collected (1 - all products are collected, 0 - not all products are collected)
       */
      pick_state?: Flag;
      /**
       * Flag indicating wether the order products are packed (1 - all products are packed, 0 - not all products are packed)
       */
      pack_state?: Flag;
    };
    response: object;
  };

  /**
   * The method allows you to add a product to an order
   */
  addOrderProduct: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
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
       * Leave empty if the product ID is not known
       */
      product_id: number;
      /**
       * Product variant ID
       * Leave empty if the product variant ID is not known
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
       * To assign multiple locations, separate them with a comma
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
    };
    response: {
      /**
       * Added order product ID
       */
      readonly order_product_id: number;
    };
  };

  /**
   * The method allows you to edit the data of selected order product
   */
  setOrderProductFields: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Order product ID from BaseLinker order manager
       */
      order_product_id: number;
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
       * To assign multiple locations, separate them with a comma
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
    };
    response: object;
  };

  /**
   * The method allows you to remove a product from an order
   */
  deleteOrderProduct: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Order product ID from BaseLinker order manager
       */
      order_product_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to add a payment to the order
   */
  setOrderPayment: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * The amount of the payment
       * Value changes the current payment in the order (not added to the previous value)
       * If the amount matches the order value, the order will be marked as paid
       */
      payment_done: number;
      /**
       * Date of the payment
       * Unix timestamp format
       */
      payment_date: number;
      /**
       * Additional comment for the payment
       * Maximum length is 30 characters
       */
      payment_comment: string;
      /**
       * External payment ID
       */
      external_payment_id?: string;
    };
    response: object;
  };

  /**
   * The method allows you to change the status of an order
   */
  setOrderStatus: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Order status ID
       * List of available order statuses can be retrieved using the `getOrderStatusList` method
       */
      status_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to change the status of multiple orders at once
   */
  setOrderStatuses: {
    params: {
      /**
       * Array of order IDs
       */
      order_ids: Array<number>;
      /**
       * Order status ID
       * List of available order statuses can be retrieved using the `getOrderStatusList` method
       */
      status_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to mark orders with a receipt already issued
   */
  setOrderReceipt: {
    params: {
      /**
       * Receipt ID received using the `getNewReceipts` method
       */
      receipt_id: number;
      /**
       * Number of the issued receipt
       * May be blank if the printer does not return the number
       */
      receipt_nr?: string;
      /**
       * Date of receipt printing
       * Unix timestamp format
       */
      date: number;
      /**
       * Flag indicating whether an error occurred during receipt printing
       * `false` by default
       */
      printer_error?: boolean;
      /**
       * Name of the printer
       */
      printer_name?: string;
    };
    response: object;
  };

  /**
   * The method allows you to add an external PDF file to an invoice previously issued from BaseLinker
   * It enables replacing the standard BaseLinker invoice with an invoice issued e.g. in an ERP program
   */
  addOrderInvoiceFile: {
    params: {
      /**
       * Invoice ID from BaseLinker
       */
      invoice_id: number;
      /**
       * Invoice PDF binary format encoded in Base64
       * At the very beginning of the invoice string, provide a prefix "data:"
       *
       * @example
       * "data:4AAQSkSzkJRgABA[...]"
       */
      file: string;
      /**
       * External system invoice number (overwrites BaseLinker invoice number)
       */
      external_invoice_number?: string;
    };
    response: object;
  };

  addOrderReceiptFile: {
    params: {
      /**
       * Receipt ID from BaseLinker
       */
      receipt_id: number;
      /**
       * Receipt PDF binary format encoded in Base64
       * At the very beginning of the receipt string, provide a prefix "data:"
       *
       * @example
       * "data:4AAQSkSzkJRgABA[...]"
       */
      file: string;
      /**
       * External system receipt number (overwrites BaseLinker receipt number)
       */
      external_receipt_number?: string;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve the invoice file from BaseLinker
   */
  getInvoiceFile: {
    params: {
      /**
       * Invoice ID from BaseLinker
       */
      invoice_id: number;
      /**
       * Flag indicating wether to download invoice file from an external accounting system, or an invoice uploaded by API
       * If an additional invoice file does not exist, an invoice in BaseLinker format will be returned
       * Default value is `false`
       */
      get_external?: boolean;
    };
    response: {
      /**
       * Invoice file in binary format enceded in Base64
       * At the very beginning of the invoice string a prefix "data:" is provided
       *
       * @example
       * "data:4AAQSkSzkJRgABA[...]"
       */
      readonly invoice: string;
      /**
       * BaseLinker invoice number (or external accounting system number if `get_external` is set to `true`)
       */
      readonly invoice_number: string;
    };
  };

  /**
   * The method allows you to run personal trigger for orders automatic actions
   */
  runOrderMacroTrigger: {
    params: {
      /**
       * Order ID from BaseLinker order manager
       */
      order_id: number;
      /**
       * Trigger ID
       */
      trigger_id: number;
    };
    response: object;
  };
};
