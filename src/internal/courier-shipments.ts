import type {
  CourierFieldType,
  CourierPackageFieldType,
  CourierPackageType,
  CourierTrackingHistoryStatus,
  CourierTrackingStatus,
  Flag,
} from "../external/index.js";

export type CourierShipmentsCategory = {
  /**
   * The method allows you to create a shimpment in the system of the selected courier
   */
  createPackage: {
    params: {
      /**
       * Order ID
       */
      order_id: number;
      /**
       * Courier code
       */
      courier_code: string;
      /**
       * Courier API account ID for the courier accounts retrieved using the `getCourierAccounts` method
       * If blank, first account is used
       */
      account_id?: number;
      /**
       * Array of form fields retrieved using the `getCourierFields` method
       *
       * For checkbox with multiple selection, the information should be provided as seperate objects with the same `id` in the array
       * @example
       * ```typescript
       * [
       *   {
       *     id: "services",
       *     value: "sms",
       *   },
       *   {
       *     id: "services",
       *     value: "email",
       *   }
       * ]
       * ```
       */
      fields: Array<{
        /**
         * Field ID
         */
        id: string;
        /**
         * Field value
         */
        value: string;
      }>;
      /**
       * Array of shipments list
       *
       * Weight of at least one shipment is required
       * The array includes fields recieved from `getCourierFields` method. It also returns information wether the courier supports multiple shipments
       *
       * As a key use the field `id` retrieved from the `packages_fields` parameter in response of the `getCourierFields` method
       * As a value of field provide a value compatible with the field type from the `getCourierFields` response
       *
       * Height, width, length should be sent in centimeters
       * Weight should be sent in kilograms
       */
      packages: Array<
        {
          /**
           * Package weight
           */
          weight?: number;
          /**
           * Package width
           */
          width?: number;
          /**
           * Package height
           */
          height?: number;
          /**
           * Package length
           */
          length?: number;
          /**
           * Package size custom
           */
          size_custom?: number;
        } & Record<string, unknown>
      >;
    };
    response: {
      /**
       * Shipment ID
       */
      package_id: number;
      /**
       * Shipping number (consignment number)
       */
      package_number: string;
      /**
       * Courier internal number
       */
      courier_inner_number: string;
    };
  };

  /**
   * The method allows you to enter the shipping number and the name of the courier to the order
   * This function is used only to add shipments created outside BaseLinker
   */
  createPackageManual: {
    params: {
      /**
       * Order ID
       */
      order_id: number;
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method or custom courier name can be used
       */
      courier_code: string;
      /**
       * Shipping number (consignment number)
       */
      package_number: string;
      /**
       * Date of dispatch
       * Unix timestamp
       */
      pickup_date: number;
      /**
       * Flag indicating whether package is a return shipment
       * Set to `false` by default
       */
      return_shipment?: boolean;
    };
    response: {
      /**
       * Shipment ID
       */
      package_id: number;
      /**
       * Shipping number (consignment number)
       */
      package_number: string;
    };
  };

  /**
   * The method allows you to retrieve a list of available couriers
   */
  getCouriersList: {
    params: void;
    response: {
      /**
       * Array of couriers
       */
      couriers: Array<{
        /**
         * Courier code
         */
        code: string;
        /**
         * Courier name
         */
        name: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve the form fields for creating shipments for the selected order
   */
  getCourierFields: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
    };
    response: {
      /**
       * Flag indicating whether the courier supports multiple shipments
       */
      multi_packages: Flag;
      /**
       * Array of fields to create a shipment
       */
      fields: Array<{
        /**
         * Field ID
         */
        id: string;
        /**
         * Field name
         */
        name: string;
        /**
         * Field type
         */
        type: CourierFieldType;
        /**
         * Field description
         */
        desc?: string;
        /**
         * Object containing available options for select and checkbox fields
         * Key is the option ID, and value is the option name
         */
        options?: Record<string, string>;
        /**
         * Object with additional fields that are available for the selected option
         * Key for each element is ID of the option for which additional fields are to be available
         * Value is the array of fields available for the selected option
         */
        show_field?: Record<string, Array<string>>;
        /**
         * Default field value
         */
        value?: string;
        /**
         * Field function
         * If not blank, it means that the field has dynamic options and in order to download the current options for a particular order, you should retrieve those using the `getCourierServices` method
         */
        function?: string;
      }>;
      /**
       * Array of fields to create packages
       */
      package_fields: Array<{
        /**
         * Field ID
         */
        id: string;
        /**
         * Field name
         */
        name: string;
        /**
         * Field type
         */
        type: CourierPackageFieldType;
      }>;
    };
  };

  /**
   * The method allows you to retrieve additional courier services, which depend on other shipment settings
   * Used only for X-press, BrokerSystem, Wysyłam z Allegro, ErliPRO couriers
   * Not applicable to other couriers whose forms have fixed options
   *
   * The details of the package should be sent with the method (the same format as in the `createPackage` method) in order to receive a list of additional services
   */
  getCourierServices: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
      /**
       * Order ID
       */
      order_id: number;
      /**
       * Courier API account ID for the courier accounts retrieved using the `getCourierAccounts` method
       * If blank, first account is used
       */
      account_id?: number;
      /**
       * Array of form fields retrieved using the `getCourierFields` method
       *
       * For checkbox with multiple selection, the information should be provided as seperate objects with the same `id` in the array
       * @example
       * ```typescript
       * [
       *   {
       *     id: "services",
       *     value: "sms",
       *   },
       *   {
       *     id: "services",
       *     value: "email",
       *   }
       * ]
       * ```
       */
      fields: Array<{
        /**
         * Field ID
         */
        id: string;
        /**
         * Field value
         */
        value: string;
      }>;
      /**
       * Array of shipments list
       *
       * Weight of at least one shipment is required
       * The array includes fields recieved from `getCourierFields` method. It also returns information wether the courier supports multiple shipments
       *
       * As a key use the field `id` retrieved from the `packages_fields` parameter in response of the `getCourierFields` method
       * As a value of field provide a value compatible with the field type from the `getCourierFields` response
       *
       * Height, width, length should be sent in centimeters
       * Weight should be sent in kilograms
       */
      packages: Array<
        {
          /**
           * Package weight
           */
          weight?: number;
          /**
           * Package width
           */
          width?: number;
          /**
           * Package height
           */
          height?: number;
          /**
           * Package length
           */
          length?: number;
          /**
           * Package size custom
           */
          size_custom?: number;
        } & Record<string, unknown>
      >;
    };
    response: {
      /**
       * Object with available services
       * Key is the service ID, and value is the service name
       */
      services: Record<string, string>;
    };
  };

  /**
   * The method allows you to retrieve the list of accounts connected to a given courier
   */
  getCourierAccounts: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
    };
    response: {
      /**
       * Array of courier accounts
       */
      accounts: Array<{
        /**
         * Account ID
         */
        id: number;
        /**
         * Account name
         */
        name: string;
      }>;
    };
  };

  /**
   * The method allows you to download a shipping label (consignment) for a selected shipment
   */
  getLabel: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
      /**
       * Shipment ID
       * Optional if the `package_number` is provided
       */
      package_id?: number;
      /**
       * Shipping number (consignment number)
       * Optional if the `package_id` is provided
       */
      package_number?: string;
    };
    response: {
      /**
       * Label file extension
       */
      extension: "pdf" | "html" | "gif" | "png" | "epl" | "zpl" | "dpl";
      /**
       * Label binary encoded in Base64
       */
      label: string;
    };
  };

  /**
   * The method allows you to download a parcel protocol for selected shipments if the protocol is available for chosen courier
   */
  getProtocol: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
      /**
       * Array of shipment IDs
       * Optional if `package_numbers` is provided
       */
      package_ids?: Array<number>;
      /**
       * Array of shipment numbers (consignment numbers)
       * Optional if `package_ids` is provided
       */
      package_numbers?: Array<string>;
      /**
       * Courier API account ID for the courier accounts retrieved using the `getCourierAccounts` method
       */
      account_id: number;
    };
    response: {
      /**
       * Protocol file extension
       */
      extension: "pdf" | "html";
      /**
       * Protocol binary encoded in Base64
       */
      protocol: string;
    };
  };

  /**
   * The method allows you to download shipments previously created for the selected order
   */
  getOrderPackages: {
    params: {
      /**
       * Order ID
       */
      order_id: string;
    };
    response: {
      /**
       * Array of shipments
       */
      packages: Array<{
        /**
         * Shipment ID
         */
        package_id: number;
        /**
         * Shipping number (consignment number)
         */
        courier_package_nr: string;
        /**
         * Courier internal number
         */
        courier_inner_number: string;
        /**
         * Courier code
         */
        courier_code: string;
        /**
         * Additional courier name
         * Applicable to brokes
         */
        courier_other_name?: string;
        /**
         * Last tracking status date
         */
        tracking_status_date: number;
        /**
         * Number of days for a shipment to be delivered from status `Shipped` to status `Delivered`, excluding weekends
         */
        tracking_delivery_days: number;
        /**
         * Tracking status code
         * Possible values:
         *  - 0 - Unknown
         *  - 1 - Courier label created
         *  - 2 - Shipped
         *  - 3 - Not delivered
         *  - 4 - Out for delivery
         *  - 5 - Delivered
         *  - 6 - Return
         *  - 7 - Aviso
         *  - 8 - Waiting at point
         *  - 9 - Lost
         *  - 10 - Cancelled
         *  - 11 - On the way
         */
        tracking_status: CourierTrackingStatus;
        /**
         * Package type code
         * Possible values:
         *  - 0 - Standard shipment
         *  - 1 - Return shipment
         *  - 2 - Sent at point
         *  - 3 - Return shipment, sent at point
         */
        package_type: CourierPackageType;
        /**
         * Shipment tracking URL
         */
        tracking_url: string;
        /**
         * Flag indicating whether the shipment is a return shipment
         */
        is_return: boolean;
      }>;
    };
  };

  /**
   * The method allows you to retrieve the history of the status list of the given shipments
   * Maximum of 100 shipments can be retrieved at a time
   */
  getCourierPackagesStatusHistory: {
    params: {
      /**
       * Package IDs
       */
      package_ids: Array<number>;
    };
    response: {
      /**
       * Object with shipment status history
       * Key is the parcel ID, and value is an array of status history entries
       */
      packages_history: Record<
        string,
        Array<{
          /**
           * Status date
           */
          tracking_status_date: number;
          /**
           * Original status code in the courier system
           */
          courier_status_code: string;
          /**
           * Tracking status code
           * Possible values:
           *  - 0 - Unknown
           *  - 1 - Courier label created
           *  - 2 - Shipped
           *  - 3 - Not delivered
           *  - 4 - Out for delivery
           *  - 5 - Delivered
           *  - 6 - Return
           *  - 7 - Aviso
           *  - 8 - Waiting at point
           *  - 9 - Lost
           *  - 10 - Cancelled
           *  - 11 - On the way
           *  - 12 - Exception (sorting error, other event, complaint)
           *  - 13 - Transferred abroad
           */
          tracking_status: CourierTrackingHistoryStatus;
        }>
      >;
    };
  };

  /**
   * The method allows you to delete a previously created shipment
   * The method removes the shipment from the BaseLinker system and form the courier system if the courier API allows it
   */
  deleteCourierPackage: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
      /**
       * Shipment ID
       * Optional if the `package_number` is provided
       */
      package_id: number;
      /**
       * Shipping number (consignment number)
       * Optional if the `package_id` is provided
       */
      package_number: string;
      /**
       * Flag indicating whether the package should be forced to be removed form the BaseLinker database in the case of an error with the removal of the shipment in the courier API
       */
      force_delete?: boolean;
    };
    response: object;
  };

  /**
   * The method allows you to request a parcel pickup for previously created shipments
   * The method sends a parcel pickup requqest to courier API of the courier API allows it
   */
  requestParcelPickup: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
      /**
       * Array of shipment IDs
       * Optional if `package_numbers` is provided
       */
      package_ids?: Array<number>;
      /**
       * Array of shipment numbers (consignment numbers)
       * Optional if `package_ids` is provided
       */
      package_numbers?: Array<string>;
      /**
       * Courier API account ID for the courier accounts retrieved using the `getCourierAccounts` method
       */
      account_id: number;
      /**
       * Array of form fields retrieved using the `getRequestParcelPickupFields` method
       */
      fields: Array<
        {
          /**
           * Field ID
           */
          id?: string;
          /**
           * Field name
           */
          name?: string;
          /**
           * Field type
           */
          type?: CourierFieldType;
          /**
           * Field description
           */
          desc?: string;
          /**
           * Object containing available options for select and checkbox fields
           * Key is the option ID, and value is the option name
           */
          options?: Record<string, string>;
          /**
           * Default field value
           */
          value?: string;
        } & Record<string, unknown>
      >;
    };
    response: {
      /**
       * Parcel pickup number provided by the courier API
       */
      pickup_number: string;
    };
  };

  /**
   * The method allows you to rerieve additional fields for a parcel pickup reuqest
   */
  getRequestParcelPickupFields: {
    params: {
      /**
       * Courier code
       * The list of available couriers can be retrieved using the `getCouriersList` method
       */
      courier_code: string;
    };
    response: {
      /**
       * Array of additional fields to request parcel pickup
       */
      fields: Array<{
        /**
         * Field ID
         */
        id: string;
        /**
         * Field name
         */
        name: string;
        /**
         * Field type
         */
        type: CourierFieldType;
        /**
         * Field description
         */
        desc?: string;
        /**
         * Object containing available options for select and checkbox fields
         * Key is the option ID, and value is the option name
         */
        options?: Record<string, string>;
        /**
         * Default field value
         */
        value?: string;
      }>;
    };
  };
};
