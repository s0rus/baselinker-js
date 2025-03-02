import type {
  ExternalStorageCode,
  ExternalStorageProductSort,
  Flag,
} from "../external/index.js";

export type ExternalStoragesCategory = {
  /**
   * The method allows you to retrieve a list of available external storages (shops, wholesalers) that can be referenced via API
   */
  getExternalStoragesList: {
    params: void;
    response: {
      /**
       * Array of storages
       */
      storages: Array<{
        /**
         * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
         */
        storage_id: ExternalStorageCode;
        /**
         * Storage name
         */
        name: string;
        /**
         * Array of methods supported by the storage
         */
        methods: Array<string>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a category list from an external storage (shop, wholesaler) connected to BaseLinker
   */
  getExternalStorageCategories: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
    };
    response: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of categories
       */
      categories: Array<{
        /**
         * Category ID
         */
        category_id: number;
        /**
         * Category name
         */
        name: string;
        /**
         * Parent category ID
         */
        parent_id: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve detailed data of selected products from an external storage (shop, wholesaler) connected to BaseLinker
   *
   * The function can return additional fields created individually for a given seller in the integration file of his online store
   */
  getExternalStorageProductsData: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of product IDs to retrieve
       */
      procucts: Array<number>;
    };
    response: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of products
       */
      products: Array<{
        /**
         * Product ID
         */
        product_id: number;
        /**
         * Product EAN number
         */
        ean: string;
        /**
         * Product SKU number
         */
        sku: string;
        /**
         * Product name
         */
        name: string;
        /**
         * Product quantity
         */
        quantity: number;
        /**
         * Product net price
         */
        price_netto: number;
        /**
         * Product gross price
         */
        price_brutto: number;
        /**
         * Product net wholesale price
         */
        price_wholesale_netto: number;
        /**
         * Product tax rate
         * Value should be between 0 and 100 or:
         *  - -1 for EXPT/ZW exempt from VAT
         *  - -0.02 for NP annotation
         *  - -0.03 for OO VAT reverse charge
         */
        tax_rate: number;
        /**
         * Product weight in kilograms
         */
        weight: number;
        /**
         * Product description
         */
        description: string;
        /**
         * Additional product description
         */
        description_extra1: string;
        /**
         * Additional product description
         */
        description_extra2: string;
        /**
         * Manufacturer name
         */
        man_name: string;
        /**
         * Full manufacturer logo address
         */
        man_image: string;
        /**
         * Product category ID
         */
        category_id: number;
        /**
         * Array of product images
         */
        images: Array<string>;
        /**
         * Object of product features where key is the feature name and value is the feature value
         */
        features: Record<string, string>;
        /**
         * Array of product variants
         */
        variants: Array<{
          /**
           * Variant ID
           */
          variant_id: number;
          /**
           * Variant name
           */
          name: string;
          /**
           * Variant price
           */
          price: number;
          /**
           * Variant quantity
           */
          quantity: number;
          /**
           * Variant SKU number
           */
          sku: string;
          /**
           * Variant EAN number
           */
          ean: string;
        }>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve detailed data of selected products from an external storage (shop, wholesaler) connected to BaseLinker
   */
  getExternalStorageProductsList: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Limit results to a specific category ID
       */
      filter_category_id?: number;
      // TODO: Better filter_product_id type
      /**
       * Sort results by a specific field
       * Possible values:
       *  - "id [ASC|DESC]"
       *  - "name [ASC|DESC]"
       *  - "quantity [ASC|DESC]"
       *  - "price [ASC|DESC]"
       */
      filter_sort?: ExternalStorageProductSort;
      /**
       * Filter results by product ID
       */
      filter_id?: string;
      /**
       * Filter results by product EAN number
       */
      filter_ean?: string;
      /**
       * Filter results by product SKU number
       */
      filter_sku?: string;
      /**
       * Filter results by product name
       */
      filter_name?: string;
      /**
       * Filter results by minimum product price
       */
      filter_price_from?: number;
      /**
       * Filter results by maximum product price
       */
      filter_price_to?: number;
      /**
       * Filter results by minimum product quantity
       */
      filter_quantity_from?: number;
      /**
       * Filter results by maximum product quantity
       */
      filter_quantity_to?: number;
      /**
       * Filter results by availability
       * Possible values:
       *  - 1 - available products
       *  - 0 - unavailable products
       */
      filter_available?: Flag;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of products
       */
      products: Array<{
        /**
         * Product ID
         */
        product_id: number;
        /**
         * Product EAN number
         */
        ean: string;
        /**
         * Product SKU number
         */
        sku: string;
        /**
         * Product name
         */
        name: string;
        /**
         * Product quantity
         */
        quantity: number;
        /**
         * Product gross price
         */
        price_brutto: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve stock from an external storage (shop, wholesaler) connected to BaseLinker
   */
  getExternalStorageProductsQuantity: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of products
       */
      products: Array<{
        /**
         * Product ID
         */
        product_id: number;
        /**
         * Product quantity
         */
        quantity: number;
        /**
         * Array of product variants
         */
        variants: Array<{
          /**
           * Variant ID
           */
          variant_id: number;
          /**
           * Variant quantity
           */
          quantity: number;
        }>;
      }>;
    };
  };

  /**
   * The method allows you to retrieve product prices from an external storage (shop, wholesaler) connected to BaseLinker
   */
  getExternalStorageProductsPrices: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Page number of the results
       * BaseLinker API returns maximum of 100 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of products
       */
      products: Array<{
        /**
         * Product ID
         */
        product_id: number;
        /**
         * Product price
         */
        price: number;
        /**
         * Array of product variants
         */
        variants: Array<{
          /**
           * Variant ID
           */
          variant_id: number;
          /**
           * Variant price
           */
          price: number;
        }>;
      }>;
    };
  };

  /**
   * The method allows you to bulk update the product stock (and/or variants) in an external storage (shop, wholesaler) connected to BaseLinker
   * Maximum of 1000 products can be updated at a time
   */
  updateExternalSotrageProcuctsQuantity: {
    params: {
      /**
       * Storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445")
       */
      storage_id: ExternalStorageCode;
      /**
       * Array of instructions where each instruction is an array of three elements:
       *  - product ID
       *  - variant ID (0 if the main product is changed, not the variant)
       *  - Stock quantity
       *
       *  @example
       *  ```typescript
       *  [
       *    [1, 0, 10], // Change product 1 quantity to 10
       *    [2, 0, 20], // Change product 2 quantity to 20
       *    [3, 1, 30], // Change product 3 variant 1 quantity to 30
       *    [4, 1, 40], // Change product 3 variant 1 quantity to 40
       *  ]
       *  ```
       */
      products: Array<[string, number, number]>;
    };
    response: {
      /**
       * Number of received items
       */
      counter: number;
      /**
       * Object containing warnings for product updates
       */
      warnings: Record<string, string>;
    };
  };
};
