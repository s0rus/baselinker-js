import type { BaselinkerConnectCategory } from "./baselinker-connect.js";
import type { CourierShipmentsCategory } from "./courier-shipments.js";
import type { ExternalStoragesCategory } from "./external-storages.js";
import type { OrderReturnsCategory } from "./order-returns.js";
import type { OrdersCategory } from "./orders.js";
import type { ProductsCategory } from "./products.js";
import type { WarehouseDocumentsCategory } from "./warehouse-documents.js";
import type { WarehousePurchaseOrdersCategory } from "./warehouse-purchase-orders.js";

export type BaselinkerFetchError = {
  status: "ERROR";
  error_code: string;
  error_message: string;
};

export type BaselinkerFetchSuccess<T> = {
  status: "SUCCESS";
} & T;

type MethodsByCategory = {
  products: ProductsCategory;
  warehouseDocuments: WarehouseDocumentsCategory;
  warehousePurchaseOrders: WarehousePurchaseOrdersCategory;
  orders: OrdersCategory;
  orderReturns: OrderReturnsCategory;
  courierShipments: CourierShipmentsCategory;
  baselinkerConnect: BaselinkerConnectCategory;
  externalStorages: ExternalStoragesCategory;
};

export const BASELINKER_API_URL = "https://api.baselinker.com/connector.php";

export const VALID_CATEGORIES: Array<keyof MethodsByCategory> = [
  "products",
  "orders",
  "orderReturns",
  "courierShipments",
  "warehouseDocuments",
  "warehousePurchaseOrders",
  "baselinkerConnect",
  "externalStorages",
];

export const VALID_METHODS: {
  [K in keyof MethodsByCategory]: Array<MethodsOf<K>>;
} = {
  products: [
    "addInventoryPriceGroup",
    "updateInventoryPriceGroup",
    "deleteInventoryPriceGroup",
    "getInventoryPriceGroups",
    "addInventoryWarehouse",
    "updateInventoryWarehouse",
    "deleteInventoryWarehouse",
    "getInventoryWarehouses",
    "addInventory",
    "updateInventory",
    "deleteInventory",
    "getInventories",
    "addInventoryCategory",
    "updateInventoryCategory",
    "deleteInventoryCategory",
    "getInventoryCategories",
    "getInventoryTags",
    "addInventoryManufacturer",
    "updateInventoryManufacturer",
    "deleteInventoryManufacturer",
    "getInventoryManufacturers",
    "getInventoryExtraFields",
    "getInventoryIntegrations",
    "getInventoryAvailableTextFieldKeys",
    "addInventoryProduct",
    "updateInventoryProduct",
    "deleteInventoryProduct",
    "getInventoryProductsData",
    "getInventoryProductsList",
    "getInventoryProductsStock",
    "updateInventoryProductsStock",
    "getInventoryProductsPrices",
    "updateInventoryProductsPrices",
    "getInventoryProductLogs",
    "runProductMacroTrigger",
  ],
  orders: [
    "getJournalList",
    "addOrder",
    "getOrderSources",
    "getOrderExtraFields",
    "getOrders",
    "getOrderTransactionData",
    "getOrdersByEmail",
    "getOrdersByPhone",
    "addInvoice",
    "getInvoices",
    "getSeries",
    "getOrderStatusList",
    "getOrderPaymentsHistory",
    "getOrderPickPackHistory",
    "getNewReceipts",
    "getReceipt",
    "setOrderFields",
    "addOrderProduct",
    "setOrderProductFields",
    "deleteOrderProduct",
    "setOrderPayment",
    "setOrderStatus",
    "setOrderStatuses",
    "setOrderReceipt",
    "addOrderInvoiceFile",
    "addOrderReceiptFile",
    "getInvoiceFile",
    "runOrderMacroTrigger",
  ],
  orderReturns: [
    "getOrderReturnJournalList",
    "addOrderReturn",
    "getOrderReturnExtraFields",
    "getOrderReturns",
    "getOrderReturnStatusList",
    "getOrderReturnPaymentsHistory",
    "setOrderReturnFields",
    "addOrderReturnProduct",
    "setOrderReturnProductFields",
    "deleteOrderReturnProduct",
    "setOrderReturnRefund",
    "getOrderReturnReasonsList",
    "setOrderReturnStatus",
    "setOrderReturnStatuses",
    "runOrderReturnMacroTrigger",
    "getOrderReturnProductStatuses",
  ],
  courierShipments: [
    "createPackage",
    "createPackageManual",
    "getCouriersList",
    "getCourierFields",
    "getCourierFields",
    "getCourierServices",
    "getCourierAccounts",
    "getLabel",
    "getProtocol",
    "getOrderPackages",
    "getCourierPackagesStatusHistory",
    "deleteCourierPackage",
    "requestParcelPickup",
    "getRequestParcelPickupFields",
  ],
  warehouseDocuments: [
    "getInventoryDocuments",
    "getInventoryDocumentItems",
    "getInventoryDocumentSeries",
  ],
  warehousePurchaseOrders: [
    "getInventoryPurchaseOrders",
    "getInventoryPurchaseOrderItems",
    "getInventoryPurchaseOrderSeries",
  ],
  baselinkerConnect: [
    "getConnectIntegrations",
    "addConnectContractorCredit",
    "getConnectIntegrationContractors",
    "getConnectContractorCreditHistory",
  ],
  externalStorages: [
    "getExternalStoragesList",
    "getExternalStorageCategories",
    "getExternalStorageProductsData",
    "getExternalStorageProductsList",
    "getExternalStorageProductsPrices",
    "getExternalStorageProductsQuantity",
    "updateExternalSotrageProcuctsQuantity",
  ],
};

