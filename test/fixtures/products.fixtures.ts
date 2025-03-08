import type {
  AddInventoryCategoryResponse,
  AddInventoryManufacturerResponse,
  AddInventoryPriceGroupResponse,
  AddInventoryProductResponse,
  AddInventoryResponse,
  AddInventoryWarehouseResponse,
  GetInventoriesResponse,
  GetInventoryAvailableTextFieldKeysResponse,
  GetInventoryCategoriesResponse,
  GetInventoryExtraFieldsResponse,
  GetInventoryIntegrationsResponse,
  GetInventoryManufacturersResponse,
  GetInventoryPriceGroupsResponse,
  GetInventoryProductLogsResponse,
  GetInventoryProductsDataResponse,
  GetInventoryProductsListResponse,
  GetInventoryProductsPricesResponse,
  GetInventoryProductsStockResponse,
  GetInventoryTagsResponse,
  GetInventoryWarehousesResponse,
  UpdateInventoryCategoryResponse,
  UpdateInventoryManufacturerResponse,
  UpdateInventoryPriceGroupResponse,
  UpdateInventoryProductResponse,
  UpdateInventoryProductsPricesResponse,
  UpdateInventoryProductsStockResponse,
  UpdateInventoryResponse,
  UpdateInventoryWarehouseResponse,
} from "../../src";

export const addInventoryPriceGroup: AddInventoryPriceGroupResponse = {
  price_group_id: 1,
};

export const updateInventoryPriceGroup: UpdateInventoryPriceGroupResponse = {
  price_group_id: 1,
};

export const deleteInventoryPriceGroup = {};

export const getInventoryPriceGroups: GetInventoryPriceGroupsResponse = {
  price_groups: [
    {
      price_group_id: 1,
      name: "test",
      currency: "PLN",
      is_default: true,
      description: "test",
    },
  ],
};

export const addInventoryWarehouse: AddInventoryWarehouseResponse = {
  warehouse_id: 1,
};

export const updateInventoryWarehouse: UpdateInventoryWarehouseResponse = {
  warehouse_id: 1,
};

export const deleteInventoryWarehouse = {};

export const getInventoryWarehouses: GetInventoryWarehousesResponse = {
  warehouses: [
    {
      warehouse_id: 1,
      description: "test",
      name: "test",
      is_default: true,
      stock_edition: false,
      warehouse_type: "bl",
    },
  ],
};

export const addInventory: AddInventoryResponse = {
  inventory_id: 1,
};

export const updateInventory: UpdateInventoryResponse = {
  inventory_id: 1,
};

export const deleteInventory = {};

export const getInventories: GetInventoriesResponse = {
  inventories: [
    {
      inventory_id: 1,
      name: "test",
      description: "test",
      is_default: true,
      languages: ["PL", "EN"],
      warehouses: ["bl_1"],
      price_groups: [1],
      default_language: "PL",
      default_price_group: 1,
      default_warehouse: "bl_1",
      reservations: false,
    },
  ],
};

export const addInventoryCategory: AddInventoryCategoryResponse = {
  category_id: 1,
};

export const updateInventoryCategory: UpdateInventoryCategoryResponse = {
  category_id: 1,
};

export const deleteInventoryCategory = {};

export const getInventoryCategories: GetInventoryCategoriesResponse = {
  categories: [
    {
      category_id: 1,
      name: "test",
      parent_id: 1,
    },
  ],
};

export const getInventoryTags: GetInventoryTagsResponse = {
  tags: [
    {
      name: "test",
    },
  ],
};

export const addInventoryManufacturer: AddInventoryManufacturerResponse = {
  manufacturer_id: 1,
};

export const updateInventoryManufacturer: UpdateInventoryManufacturerResponse =
  { manufacturer_id: 1 };

export const deleteInventoryManufacturer = {};

export const getInventoryManufacturers: GetInventoryManufacturersResponse = {
  manufacturers: [
    {
      manufacturer_id: 1,
      name: "test",
    },
  ],
};

export const getInventoryExtraFields: GetInventoryExtraFieldsResponse = {
  extra_fields: [
    {
      name: "test",
      kind: 0,
      editor_type: "text",
      extra_field_id: 1,
    },
  ],
};

export const getInventoryIntegrations: GetInventoryIntegrationsResponse = {
  integrations: [
    {
      langs: ["PL", "EN"],
      accounts: {
        "1": "test",
      },
    },
  ],
};

export const getInventoryAvailableTextFieldKeys: GetInventoryAvailableTextFieldKeysResponse =
  {
    text_field_keys: {
      "1": "test",
    },
  };

export const addInventoryProduct: AddInventoryProductResponse = {
  product_id: 1,
};

export const updateInventoryProduct: UpdateInventoryProductResponse = {
  product_id: 1,
};

export const deleteInventoryProduct = {};

export const getInventoryProductsData: GetInventoryProductsDataResponse = {
  products: {
    "1": {
      manufacturer_id: 1,
      category_id: 1,
      tags: ["test"],
      tax_rate: 23,
      ean: "test",
      sku: "test",
      star: 5,
      links: {
        bl_1: {
          product_id: 1,
          variant_id: 1,
        },
      },
      stock: {
        bl_1: 1,
      },
      width: 1,
      height: 1,
      length: 1,
      weight: 1,
      images: {
        "1": "test",
      },
      prices: {
        "1": 100,
      },
      variants: {},
      is_bundle: true,
      locations: {
        bl_1: "test",
      },
      text_fields: {
        "1": "test",
      },
      average_cost: 1,
      average_landed_cost: 1,
    },
  },
};

export const getInventoryProductsList: GetInventoryProductsListResponse = {
  products: {
    "1": {
      id: 1,
      name: "test",
      ean: "test",
      sku: "test",
      stock: {
        bl_1: 1,
      },
      prices: {
        "1": 100,
      },
    },
  },
};

export const getInventoryProductsStock: GetInventoryProductsStockResponse = {
  products: {
    "1": {
      product_id: 1,
      stock: {
        bl_1: 1,
      },
      variants: {
        "1": {
          bl_1: 1,
        },
      },
    },
  },
};

export const updateInventoryProductsStock: UpdateInventoryProductsStockResponse =
  {
    counter: 1,
    warnings: {},
  };

export const getInventoryProductsPrices: GetInventoryProductsPricesResponse = {
  products: {
    "1": {
      prices: {
        "1": 100,
      },
      variants: {},
    },
  },
};

export const updateInventoryProductsPrices: UpdateInventoryProductsPricesResponse =
  {
    counter: 1,
    warnings: {},
  };

export const getInventoryProductLogs: GetInventoryProductLogsResponse = {
  logs: [
    {
      date: 1679574400,
      profile: "test",
      entries: {},
    },
  ],
};

export const runProductMacroTrigger = {};
