import type {
  CurrencyCode,
  FieldType,
  Flag,
  InventoryProductLogType,
  LanguageCode,
  WarehouseCode,
  WarehouseType,
} from "../external/index.js";

export type ProductsCategory = {
  /**
   * The method allows to create a price group in BaseLinker storage
   */
  addInventoryPriceGroup: {
    params: {
      /**
       * Name of the price group
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Price group description
       */
      description: string;
      /**
       * 3-letter currency symbol e.g. PLN, EUR, USD
       */
      currency: CurrencyCode;
    };
    response: {
      /**
       * The ID of added price group
       */
      price_group_id: number;
    };
  };

  /**
   * The method allows to update a price group in BaseLinker storage
   */
  updateInventoryPriceGroup: {
    params: {
      /**
       * Price group identifier to update
       */
      price_group_id: number;
      /**
       * Name of the price group
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Price group description
       */
      description: string;
      /**
       * 3-letter currency symbol e.g. PLN, EUR, USD
       */
      currency: CurrencyCode;
    };
    response: {
      /**
       * The ID of updated price group
       */
      price_group_id: number;
    };
  };

  /**
   * The method allows to delete a price group from BaseLinker storage
   */
  deleteInventoryPriceGroup: {
    params: {
      /**
       * Price group identifier to delete
       */
      price_group_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve price groups existing in BaseLinker storage
   */
  getInventoryPriceGroups: {
    params: void;
    response: {
      /**
       * An array of available price groups
       */
      price_groups: Array<{
        /**
         * Price group identifier
         */
        price_group_id: number;
        /**
         * Name of the price group
         */
        name: string;
        /**
         * Price group description
         */
        description: string;
        /**
         * 3-letter currency symbol e.g. PLN, EUR, USD
         */
        currency: CurrencyCode;
        /**
         * Flag indicating whether the price group is default
         */
        is_default: boolean;
      }>;
    };
  };

  /**
   * The method allows to add a new warehouse available in BaseLinker catalogues
   * Such warehouse may be later used in `addInventory` method.
   */
  addInventoryWarehouse: {
    params: {
      /**
       * Name of the warehouse
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Description of the warehouse
       */
      description: string;
      /**
       * Flag indicating wether manual editing of stocks is permitted
       * A `false` value means that you can only edit your stock through the API
       */
      stock_edition: boolean;
    };
    response: {
      /**
       * The ID of added warehouse
       */
      warehouse_id: number;
    };
  };

  /**
   * The method allows to update a warehouse available in BaseLinker catalogues
   * The method does not allow editing warehouses created automatically for the purpose of keeping external stocks of shops, wholesalers etc
   */
  updateInventoryWarehouse: {
    params: {
      /**
       * Warehouse ID to update
       */
      warehouse_id: number;
      /**
       * Name of the warehouse
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Description of the warehouse
       */
      description: string;
      /**
       * Flag indicating wether manual editing of stocks is permitted
       * A `false` value means that you can only edit your stock through the API
       */
      stock_edition: boolean;
    };
    response: {
      /**
       * The ID of updated warehouse
       */
      warehouse_id: number;
    };
  };

  /**
   * The method allows to delete a warehouse from BaseLinker catalogues
   */
  deleteInventoryWarehouse: {
    params: {
      /**
       * Warehouse ID to delete
       */
      warehouse_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve a list of warehouses available in the BaseLinker catalog
   * The method also returns information about the warehouses created automatically for the purpose of keeping external stocks of shops, wholesales, etc.
   */
  getInventoryWarehouses: {
    params: void;
    response: {
      /**
       * An array of available warehouses
       */
      warehouses: Array<{
        /**
         * Warehouse type
         * Possible values:
         *  - "bl"
         *  - "shop"
         *  - "warehouse"
         */
        warehouse_type: WarehouseType;
        /**
         * Warehouse ID
         */
        warehouse_id: number;
        /**
         * Warehouse name
         */
        name: string;
        /**
         * Warehouse description
         */
        description: string;
        /**
         * Flag indicating whether manual editing of stocks is permitted
         * A `false` value means that you can only edit your stock through the API
         */
        stock_edition: boolean;
        /**
         * Flag indicating whether the warehouse is default
         */
        is_default: boolean;
      }>;
    };
  };

  /**
   * The method allows you to add the BaseLinker catalogs
   */
  addInventory: {
    params: {
      /**
       * Name of the inventory
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Description of the inventory
       */
      description: string;
      /**
       * An array of languages available in the inventory
       */
      languages: Array<LanguageCode>;
      /**
       * Default inventory language
       * Must be included in the `languages` parameter
       */
      default_language: LanguageCode;
      /**
       * An array of price groups IDs available in the inventory
       * The list of price group identifiers can be retrieved using the `getInventoryPriceGroups` method
       */
      price_groups: Array<number>;
      /**
       * Default price group ID
       * Must be included in the `price_groups` parameter
       */
      default_price_group: number;
      /**
       * An array of warehouse IDs available in the inventory
       * The list of warehouse identifiers can be retrieved using the `getInventoryWarehouses` method
       * The format of the identifier should be as follows: `[type:bl|shop|warehouse]_[id:number]`
       *
       * @example
       * "shop_2445"
       */
      warehouses: Array<WarehouseCode>;
      /**
       * Default warehouse ID for the inventory
       * Must be included in the `warehouses` parameter
       */
      default_warehouse: WarehouseCode;
      /**
       * Flag indicating whether the inventory supports reservations
       */
      reservations: boolean;
    };
    response: {
      /**
       * The ID of added inventory
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
    };
  };

  /**
   * The method allows you to update the BaseLinker catalogs
   */
  updateInventory: {
    params: {
      /**
       * Inventory ID to update
       * The list of IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
      /**
       * Name of the inventory
       * Maximum length is 100 characters
       */
      name: string;
      /**
       * Description of the inventory
       */
      description: string;
      /**
       * An array of languages available in the inventory
       */
      languages: Array<LanguageCode>;
      /**
       * Default inventory language
       * Must be included in the `languages` parameter
       */
      default_language: LanguageCode;
      /**
       * An array of price groups IDs available in the inventory
       * The list of price group identifiers can be retrieved using the `getInventoryPriceGroups` method
       */
      price_groups: Array<number>;
      /**
       * Default price group ID
       * Must be included in the `price_groups` parameter
       */
      default_price_group: number;
      /**
       * An array of warehouse IDs available in the inventory
       * The list of warehouse identifiers can be retrieved using the `getInventoryWarehouses` method
       * The format of the identifier should be as follows: `[type:bl|shop|warehouse]_[id:number]`
       *
       * @example
       * "shop_2445"
       */
      warehouses: Array<WarehouseCode>;
      /**
       * Default warehouse ID for the inventory
       * Must be included in the `warehouses` parameter
       */
      default_warehouse: WarehouseCode;
      /**
       * Flag indicating whether the inventory supports reservations
       */
      reservations: boolean;
    };
    response: {
      /**
       * The ID of added inventory
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
    };
  };

  /**
   * The method allows you to delete a catalog from the BaseLinker
   */
  deleteInventory: {
    params: {
      /**
       * The ID of inventory to delete
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve a list of catalogs available in the BaseLinker storage
   */
  getInventories: {
    params: void;
    response: {
      /**
       * An array of available inventories
       */
      inventories: Array<{
        /**
         * Inventory ID
         */
        inventory_id: number;
        /**
         * Name of the inventory
         * Maximum length is 100 characters
         */
        name: string;
        /**
         * Description of the inventory
         */
        description: string;
        /**
         * An array of languages available in the inventory
         */
        languages: Array<LanguageCode>;
        /**
         * Default inventory language
         */
        default_language: LanguageCode;
        /**
         * An array of price groups IDs available in the inventory
         */
        price_groups: Array<number>;
        /**
         * Default price group ID
         * Must be included in the `price_groups` parameter
         */
        default_price_group: number;
        /**
         * An array of warehouse IDs available in the inventory
         * The list of warehouse identifiers can be retrieved using the `getInventoryWarehouses` method
         * The format of the identifier should be as follows: `[type:bl|shop|warehouse]_[id:number]`
         *
         * @example
         * "shop_2445"
         */
        warehouses: Array<WarehouseCode>;
        /**
         * Default warehouse ID for the inventory
         * Must be included in the `warehouses` parameter
         */
        default_warehouse: WarehouseCode;
        /**
         * Flag indicating whether the inventory supports reservations
         */
        reservations: boolean;
        /**
         * Flag indicating whether the inventory is default
         */
        is_default: boolean;
      }>;
    };
  };

  /**
   * The method allows you to add a category to the BaseLinker catalog
   */
  addInventoryCategory: {
    params: {
      /**
       * Catalog ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       * To add a category available for all inventories created in BaseLinker, this field should be omitted
       */
      inventory_id?: number;
      /**
       * Name of the category
       * Maximum length is 200 characters
       */
      name: string;
      /**
       * The ID of the parent category
       * For the top-level category, `0` should be given as `parent_id`
       * Categories should be added starting from the hierarchy root so that the child is always added after the parent
       */
      parent_id: number;
    };
    response: {
      /**
       * The ID of added category
       * In an external application you should create a link between the internal number and the number received here
       * This number can be used to update the added category
       * This number is also used in `addProducts` and `deleteCategory` methods
       */
      category_id: number;
    };
  };

  /**
   * The method allows you to update a category in the BaseLinker catalog
   */
  updateInventoryCategory: {
    params: {
      /**
       * Catalog ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       * To make category available only for a specific inventory provide the inventory ID here
       */
      inventory_id?: number;
      /**
       * Category ID to update
       * The list of category IDs can be retrieved using the `getInventoryCategories` method
       */
      category_id: number;
      /**
       * Name of the category
       * Maximum length is 200 characters
       */
      name: string;
      /**
       * The ID of the parent category
       * For the top-level category, `0` should be given as `parent_id`
       * Categories should be added starting from the hierarchy root so that the child is always added after the parent
       */
      parent_id: number;
    };
    response: {
      /**
       * The ID of updated category
       * In an external application you should create a link between the internal number and the number received here
       * This number can be used to update the added category
       * This number is also used in `addProducts` and `deleteCategory` methods
       */
      category_id: number;
    };
  };

  /**
   * The method allows you to delete a category from the BaseLinker catalog
   * Along with the category, all products in the category will be deleted, this does not affect products in subcategories
   * The subcategories will be changed to the highest level categories
   */
  deleteInventoryCategory: {
    params: {
      /**
       * Category ID to delete
       * The list of category IDs can be retrieved using the `getInventoryCategories` method
       */
      category_id: number;
    };
    respnse: object;
  };

  /**
   * The method allows you to retrieve a list of categories available in the BaseLinker catalog
   */
  getInventoryCategories: {
    params: {
      /**
       * Catalog ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       * To retrieve categories available for all inventories, omit this field
       */
      inventory_id?: number;
    };
    response: {
      /**
       * An array of available categories
       */
      categories: Array<{
        /**
         * Category ID
         */
        category_id: number;
        /**
         * Name of the category
         * Maximum length is 200 characters
         */
        name: string;
        /**
         * The ID of the parent category
         */
        parent_id: number;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a list of tags for a BaseLinker catalog
   */
  getInventoryTags: {
    params: void;
    response: {
      /**
       * An array of available tags
       */
      tags: Array<{
        /**
         * Tag name
         */
        name: string;
      }>;
    };
  };

  /**
   * The method allows you to add a manufacturer to the BaseLinker catalog
   */
  addInventoryManufacturer: {
    params: {
      /**
       * Manufacturer name
       * Maximum length is 200 characters
       */
      name: string;
    };
    response: {
      /**
       * The ID of added manufacturer
       */
      manufacturer_id: number;
    };
  };

  /**
   * The method allows you to update a manufacturer in the BaseLinker catalog
   */
  updateInventoryManufacturer: {
    params: {
      /**
       * Manufacturer ID to update
       * The list of manufacturer IDs can be retrieved using the `getInventoryManufacturers` method
       */
      manfacturer_id: number;
      /**
       * Manufacturer name
       * Maximum length is 200 characters
       */
      name: string;
    };
    response: {
      /**
       * The ID of added manufacturer
       */
      manufacturer_id: number;
    };
  };

  /**
   * The method allows you to delete a manufacturer from the BaseLinker catalog
   */
  deleteInventoryManufacturer: {
    params: {
      /**
       * Manufacturer ID to delete
       * The list of manufacturer IDs can be retrieved using the `getInventoryManufacturers` method
       */
      manufacturer_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retrieve a list of manufacturers available in the BaseLinker catalog
   */
  getInventoryManufacturers: {
    params: void;
    response: {
      /**
       * An array of available manufacturers
       */
      manufacturers: Array<{
        /**
         * Manufacturer ID
         */
        manufacturer_id: number;
        /**
         * Manufacturer name
         * Maximum length is 200 characters
         */
        name: string;
      }>;
    };
  };

  /**
   * The method allows you to retrieve a list of extra fields available in the BaseLinker catalog
   */
  getInventoryExtraFields: {
    params: void;
    response: {
      /**
       * An array of available extra fields
       */
      extra_fields: Array<{
        /**
         * Extra field ID
         */
        extra_field_id: number;
        /**
         * Extra field name
         * Maximum length is 100 characters
         */
        name: string;
        /**
         * Kind of additional field
         * Value `0` indicates a short field which is maximum of 200 characters
         * Value `1` indicates a long field which does not have a limit
         * The value can be overwritten for specific integrations e.g. marketplace
         */
        kind: Flag | unknown;
        /**
         * Type of additional field
         * Available values are `text`, `number`, `select`, `checkbox`, `radio`, `date`, `file`
         */
        editor_type: FieldType;
        /**
         * An array of values available for a given additional field
         * This field applies only to `select`, `checkbox` and `radio` field types
         */
        options?: Array<string>;
      }>;
    };
  };

  /**
   * The method returns a list of integrations
   * The returned data contains a list of accounts for each integration and a list of languages supported by each integration
   */
  getInventoryIntegrations: {
    params: {
      /**
       * Catalog ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
    };
    response: {
      /**
       * An array of integrations, where the code of the integration is the key.
       */
      integrations: Array<{
        /**
         * An array of two-letter codes for the languages supported by the integration, e.g. `["PL", "EN"]`
         */
        langs: Array<LanguageCode>;
        /**
         * An array of accounts for the integration, where the key is the account ID and the value is the account name
         */
        accounts: Record<string, string>;
      }>;
    };
  };

  /**
   * The method returns a list of product text fields that can be overwritten for specific integration
   */
  getInventoryAvailableTextFieldKeys: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
    };

    response: {
      /**
       * An object containing product text fields, where key is the code of the text field and value is the text field name
       */
      text_field_keys: Record<string, string>;
    };
  };

  /**
   * The method allows you to add a new product to BaseLinker catalog
   */
  addInventoryProduct: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `genInventories` method
       */
      inventory_id: number;
      /**
       * Product parent ID
       * Provide it only if added product is a variant of another product
       */
      parent_id?: number;
      /**
       * Flag indicating whether the product is part of a bundle
       */
      is_bundle: boolean;
      /**
       * Product EAN number
       */
      ean: string;
      /**
       * Array of additional EAN numbers
       */
      ean_additional: Array<{
        /**
         * EAN number
         */
        ean: string;
        /**
         * Quantity of product with given EAN number
         */
        quantity: number;
      }>;
      /**
       * Product SKU number
       */
      sku: string;
      /**
       * Array of product tag names
       */
      tags?: Array<string>;
      /**
       * Product VAT tax rate e.g. 23
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
       * Product height
       */
      height: number;
      /**
       * Product width
       */
      width: number;
      /**
       * Product length
       */
      length: number;
      /**
       * Product average cost
       * If storage documents are turned off, this field sets product average cost
       * If storage documents are turned on, a value in this field can be set in two cases:
       *  - while creating a new product
       *  - when a current average cost is set to 0
       */
      average_cost: number;
      /**
       * Product star type
       * It takes values from 0 to 5
       * 0 means no starring
       */
      star: number;
      /**
       * Product manufacturer ID
       * The list of manufacturer IDs can be retrieved using the `getInventoryManufacturers` method
       */
      manufacturer_id: number;
      /**
       * Product category ID
       * The list of category IDs can be retrieved using the `getInventoryCategories` method
       */
      category_id: number;
      /**
       * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
       * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
       */
      prices: Record<string, number>;
      /**
       * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
       * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
       * Stocks cannot be assigned to the warehouses created automatically for purposes of keeping external stocks (shops, wholesales, etc.)
       */
      stock: Record<WarehouseCode, number>;
      /**
       * Object containing product locations, where key is the warehouse ID and value is a product location for a given warehouse
       * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
       * To assing multiple locations to a single warehouse, separate them with a semicolon
       */
      locations: Record<WarehouseCode, string>;
      // TODO: Better text_fields types (?)
      /**
       * Object containing field text values (names, descriptions, etc.) of a product, where key is the field text ID and value is the field value
       * The field consists of the following components separated with the `|` character:
       *  - field name:
       *    Accepted values are: `name`, `description`, `features`, `description_extra1` to `description_extra4`, `extra_field_[extra-field-id]` e.g. `extra_field_75`
       *    The list of extra field IDs can be retrieved using the `getInventoryExtraFields` method
       *
       *  - two letter code of language, if this value is not specified, the default catalog language is assigned
       *    The list of languages for each integration can be retrieved using the `getInventoryIntegrations` method
       *
       *  - integration ID prodivded when the given text field value is to be overwritten for a specific integration
       *    If a value is to be overwritten throughout the integration (e.g. for all Amazon accounts), the value `0` should be given as the identifier (e.g. `amazon_0`)
       *
       *  The list of of all text field identifiers can be retrieved using the `getInventoryAvailableTextFieldKeys` method
       *
       *  In case of the name and short additional fields, the character limit is 200
       *  When specifying `features` field, provide an object where key is the name of parameter and value is the value of the parameter
       *
       *  @example
       *  Fields example:
       *  "name" - Default name assigned to the default language
       *  "name|de" - Default name assigned to the German language
       *  "name|de|amazon_0" - Name assigned to a specific language for all Amazon accounts
       *  "name|en|amazon_123" - Name assigned to a specific language for Amazon account with ID `123`
       *
       *  Features field example:
       *  {
       *    "features": {
       *      "color": "red",
       *      "size": "large"
       *    }
       *  }
       *
       *  File example:
       *  {
       *   "title": "file.pdf" // file name with 40 characters limit
       *   "file": "data:4AAQSkZJRgABA[...]" // binary file body limited to 2MB
       *  }
       */
      text_fields: Record<string, string | Record<string, string>>;
      // TODO: Better images types (?)
      /**
       * Object containing product images (maximum of 16), where key is the photo position in the gallery (numbering from 0 to 15) and value is the photo data
       *
       * You can delete a photo by sending an empty string as the value for certain position
       * You can submit a photo like so:
       *  - provide a base64 encoded binary string as the value with `data:` prefix
       *  - provide a URL to the image with `url:` prefix
       *
       *  @example
       * {
       *   "0": "data:4AAQSkZJRgABA[...]", // binary image body limited to 2MB
       *   "1": "url:https://example.com/image.jpg", // URL to photo limited to 1000 characters
       *   "2": "", // delete photo
       * }
       */
      images: Record<string, string>;
      /**
       * Object containing product links to external warehouses, where key is the warehouse ID
       * the list of warehouse IDs can be retrieved using the `getStorageList` method
       */
      links: Record<
        WarehouseCode,
        {
          /**
           * Product ID in external warehouse
           */
          product_id: number;
          /**
           * Variant ID in external warehouse
           * When assigning a link to a main product, this field should be omitted or set to `0`
           */
          variant_id?: number;
        }
      >;
      /**
       * Object containing information about products included in the bundle, where key is ID of the product included in the bundle and value is the number of pieces of this product in the bundle
       * Subproducts can only be defined if the added product is a bundle (`is_bundle` is set to `true`)
       */
      bundle_products?: Record<string, number>;
    };
    response: {
      /**
       * The ID of added product
       */
      product_id: number;
      // TODO: Better warnings types (?)
      /**
       * Object containing notes on adding a product (e.g. image errors or others that do not interrupt the request)
       * Each field informs about a seperate error
       */
      warnings?: Record<string, string>;
    };
  };

  /**
   * The method allows you to update a product in BaseLinker catalog
   */
  updateInventoryProduct: {
    params: {
      /**
       * Product ID to update
       */
      product_id: number;
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `genInventories` method
       */
      inventory_id: number;
      /**
       * Product parent ID
       * Provide it only if edited product is a variant of another product
       */
      parent_id?: number;
      /**
       * Flag indicating whether the product is part of a bundle
       */
      is_bundle: boolean;
      /**
       * Product EAN number
       */
      ean: string;
      /**
       * Array of additional EAN numbers
       */
      ean_additional: Array<{
        /**
         * EAN number
         */
        ean: string;
        /**
         * Quantity of product with given EAN number
         */
        quantity: number;
      }>;
      /**
       * Product SKU number
       */
      sku: string;
      /**
       * Array of product tag names
       *
       * If no tags are provided in the API request, the product retains it's existing tags (e.g. A, B, C)
       * If tags A, B and C are provided in the API request, the product retains it's existing tags
       * If tags B and C are provided in the API request, tag A is removed from the product
       * If empty array of tags is provided in the API request, all existing tags are removed from the product
       */
      tags?: Array<string>;
      /**
       * Product VAT tax rate e.g. 23
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
       * Product height
       */
      height: number;
      /**
       * Product width
       */
      width: number;
      /**
       * Product length
       */
      length: number;
      /**
       * Product average cost
       * If storage documents are turned off, this field sets product average cost
       * If storage documents are turned on, a value in this field can be set in two cases:
       *  - while creating a new product
       *  - when a current average cost is set to 0
       */
      average_cost: number;
      /**
       * Product star type
       * It takes values from 0 to 5
       * 0 means no starring
       */
      star: number;
      /**
       * Product manufacturer ID
       * The list of manufacturer IDs can be retrieved using the `getInventoryManufacturers` method
       */
      manufacturer_id: number;
      /**
       * Product category ID
       * The list of category IDs can be retrieved using the `getInventoryCategories` method
       */
      category_id: number;
      /**
       * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
       * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
       */
      prices: Record<string, number>;
      /**
       * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
       * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
       * Stocks cannot be assigned to the warehouses created automatically for purposes of keeping external stocks (shops, wholesales, etc.)
       */
      stock: Record<WarehouseCode, number>;
      /**
       * Object containing product locations, where key is the warehouse ID and value is a product location for a given warehouse
       * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
       * To assing multiple locations to a single warehouse, separate them with a semicolon
       */
      locations: Record<WarehouseCode, string>;
      // TODO: Better text_fields types (?)
      /**
       * Object containing field text values (names, descriptions, etc.) of a product, where key is the field text ID and value is the field value
       * The field consists of the following components separated with the `|` character:
       *  - field name:
       *    Accepted values are: `name`, `description`, `features`, `description_extra1` to `description_extra4`, `extra_field_[extra-field-id]` e.g. `extra_field_75`
       *    The list of extra field IDs can be retrieved using the `getInventoryExtraFields` method
       *
       *  - two letter code of language, if this value is not specified, the default catalog language is assigned
       *    The list of languages for each integration can be retrieved using the `getInventoryIntegrations` method
       *
       *  - integration ID prodivded when the given text field value is to be overwritten for a specific integration
       *    If a value is to be overwritten throughout the integration (e.g. for all Amazon accounts), the value `0` should be given as the identifier (e.g. `amazon_0`)
       *
       *  The list of of all text field identifiers can be retrieved using the `getInventoryAvailableTextFieldKeys` method
       *
       *  In case of the name and short additional fields, the character limit is 200
       *  When specifying `features` field, provide an object where key is the name of parameter and value is the value of the parameter
       *
       *  @example
       *  Fields example:
       *  "name" - Default name assigned to the default language
       *  "name|de" - Default name assigned to the German language
       *  "name|de|amazon_0" - Name assigned to a specific language for all Amazon accounts
       *  "name|en|amazon_123" - Name assigned to a specific language for Amazon account with ID `123`
       *
       *  Features field example:
       *  {
       *    "features": {
       *      "color": "red",
       *      "size": "large"
       *    }
       *  }
       *
       *  File example:
       *  {
       *   "title": "file.pdf" // file name with 40 characters limit
       *   "file": "data:4AAQSkZJRgABA[...]" // binary file body limited to 2MB
       *  }
       */
      text_fields: Record<string, string | Record<string, string>>;
      // TODO: Better images types (?)
      /**
       * Object containing product images (maximum of 16), where key is the photo position in the gallery (numbering from 0 to 15) and value is the photo data
       *
       * You can delete a photo by sending an empty string as the value for certain position
       * You can submit a photo like so:
       *  - provide a base64 encoded binary string as the value with `data:` prefix
       *  - provide a URL to the image with `url:` prefix
       *
       *  @example
       * {
       *   "0": "data:4AAQSkZJRgABA[...]", // binary image body limited to 2MB
       *   "1": "url:https://example.com/image.jpg", // URL to photo limited to 1000 characters
       *   "2": "", // delete photo
       * }
       */
      images: Record<string, string>;
      /**
       * Object containing product links to external warehouses, where key is the warehouse ID
       * the list of warehouse IDs can be retrieved using the `getStorageList` method
       */
      links: Record<
        WarehouseCode,
        {
          /**
           * Product ID in external warehouse
           */
          product_id: number;
          /**
           * Variant ID in external warehouse
           * When assigning a link to a main product, this field should be omitted or set to `0`
           */
          variant_id?: number;
        }
      >;
      /**
       * Object containing information about products included in the bundle, where key is ID of the product included in the bundle and value is the number of pieces of this product in the bundle
       * Subproducts can only be defined if the updated product is a bundle (`is_bundle` is set to `true`)
       */
      bundle_products?: Record<string, number>;
    };
    response: {
      /**
       * The ID of updated product
       */
      product_id: number;
      // TODO: Better warnings types (?)
      /**
       * Object containing notes on updating a product (e.g. image errors or others that do not interrupt the request)
       * Each field informs about a seperate error
       */
      warnings?: Record<string, string>;
    };
  };

  /**
   * The method allows you to delete a product from BaseLinker catalog
   */
  deleteInventoryProduct: {
    params: {
      /**
       * Product ID to delete
       */
      product_id: number;
    };
    response: object;
  };

  /**
   * The method allows you to retreive detailed data for selected products from BaseLinker catalog
   */
  getInventoryProductsData: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
      /**
       * Product IDs to retrieve
       */
      products: number[];
      /**
       * Flag indicating whether the ERP units should be included in the response
       * Only available for inventories with purchase cost calculations system different than AVCO
       */
      include_erp_units?: boolean;
    };
    response: {
      /**
       * Object containing product data, where key is the product ID and value is an object containing product data
       */
      products: Record<
        string,
        {
          /**
           * Flag indicating whether the product is part of a bundle
           */
          is_bundle: boolean;
          /**
           * Product EAN number
           */
          ean: string;
          /**
           * Product SKU number
           */
          sku: string;
          /**
           * Array of product tag names
           */
          tags: Array<string>;
          /**
           * Product VAT tax rate e.g. 23
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
           * Product height
           */
          height: number;
          /**
           * Product width
           */
          width: number;
          /**
           * Product length
           */
          length: number;
          /**
           * Product star type
           * It takes values from 0 to 5
           * 0 means no starring
           */
          star: number;
          /**
           * Product category ID
           * The list of category IDs can be retrieved using the `getInventoryCategories` method
           */
          category_id: number;
          /**
           * Product manufacturer ID
           * The list of manufacturer IDs can be retrieved using the `getInventoryManufacturers` method
           */
          manufacturer_id: number;
          /**
           * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
           * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
           */
          prices: Record<string, number>;
          /**
           * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
           * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
           */
          stock: Record<WarehouseCode, number>;
          /**
           * Object containing product locations, where key is the warehouse ID and value is a product location for a given warehouse
           * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
           */
          locations: Record<WarehouseCode, string>;
          // TODO: Better text_fields types (?)
          /**
           * Object containing field text values (names, descriptions, etc.) of a product, where key is the field text ID and value is the field value
           * The field consists of the following components separated with the `|` character:
           *  - field name:
           *    Accepted values are: `name`, `description`, `features`, `description_extra1` to `description_extra4`, `extra_field_[extra-field-id]` e.g. `extra_field_75`
           *    The list of extra field IDs can be retrieved using the `getInventoryExtraFields` method
           *
           *  - two letter code of language, if this value is not specified, the default catalog language is assigned
           *    The list of languages for each integration can be retrieved using the `getInventoryIntegrations` method
           *
           *  - integration ID prodivded when the given text field value is to be overwritten for a specific integration
           *    If a value is to be overwritten throughout the integration (e.g. for all Amazon accounts), the value `0` should be given as the identifier (e.g. `amazon_0`)
           *
           *  The list of of all text field identifiers can be retrieved using the `getInventoryAvailableTextFieldKeys` method
           *
           *  In case of the name and short additional fields, the character limit is 200
           *  When specifying `features` field, provide an object where key is the name of parameter and value is the value of the parameter
           *
           *  @example
           *  Fields example:
           *  "name" - Default name assigned to the default language
           *  "name|de" - Default name assigned to the German language
           *  "name|de|amazon_0" - Name assigned to a specific language for all Amazon accounts
           *  "name|en|amazon_123" - Name assigned to a specific language for Amazon account with ID `123`
           *
           *  Features field example:
           *  {
           *    "features": {
           *      "color": "red",
           *      "size": "large"
           *    }
           *  }
           *
           *  File example:
           *  {
           *   "title": "file.pdf" // file name with 40 characters limit
           *   "file": "data:4AAQSkZJRgABA[...]" // binary file body limited to 2MB
           *  }
           */
          text_fields: Record<string, string | Record<string, string>>;
          /**
           * Product average cost in the main currency of the account
           */
          average_cost: number;
          /**
           * Product landed cost in the main currency of the account
           */
          average_landed_cost: number;
          /**
           * Object containing product images (maximum of 16), where key is the photo position in the gallery (numbering from 0 to 15) and value is the photo URL
           */
          images: Record<string, string>;
          /**
           * Object containing product links to external warehouses, where key is the warehouse ID
           * the list of warehouse IDs can be retrieved using the `getStorageList` method
           */
          links: Record<
            WarehouseCode,
            {
              /**
               * Product ID in external warehouse
               */
              product_id: number;
              /**
               * Variant ID in external warehouse
               * When linked to the main product, the value `0` is returned
               */
              variant_id: number;
            }
          >;
          /**
           * Object containing information about variants of the product, where key is the variant ID and value is an object containing variant data
           */
          variants: Record<
            string,
            {
              /**
               * Variant name
               */
              name: string;
              /**
               * Variant SKU number
               */
              sku: string;
              /**
               * Variant EAN number
               */
              ean: string;
              /**
               * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
               * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
               */
              prices: Record<string, number>;
              /**
               * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
               * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
               */
              stock: Record<WarehouseCode, number>;
              /**
               * Object containing product locations, where key is the warehouse ID and value is a product location for a given warehouse
               * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
               */
              locations: Record<WarehouseCode, string>;
            }
          >;
          /**
           * Object containing products stock ERP units, where key is the warehouse ID and value is an object with unit data in given warehouse
           */
          stock_erp_units: Record<
            WarehouseCode,
            {
              /**
               * Unit quantity
               */
              quantity: number;
              /**
               * Unit purchase cost
               */
              purchase_cost: number;
              /**
               * Unit expiry date
               */
              expiry_date: string;
            }
          >;
        }
      >;
    };
  };

  /**
   * The method allows you to retrieve a basic data of chosen products from BaseLinker catalog
   */
  getInventoryProductsList: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: number;
      /**
       * Limit results to a specific product id
       */
      filter_id?: number;
      /**
       * Limit results to a specific category id
       */
      filter_category_id?: number;
      /**
       * Limit results to a specific EAN number
       */
      filter_ean?: string;
      /**
       * Limit results to a specific SKU number
       */
      filter_sku?: string;
      /**
       * Limit results to part of searched name
       */
      filter_name?: string;
      /**
       * Limit results to minimum price limit
       */
      filter_price_from?: number;
      /**
       * Limit results to maximum price limit
       */
      filter_price_to?: number;
      /**
       * Limit results to minimum stock limit
       */
      filter_stock_from?: number;
      /**
       * Limit results to maximum stock limit
       */
      filter_stock_to?: number;
      /**
       * Results pagination
       * BaseLinker API returns maximum of 1000 results per page
       */
      page?: number;
      /**
       * Value for sorting the products list
       * Possible values: "id [ASC|DESC]"
       */
      filter_sort?: "id ASC" | "id DESC";
    };
    response: {
      /**
       * Object containing product data, where key is the product ID and value is an object containing product data
       */
      products: Record<
        string,
        {
          /**
           * Product ID
           */
          id: number;
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
           * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
           * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
           */
          prices: Record<string, number>;
          /**
           * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
           * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
           */
          stock: Record<WarehouseCode, number>;
        }
      >;
    };
  };

  /**
   * The method allows you to retrieve stock data of products from BaseLinker catalogs
   */
  getInventoryProductsStock: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: string;
      /**
       * Results pagination
       * BaseLinker API returns maximum of 1000 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Object containing product stocks, where key is the product ID and value is product stock data
       */
      products: Record<
        string,
        {
          /**
           * Product ID
           */
          product_id: string;
          /**
           *
           */
          /**
           * Object containing product stocks, where key is the warehouse ID and value is a product stock for a given warehouse
           * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
           */
          stock: Record<WarehouseCode, number>;
          /**
           * Object containing product reservations, where key is the warehouse ID and value is a product reservation for a given warehouse
           * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
           *
           * Only returned for inventories with reservations enabled
           */
          reservations?: Record<WarehouseCode, number>;
          /**
           * Object containing variants stocks, where key is the variant ID
           * Value is another object where key is the warehouse ID and value is a stock for a given warehouse
           */
          variants: Record<string, Record<WarehouseCode, number>>;
        }
      >;
    };
  };

  /**
   * The method allows you to update stocks of products (and/or their variants) in Baselinker catalogs
   *
   * You can update maximum of 1000 products at once
   */
  updateInventoryProductsStock: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: string;
      /**
       * Object of products where key is the product ID and value is the object with stocks
       * When determining the variant stock, provide variant ID as a product ID
       * In the stocks object, key should be the warehouse ID and value is the stock for a given warehouse
       * The list of warehouse IDs can be retrieved using the `getInventoryWarehouses` method
       */
      products: Record<string, Record<WarehouseCode, number>>;
    };
    response: {
      /**
       * Number of updated products
       */
      counter: number;
      /**
       * Object containing warnings for product updates
       * Key of each element is the product identifier, value is the update error message
       * Only keys containing errors are included in the response
       */
      warnings?: Record<string, string>;
    };
  };

  /**
   * The method allows you to retrieve the gross prices of products from BaseLinker catalogs
   */
  getInventoryProductsPrices: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: string;
      /**
       * Results pagination
       * BaseLinker API returns maximum of 1000 results per page
       */
      page?: number;
    };
    response: {
      /**
       * Object containing product prices, where key is the product ID and value is product price data
       */
      products: Record<
        string,
        {
          /**
           * Object containing product prices, where key is the price group ID and value is a product gross price for a given price group
           * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
           */
          prices: Record<string, number>;
          /**
           * Object containing variants prices, where key is the variant ID
           * Value is another object where key is the price group ID and value is the product gross price for a given price group
           */
          variants: Record<string, Record<string, number>>;
        }
      >;
    };
  };

  /**
   * The method allows you to update stocks of products (and/or their variants) in Baselinker catalogs
   *
   * You can update maximum of 1000 products at once
   */
  updateInventoryProductsPrices: {
    params: {
      /**
       * Inventory ID
       * The list of inventory IDs can be retrieved using the `getInventories` method
       */
      inventory_id: string;
      /**
       * Object of products where key is the product ID and value is the object with prices
       * When determining the variant price, provide variant ID as a product ID
       * In the prices object, key should be the price group ID and value is the price for a given price group
       * The list of price groups can be retrieved using the `getInventoryPriceGroups` method
       */
      products: Record<string, Record<WarehouseCode, number>>;
    };
    response: {
      /**
       * Number of updated products
       */
      counter: number;
      /**
       * Object containing warnings for product updates
       * Key of each element is the product identifier, value is the update error message
       * Only keys containing errors are included in the response
       */
      warnings?: Record<string, string>;
    };
  };

  /**
   * The method allows you to retrieve a list of events related to product changes (or their variants) in BaseLinker catalogs
   */
  getInventoryProductLogs: {
    params: {
      /**
       * Product ID
       * In case of a variant, provide the variant ID instead
       */
      product_id: number;
      /**
       * Date from which to retrieve logs
       * Unix timestamp format
       */
      date_from?: number;
      /**
       * Date to which to retrieve logs
       * Unix timestamp format
       */
      date_to?: number;
      /**
       * List of event types you want to retrieve
       * Available values are:
       *  - 1 - Change in stock
       *  - 2 - Change in price
       *  - 3 - Product creation
       *  - 4 - Product deletion
       *  - 5 - Text field modifications
       *  - 6 - Locations modifications
       *  - 7 - Links modifications
       *  - 8 - Gallery modifications
       *  - 9 - Variant modifications
       *  - 10 - Bundle products modifications
       */
      log_type?: InventoryProductLogType;
      /**
       * Sorting of the logs by date
       * By default, logs are sorted in ascending order
       */
      sort?: "ASC" | "DESC";
      /**
       * Results pagination
       * BaseLinker API returns maximum of 100 product editions per page
       */
      page?: number;
    };
    response: {
      /**
       * An array of product logs grouped by date and profile executing the change
       */
      logs: Array<{
        /**
         * Name of the profile executing the change
         */
        profile: string;
        /**
         * Date of the log
         */
        date: number;
        // TODO: Log types
        entries: unknown;
      }>;
    };
  };

  /**
   * The method allows you to run personal trigger for products automatic actions
   */
  runProductMacroTrigger: {
    params: {
      /**
       * Product ID
       */
      product_id: number;
      /**
       * Personal trigger ID from products automatic actions
       */
      trigger_id: number;
    };
    response: object;
  };
};
