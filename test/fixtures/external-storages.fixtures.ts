import type {
  GetExternalStorageCategoriesResponse,
  GetExternalStorageProductsDataResponse,
  GetExternalStorageProductsListResponse,
  GetExternalStorageProductsPricesResponse,
  GetExternalStorageProductsQuantityResponse,
  GetExternalStoragesListResponse,
} from "../../src";

export const getExternalStoragesList: GetExternalStoragesListResponse = {
  storages: [
    {
      name: "test",
      storage_id: "shop_1",
      methods: ["method1", "method2"],
    },
  ],
};

export const getExternalStorageCategories: GetExternalStorageCategoriesResponse =
  {
    storage_id: "shop_1",
    categories: [
      {
        name: "test",
        category_id: 1,
        parent_id: 1,
      },
    ],
  };

export const getExternalStorageProductsData: GetExternalStorageProductsDataResponse =
  {
    storage_id: "shop_1",
    products: [
      {
        price_brutto: 100,
        ean: "test",
        name: "test",
        product_id: 1,
        quantity: 1,
        variants: [
          {
            quantity: 1,
            name: "test",
            variant_id: 1,
            ean: "test",
            sku: "test",
            price: 100,
          },
        ],
        sku: "test",
        weight: 1,
        tax_rate: 23,
        images: [],
        features: {},
        man_name: "test",
        man_image: "test",
        category_id: 1,
        description: "test",
        price_netto: 100,
        description_extra1: "test",
        description_extra2: "test",
        price_wholesale_netto: 100,
      },
    ],
  };

export const getExternalStorageProductsList: GetExternalStorageProductsListResponse =
  {
    storage_id: "shop_1",
    products: [
      {
        quantity: 1,
        product_id: 1,
        name: "test",
        ean: "test",
        sku: "test",
        price_brutto: 100,
      },
    ],
  };

export const getExternalStorageProductsPrices: GetExternalStorageProductsPricesResponse =
  {
    storage_id: "shop_1",
    products: [
      {
        product_id: 1,
        price: 100,
        variants: [
          {
            price: 100,
            variant_id: 1,
          },
        ],
      },
    ],
  };

export const getExternalStorageProductsQuantity: GetExternalStorageProductsQuantityResponse =
  {
    storage_id: "shop_1",
    products: [
      {
        quantity: 1,
        product_id: 1,
        variants: [
          {
            quantity: 1,
            variant_id: 1,
          },
        ],
      },
    ],
  };

export const updateExternalStorageProductsQuantity = {};