export type Category = keyof MethodsByCategory;

export type MethodsOf<C extends Category> = keyof MethodsByCategory[C];

export type ResponseOf<
  C extends Category,
  M extends MethodsOf<C>,
> = MethodsByCategory[C][M] extends { response: infer R }
  ? R
  : Record<string, never>;

export type MethodsFor<C extends Category> = {
  [M in MethodsOf<C>]: HasVoidParams<C, M> extends true
    ? (
        options?: FetchOptions,
      ) => Promise<
        | Prettify<BaselinkerFetchSuccess<ResponseOf<C, M>>>
        | Prettify<BaselinkerFetchError>
      >
    : HasOptionalParams<C, M> extends true
      ? (
          params?: MethodsByCategory[C][M] extends { params?: infer P }
            ? P
            : never,
          options?: FetchOptions,
        ) => Promise<
          | Prettify<BaselinkerFetchSuccess<ResponseOf<C, M>>>
          | Prettify<BaselinkerFetchError>
        >
      : (
          params: MethodsByCategory[C][M] extends { params: infer P }
            ? P
            : never,
          options?: FetchOptions,
        ) => Promise<
          | Prettify<BaselinkerFetchSuccess<ResponseOf<C, M>>>
          | Prettify<BaselinkerFetchError>
        >;
};

export type FetchOptions = Omit<RequestInit, "method" | "body"> & {
  headers?: Omit<Record<string, string>, "Content-Type" | "X-BLToken">;
};

export function isFetchOptions(obj: unknown): boolean {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const fetchOptionProperties: Array<keyof FetchOptions> = [
    "cache",
    "credentials",
    "headers",
    "integrity",
    "keepalive",
    "mode",
    "redirect",
    "referrer",
    "referrerPolicy",
    "signal",
    "window",
  ];

  return fetchOptionProperties.some((prop) => prop in (obj as object));
}

type HasVoidParams<
  C extends Category,
  M extends MethodsOf<C>,
> = MethodsByCategory[C][M] extends { params: void } ? true : false;

type HasOptionalParams<
  C extends Category,
  M extends MethodsOf<C>,
> = MethodsByCategory[C][M] extends { params?: unknown } ? true : false;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
