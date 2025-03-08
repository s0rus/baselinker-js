import { describe, expect, test } from "bun:test";
import * as fixtures from "./fixtures/products.fixtures.js";
import { mockFetch } from "./test-setup";
import {
  AddInventoryCategoryParams,
  AddInventoryManufacturerParams,
  AddInventoryParams,
  AddInventoryPriceGroupParams,
  AddInventoryProductParams,
  AddInventoryWarehouseParams,
  createBaselinkerClient,
  DeleteInventoryCategoryParams,
  DeleteInventoryManufacturerParams,
  DeleteInventoryParams,
  DeleteInventoryPriceGroupParams,
  DeleteInventoryProductParams,
  DeleteInventoryWarehouseParams,
  GetInventoryAvailableTextFieldKeysParams,
  GetInventoryCategoriesParams,
  GetInventoryIntegrationsParams,
  GetInventoryProductLogsParams,
  GetInventoryProductsDataParams,
  GetInventoryProductsListParams,
  GetInventoryProductsPricesParams,
  GetInventoryProductsStockParams,
  RunProductMacroTriggerParams,
  UpdateInventoryCategoryParams,
  UpdateInventoryManufacturerParams,
  UpdateInventoryParams,
  UpdateInventoryPriceGroupParams,
  UpdateInventoryProductParams,
  UpdateInventoryProductsPricesParams,
  UpdateInventoryProductsStockParams,
  UpdateInventoryWarehouseParams,
} from "../src";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Products", () => {
  const testCases = [
    {
      idx: 0, // just for test case numbering
      method: "addInventoryPriceGroup",
      params: {
        name: "test",
        currency: "PLN",
        description: "test",
      } satisfies AddInventoryPriceGroupParams,
      fixture: fixtures.addInventoryPriceGroup,
    },
    {
      idx: 1,
      method: "updateInventoryPriceGroup",
      params: {
        price_group_id: 1,
        description: "test",
        name: "test",
        currency: "PLN",
      } satisfies UpdateInventoryPriceGroupParams,
      fixture: fixtures.updateInventoryPriceGroup,
    },
    {
      idx: 2,
      method: "deleteInventoryPriceGroup",
      params: {
        price_group_id: 1,
      } satisfies DeleteInventoryPriceGroupParams,
      fixture: fixtures.deleteInventoryPriceGroup,
    },
    {
      idx: 3,
      method: "getInventoryPriceGroups",
      params: undefined,
      fixture: fixtures.getInventoryPriceGroups,
    },
    {
      idx: 4,
      method: "addInventoryWarehouse",
      params: {
        name: "test",
        description: "test",
        stock_edition: false,
      } satisfies AddInventoryWarehouseParams,
      fixture: fixtures.addInventoryWarehouse,
    },
    {
      idx: 5,
      method: "updateInventoryWarehouse",
      params: {
        warehouse_id: 1,
        name: "test",
        description: "test",
        stock_edition: false,
      } satisfies UpdateInventoryWarehouseParams,
      fixture: fixtures.updateInventoryWarehouse,
    },
    {
      idx: 6,
      method: "deleteInventoryWarehouse",
      params: {
        warehouse_id: 1,
      } satisfies DeleteInventoryWarehouseParams,
      fixture: fixtures.deleteInventoryWarehouse,
    },
    {
      idx: 7,
      method: "getInventoryWarehouses",
      params: undefined,
      fixture: fixtures.getInventoryWarehouses,
    },
    {
      idx: 8,
      method: "addInventory",
      params: {
        name: "test",
        description: "test",
        languages: ["PL", "EN"],
        default_language: "PL",
        price_groups: [1],
        default_price_group: 1,
        warehouses: ["bl_1"],
        default_warehouse: "bl_1",
        reservations: false,
      } satisfies AddInventoryParams,
      fixture: fixtures.addInventory,
    },
    {
      idx: 9,
      method: "updateInventory",
      params: {
        inventory_id: 1,
        name: "test",
        description: "test",
        languages: ["PL", "EN"],
        default_language: "PL",
        price_groups: [1],
        default_price_group: 1,
        warehouses: ["bl_1"],
        default_warehouse: "bl_1",
        reservations: false,
      } satisfies UpdateInventoryParams,
      fixture: fixtures.updateInventory,
    },
    {
      idx: 10,
      method: "deleteInventory",
      params: {
        inventory_id: 1,
      } satisfies DeleteInventoryParams,
      fixture: fixtures.deleteInventory,
    },
    {
      idx: 11,
      method: "getInventories",
      params: undefined,
      fixture: fixtures.getInventories,
    },
    {
      idx: 12,
      method: "addInventoryCategory",
      params: {
        inventory_id: 1,
        name: "test",
        parent_id: 1,
      } satisfies AddInventoryCategoryParams,
      fixture: fixtures.addInventoryCategory,
    },
    {
      idx: 13,
      method: "updateInventoryCategory",
      params: {
        inventory_id: 1,
        category_id: 1,
        name: "test",
        parent_id: 1,
      } satisfies UpdateInventoryCategoryParams,
      fixture: fixtures.updateInventoryCategory,
    },
    {
      idx: 14,
      method: "deleteInventoryCategory",
      params: {
        category_id: 1,
      } satisfies DeleteInventoryCategoryParams,
      fixture: fixtures.deleteInventoryCategory,
    },
    {
      idx: 15,
      method: "getInventoryCategories",
      params: {
        inventory_id: 1,
      } satisfies GetInventoryCategoriesParams,
      fixture: fixtures.getInventoryCategories,
    },
    {
      idx: 16,
      method: "getInventoryTags",
      params: undefined,
      fixture: fixtures.getInventoryTags,
    },
    {
      idx: 17,
      method: "addInventoryManufacturer",
      params: {
        name: "test",
      } satisfies AddInventoryManufacturerParams,
      fixture: fixtures.addInventoryManufacturer,
    },
    {
      idx: 18,
      method: "updateInventoryManufacturer",
      params: {
        manfacturer_id: 1,
        name: "test",
      } satisfies UpdateInventoryManufacturerParams,
      fixture: fixtures.updateInventoryManufacturer,
    },
    {
      idx: 19,
      method: "deleteInventoryManufacturer",
      params: {
        manufacturer_id: 1,
      } satisfies DeleteInventoryManufacturerParams,
      fixture: fixtures.deleteInventoryManufacturer,
    },
    {
      idx: 20,
      method: "getInventoryManufacturers",
      params: undefined,
      fixture: fixtures.getInventoryManufacturers,
    },
    {
      idx: 21,
      method: "getInventoryExtraFields",
      params: undefined,
      fixture: fixtures.getInventoryExtraFields,
    },
    {
      idx: 22,
      method: "getInventoryIntegrations",
      params: {
        inventory_id: 1,
      } satisfies GetInventoryIntegrationsParams,
      fixture: fixtures.getInventoryIntegrations,
    },
    {
      idx: 23,
      method: "getInventoryAvailableTextFieldKeys",
      params: {
        inventory_id: 1,
      } satisfies GetInventoryAvailableTextFieldKeysParams,
      fixture: fixtures.getInventoryAvailableTextFieldKeys,
    },
    {
      idx: 24,
      method: "addInventoryProduct",
      params: {
        inventory_id: 1,
        parent_id: 1,
        is_bundle: true,
        ean: "test",
        ean_additional: [
          {
            ean: "test",
            quantity: 1,
          },
        ],
        sku: "test",
        tags: ["test"],
        tax_rate: 23,
        weight: 1,
        height: 1,
        width: 1,
        length: 1,
        average_cost: 1,
        star: 5,
        manufacturer_id: 1,
        category_id: 1,
        prices: {
          "1": 100,
        },
        stock: {
          bl_1: 1,
        },
        locations: {
          bl_1: "test",
        },
        text_fields: {
          "1": "test",
        },
        images: {
          "1": "test",
        },
        bundle_products: {
          "1": 1,
        },
        links: {},
      } satisfies AddInventoryProductParams,
      fixture: fixtures.addInventoryProduct,
    },
    {
      idx: 25,
      method: "updateInventoryProduct",
      params: {
        product_id: 1,
        inventory_id: 1,
        parent_id: 1,
        is_bundle: true,
        ean: "test",
        ean_additional: [
          {
            ean: "test",
            quantity: 1,
          },
        ],
        sku: "test",
        tags: ["test"],
        tax_rate: 23,
        weight: 1,
        height: 1,
        width: 1,
        length: 1,
        average_cost: 1,
        star: 5,
        manufacturer_id: 1,
        category_id: 1,
        prices: {
          "1": 100,
        },
        stock: {
          bl_1: 1,
        },
        locations: {
          bl_1: "test",
        },
        text_fields: {
          "1": "test",
        },
        images: {
          "1": "test",
        },
        bundle_products: {
          "1": 1,
        },
        links: {},
      } satisfies UpdateInventoryProductParams,
      fixture: fixtures.updateInventoryProduct,
    },
    {
      idx: 26,
      method: "deleteInventoryProduct",
      params: {
        product_id: 1,
      } satisfies DeleteInventoryProductParams,
      fixture: fixtures.deleteInventoryProduct,
    },
    {
      idx: 27,
      method: "getInventoryProductsData",
      params: {
        inventory_id: 1,
        products: [1],
        include_erp_units: true,
        include_wms_units: true,
        include_additional_eans: true,
      } satisfies GetInventoryProductsDataParams,
      fixture: fixtures.getInventoryProductsData,
    },
    {
      idx: 28,
      method: "getInventoryProductsList",
      params: {
        inventory_id: 1,
        filter_id: 1,
        filter_category_id: 1,
        filter_ean: "test",
        filter_sku: "test",
        filter_name: "test",
        filter_price_from: 1,
        filter_price_to: 1,
        filter_stock_from: 1,
        filter_stock_to: 1,
        page: 1,
      } satisfies GetInventoryProductsListParams,
      fixture: fixtures.getInventoryProductsList,
    },
    {
      idx: 29,
      method: "getInventoryProductsStock",
      params: {
        inventory_id: "1",
      } satisfies GetInventoryProductsStockParams,
      fixture: fixtures.getInventoryProductsStock,
    },
    {
      idx: 30,
      method: "updateInventoryProductsStock",
      params: {
        inventory_id: "1",
        products: {
          "1": {
            bl_1: 1,
          },
        },
      } satisfies UpdateInventoryProductsStockParams,
      fixture: fixtures.updateInventoryProductsStock,
    },
    {
      idx: 31,
      method: "getInventoryProductsPrices",
      params: {
        inventory_id: "1",
      } satisfies GetInventoryProductsPricesParams,
      fixture: fixtures.getInventoryProductsPrices,
    },
    {
      idx: 32,
      method: "updateInventoryProductsPrices",
      params: {
        inventory_id: "1",
        products: {
          "1": {
            bl_1: 1,
          },
        },
      } satisfies UpdateInventoryProductsPricesParams,
      fixture: fixtures.updateInventoryProductsPrices,
    },
    {
      idx: 33,
      method: "getInventoryProductLogs",
      params: {
        product_id: 1,
        date_from: 1679574400,
        date_to: 1679574400,
        log_type: 1,
        sort: "ASC",
        page: 1,
      } satisfies GetInventoryProductLogsParams,
      fixture: fixtures.getInventoryProductLogs,
    },
    {
      idx: 34,
      method: "runProductMacroTrigger",
      params: {
        product_id: 1,
        trigger_id: 1,
      } satisfies RunProductMacroTriggerParams,
      fixture: fixtures.runProductMacroTrigger,
    },
  ];

  const bl = createBaselinkerClient({
    apiKey: "test-api-key",
  });

  test.each(testCases)(
    "Method %# should work correctly",
    async ({ method, params, fixture }) => {
      mockFetch.mockReset();

      mockFetch.mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(fixture))),
      );

      const data = await bl.products[method](params);
      const encodedParams = encodeURIComponent(JSON.stringify(params || {}));

      expect(data).toEqual(fixture);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        BASELINKER_API_URL,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-BLToken": "test-api-key",
          },
          body: expect.stringContaining(
            `method=${method}&parameters=${encodedParams}`,
          ),
        }),
      );
    },
  );
});
