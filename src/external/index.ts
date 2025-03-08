import type { BaselinkerConnectCategory } from "../internal/baselinker-connect.js";
import type { CourierShipmentsCategory } from "../internal/courier-shipments.js";
import type { ExternalStoragesCategory } from "../internal/external-storages.js";
import type { OrderReturnsCategory } from "../internal/order-returns.js";
import type { WarehouseDocumentsCategory } from "../internal/warehouse-documents.js";
import type { OrdersCategory } from "../internal/orders.js";
import type { ProductsCategory } from "../internal/products.js";
import type { WarehousePurchaseOrdersCategory } from "../internal/warehouse-purchase-orders.js";

export type Flag = 0 | 1;

export type CurrencyCode =
  `${Uppercase<string>}${Uppercase<string>}${Uppercase<string>}`;

export type LanguageCode = `${string}${string}`;
export type CountryCode = `${Uppercase<string>}${Uppercase<string>}`;

export type StorageType = "db" | "shop" | "warehouse";
export type StorageCode = `${StorageType}_${number}`;
export type WarehouseType = "bl" | "shop" | "warehouse";
export type WarehouseCode = `${WarehouseType}_${number}`;

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "file";
export type CourierFieldType = "select" | "checkbox" | "text" | "date";
export type CourierPackageFieldType = "select" | "checkbox" | "text";
export type CourierTrackingStatus =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;
export type CourierTrackingHistoryStatus =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;
export type CourierPackageType = 0 | 1 | 2 | 3;

export type ExternalStorageType = "shop" | "warehouse";
export type ExternalStorageCode = `${ExternalStorageType}_${number}`;
export type ExternalStorageProductSort =
  | "id ASC"
  | "id DESC"
  | "name ASC"
  | "name DESC"
  | "quantity ASC"
  | "quantity DESC"
  | "price ASC"
  | "price DESC";

export type OrderReturnLogType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export type OrderReturnSource = "shop" | "personal" | (string & {});
export type OrderReturnFulfillmentStatus = 0 | 1 | 2 | 5;

export type OrderLogType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21;
export type OrderSource = "shop" | "personal" | (string & {});
export type InvoiceVatRate =
  | number
  | "DEFAULT"
  | "ITEM"
  | "EXPT"
  | "ZW"
  | "NP"
  | "OO";
export type OrderPickPackActionType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;

export type InventoryProductLogType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type WarehouseDocumentType = 0 | 1 | 2 | 3 | 4 | 5;

export type InventoryPurchaseOrderStatus = 0 | 1 | 2 | 3 | 4 | 5;

/* Baselinker Connect */

export type GetConnectIntegrationsResponse =
  BaselinkerConnectCategory["getConnectIntegrations"]["response"];
export type GetConnectIntegrationContractorsParams =
  BaselinkerConnectCategory["getConnectIntegrationContractors"]["params"];
export type GetConnectIntegrationContractorsResponse =
  BaselinkerConnectCategory["getConnectIntegrationContractors"]["response"];
export type GetConnectContractorCreditHistoryParams =
  BaselinkerConnectCategory["getConnectContractorCreditHistory"]["params"];
export type GetConnectContractorCreditHistoryResponse =
  BaselinkerConnectCategory["getConnectContractorCreditHistory"]["response"];
export type AddConnectContractorCreditParams =
  BaselinkerConnectCategory["addConnectContractorCredit"]["params"];

/* Courier Shipments */

export type CreatePackageParams =
  CourierShipmentsCategory["createPackage"]["params"];
export type CreatePackageResponse =
  CourierShipmentsCategory["createPackage"]["response"];
export type CreatePackageManualParams =
  CourierShipmentsCategory["createPackageManual"]["params"];
export type CreatePackageManualResponse =
  CourierShipmentsCategory["createPackageManual"]["response"];
export type GetCouriersListResponse =
  CourierShipmentsCategory["getCouriersList"]["response"];
export type GetCourierFieldsParams =
  CourierShipmentsCategory["getCourierFields"]["params"];
export type GetCourierFieldsResponse =
  CourierShipmentsCategory["getCourierFields"]["response"];
export type GetCourierServicesParams =
  CourierShipmentsCategory["getCourierServices"]["params"];
export type GetCourierServicesResponse =
  CourierShipmentsCategory["getCourierServices"]["response"];
export type GetCourierAccountsParams =
  CourierShipmentsCategory["getCourierAccounts"]["params"];
export type GetCourierAccountsResponse =
  CourierShipmentsCategory["getCourierAccounts"]["response"];
export type GetLabelParams = CourierShipmentsCategory["getLabel"]["params"];
export type GetLabelResponse = CourierShipmentsCategory["getLabel"]["response"];
export type GetProtocolParams =
  CourierShipmentsCategory["getProtocol"]["params"];
export type GetProtocolResponse =
  CourierShipmentsCategory["getProtocol"]["response"];
export type GetOrderPackagesParams =
  CourierShipmentsCategory["getOrderPackages"]["params"];
export type GetOrderPackagesResponse =
  CourierShipmentsCategory["getOrderPackages"]["response"];
export type GetCourierPackagesStatusHistoryParams =
  CourierShipmentsCategory["getCourierPackagesStatusHistory"]["params"];
export type GetCourierPackagesStatusHistoryResponse =
  CourierShipmentsCategory["getCourierPackagesStatusHistory"]["response"];
export type DeleteCourierPackageParams =
  CourierShipmentsCategory["deleteCourierPackage"]["params"];
export type RequestParcelPickupParams =
  CourierShipmentsCategory["requestParcelPickup"]["params"];
export type RequestParcelPickupResponse =
  CourierShipmentsCategory["requestParcelPickup"]["response"];
export type GetRequestParcelPickupFieldsParams =
  CourierShipmentsCategory["getRequestParcelPickupFields"]["params"];
export type GetRequestParcelPickupFieldsResponse =
  CourierShipmentsCategory["getRequestParcelPickupFields"]["response"];

/* External Storages */

export type GetExternalStoragesListResponse =
  ExternalStoragesCategory["getExternalStoragesList"]["response"];
export type GetExternalStorageCategoriesParams =
  ExternalStoragesCategory["getExternalStorageCategories"]["params"];
export type GetExternalStorageCategoriesResponse =
  ExternalStoragesCategory["getExternalStorageCategories"]["response"];
export type GetExternalStorageProductsDataParams =
  ExternalStoragesCategory["getExternalStorageProductsData"]["params"];
export type GetExternalStorageProductsDataResponse =
  ExternalStoragesCategory["getExternalStorageProductsData"]["response"];
export type GetExternalStorageProductsListParams =
  ExternalStoragesCategory["getExternalStorageProductsList"]["params"];
export type GetExternalStorageProductsListResponse =
  ExternalStoragesCategory["getExternalStorageProductsList"]["response"];
export type GetExternalStorageProductsPricesParams =
  ExternalStoragesCategory["getExternalStorageProductsPrices"]["params"];
export type GetExternalStorageProductsPricesResponse =
  ExternalStoragesCategory["getExternalStorageProductsPrices"]["response"];
export type GetExternalStorageProductsQuantityParams =
  ExternalStoragesCategory["getExternalStorageProductsQuantity"]["params"];
export type GetExternalStorageProductsQuantityResponse =
  ExternalStoragesCategory["getExternalStorageProductsQuantity"]["response"];
export type UpdateExternalStorageProductsQuantityParams =
  ExternalStoragesCategory["updateExternalSotrageProcuctsQuantity"]["params"];
export type UpdateExternalStorageProductsQuantityResponse =
  ExternalStoragesCategory["updateExternalSotrageProcuctsQuantity"]["response"];

/* Order Returns */

export type GetOrderReturnJournalListParams =
  OrderReturnsCategory["getOrderReturnJournalList"]["params"];
export type GetOrderReturnJournalListResponse =
  OrderReturnsCategory["getOrderReturnJournalList"]["response"];
export type AddOrderReturnParams =
  OrderReturnsCategory["addOrderReturn"]["params"];
export type AddOrderReturnResponse =
  OrderReturnsCategory["addOrderReturn"]["response"];
export type GetOrderReturnExtraFieldsResponse =
  OrderReturnsCategory["getOrderReturnExtraFields"]["response"];
export type GetOrderReturnsParams =
  OrderReturnsCategory["getOrderReturns"]["params"];
export type GetOrderReturnsResponse =
  OrderReturnsCategory["getOrderReturns"]["response"];
export type GetOrderReturnStatusListResponse =
  OrderReturnsCategory["getOrderReturnStatusList"]["response"];
export type GetOrderReturnPaymentsHistoryParams =
  OrderReturnsCategory["getOrderReturnPaymentsHistory"]["params"];
export type GetOrderReturnPaymentsHistoryResponse =
  OrderReturnsCategory["getOrderReturnPaymentsHistory"]["response"];
export type SetOrderReturnFieldsParams =
  OrderReturnsCategory["setOrderReturnFields"]["params"];
export type AddOrderReturnProductParams =
  OrderReturnsCategory["addOrderReturnProduct"]["params"];
export type AddOrderReturnProductResponse =
  OrderReturnsCategory["addOrderReturnProduct"]["response"];
export type SetOrderReturnProductFieldsParams =
  OrderReturnsCategory["setOrderReturnProductFields"]["params"];
export type DeleteOrderReturnProductParams =
  OrderReturnsCategory["deleteOrderReturnProduct"]["params"];
export type SetOrderReturnRefundParams =
  OrderReturnsCategory["setOrderReturnRefund"]["params"];
export type GetOrderReturnReasonListResponse =
  OrderReturnsCategory["getOrderReturnReasonsList"]["response"];
export type SetOrderReturnStatusParams =
  OrderReturnsCategory["setOrderReturnStatus"]["params"];
export type SetOrderReturnStatusesParams =
  OrderReturnsCategory["setOrderReturnStatuses"]["params"];
export type RunOrderReturnMacroTriggerParams =
  OrderReturnsCategory["runOrderReturnMacroTrigger"]["params"];
export type GetOrderReturnProductStatusesResponse =
  OrderReturnsCategory["getOrderReturnProductStatuses"]["response"];

/* Orders */

export type GetJournalListParams = OrdersCategory["getJournalList"]["params"];
export type GetJournalListResponse =
  OrdersCategory["getJournalList"]["response"];
export type AddOrderParams = OrdersCategory["addOrder"]["params"];
export type AddOrderResponse = OrdersCategory["addOrder"]["response"];
export type GetOrderSourcesResponse =
  OrdersCategory["getOrderSources"]["response"];
export type GetOrderExtraFieldsResponse =
  OrdersCategory["getOrderExtraFields"]["response"];
export type GetOrdersParams = OrdersCategory["getOrders"]["params"];
export type GetOrdersResponse = OrdersCategory["getOrders"]["response"];
export type GetOrderTransactionDataParams =
  OrdersCategory["getOrderTransactionData"]["params"];
export type GetOrderTransactionDataResponse =
  OrdersCategory["getOrderTransactionData"]["response"];
export type GetOrdersByEmailParams =
  OrdersCategory["getOrdersByEmail"]["params"];
export type GetOrdersByEmailResponse =
  OrdersCategory["getOrdersByEmail"]["response"];
export type GetOrdersByPhoneParams =
  OrdersCategory["getOrdersByPhone"]["params"];
export type GetOrdersByPhoneResponse =
  OrdersCategory["getOrdersByPhone"]["response"];
export type AddInvoiceParams = OrdersCategory["addInvoice"]["params"];
export type AddInvoiceResponse = OrdersCategory["addInvoice"]["response"];
export type GetInvoicesParams = OrdersCategory["getInvoices"]["params"];
export type GetInvoicesResponse = OrdersCategory["getInvoices"]["response"];
export type GetSeriesResponse = OrdersCategory["getSeries"]["response"];
export type GetOrderStatusListResponse =
  OrdersCategory["getOrderStatusList"]["response"];
export type GetOrderPaymentsHistoryParams =
  OrdersCategory["getOrderPaymentsHistory"]["params"];
export type GetOrderPaymentsHistoryResponse =
  OrdersCategory["getOrderPaymentsHistory"]["response"];
export type GetOrderPickPackHistoryParams =
  OrdersCategory["getOrderPickPackHistory"]["params"];
export type GetOrderPickPackHistoryResponse =
  OrdersCategory["getOrderPickPackHistory"]["response"];
export type GetNewReceiptsParams = OrdersCategory["getNewReceipts"]["params"];
export type GetNewReceiptsResponse =
  OrdersCategory["getNewReceipts"]["response"];
export type GetReceiptParams = OrdersCategory["getReceipt"]["params"];
export type GetReceiptResponse = OrdersCategory["getReceipt"]["response"];
export type SetOrderFieldsParams = OrdersCategory["setOrderFields"]["params"];
export type AddOrderProductParams = OrdersCategory["addOrderProduct"]["params"];
export type AddOrderProductResponse =
  OrdersCategory["addOrderProduct"]["response"];
export type SetOrderProductFieldsParams =
  OrdersCategory["setOrderProductFields"]["params"];
export type DeleteOrderProductParams =
  OrdersCategory["deleteOrderProduct"]["params"];
export type SetOrderPaymentParams = OrdersCategory["setOrderPayment"]["params"];
export type SetOrderStatusParams = OrdersCategory["setOrderStatus"]["params"];
export type SetOrderStatusesParams =
  OrdersCategory["setOrderStatuses"]["params"];
export type SetOrderReceiptParams = OrdersCategory["setOrderReceipt"]["params"];
export type AddOrderInvoiceFileParams =
  OrdersCategory["addOrderInvoiceFile"]["params"];
export type AddOrderReceiptFileParams =
  OrdersCategory["addOrderReceiptFile"]["params"];
export type GetInvoiceFileParams = OrdersCategory["getInvoiceFile"]["params"];
export type GetInvoiceFileResponse =
  OrdersCategory["getInvoiceFile"]["response"];
export type RunOrderMacroTriggerParams =
  OrdersCategory["runOrderMacroTrigger"]["params"];

/* Products */

export type AddInventoryPriceGroupParams =
  ProductsCategory["addInventoryPriceGroup"]["params"];
export type AddInventoryPriceGroupResponse =
  ProductsCategory["addInventoryPriceGroup"]["response"];
export type UpdateInventoryPriceGroupParams =
  ProductsCategory["updateInventoryPriceGroup"]["params"];
export type UpdateInventoryPriceGroupResponse =
  ProductsCategory["updateInventoryPriceGroup"]["response"];
export type DeleteInventoryPriceGroupParams =
  ProductsCategory["deleteInventoryPriceGroup"]["params"];
export type GetInventoryPriceGroupsParams =
  ProductsCategory["getInventoryPriceGroups"]["params"];
export type GetInventoryPriceGroupsResponse =
  ProductsCategory["getInventoryPriceGroups"]["response"];
export type AddInventoryWarehouseParams =
  ProductsCategory["addInventoryWarehouse"]["params"];
export type AddInventoryWarehouseResponse =
  ProductsCategory["addInventoryWarehouse"]["response"];
export type UpdateInventoryWarehouseParams =
  ProductsCategory["updateInventoryWarehouse"]["params"];
export type UpdateInventoryWarehouseResponse =
  ProductsCategory["updateInventoryWarehouse"]["response"];
export type DeleteInventoryWarehouseParams =
  ProductsCategory["deleteInventoryWarehouse"]["params"];
export type GetInventoryWarehousesParams =
  ProductsCategory["getInventoryWarehouses"]["params"];
export type GetInventoryWarehousesResponse =
  ProductsCategory["getInventoryWarehouses"]["response"];
export type AddInventoryParams = ProductsCategory["addInventory"]["params"];
export type AddInventoryResponse = ProductsCategory["addInventory"]["response"];
export type UpdateInventoryParams =
  ProductsCategory["updateInventory"]["params"];
export type UpdateInventoryResponse =
  ProductsCategory["updateInventory"]["response"];
export type DeleteInventoryParams =
  ProductsCategory["deleteInventory"]["params"];
export type GetInventoriesParams = ProductsCategory["getInventories"]["params"];
export type GetInventoriesResponse =
  ProductsCategory["getInventories"]["response"];
export type AddInventoryCategoryParams =
  ProductsCategory["addInventoryCategory"]["params"];
export type AddInventoryCategoryResponse =
  ProductsCategory["addInventoryCategory"]["response"];
export type UpdateInventoryCategoryParams =
  ProductsCategory["updateInventoryCategory"]["params"];
export type UpdateInventoryCategoryResponse =
  ProductsCategory["updateInventoryCategory"]["response"];
export type DeleteInventoryCategoryParams =
  ProductsCategory["deleteInventoryCategory"]["params"];
export type GetInventoryCategoriesParams =
  ProductsCategory["getInventoryCategories"]["params"];
export type GetInventoryCategoriesResponse =
  ProductsCategory["getInventoryCategories"]["response"];
export type GetInventoryTagsParams =
  ProductsCategory["getInventoryTags"]["params"];
export type GetInventoryTagsResponse =
  ProductsCategory["getInventoryTags"]["response"];
export type AddInventoryManufacturerParams =
  ProductsCategory["addInventoryManufacturer"]["params"];
export type AddInventoryManufacturerResponse =
  ProductsCategory["addInventoryManufacturer"]["response"];
export type UpdateInventoryManufacturerParams =
  ProductsCategory["updateInventoryManufacturer"]["params"];
export type UpdateInventoryManufacturerResponse =
  ProductsCategory["updateInventoryManufacturer"]["response"];
export type DeleteInventoryManufacturerParams =
  ProductsCategory["deleteInventoryManufacturer"]["params"];
export type GetInventoryManufacturersParams =
  ProductsCategory["getInventoryManufacturers"]["params"];
export type GetInventoryManufacturersResponse =
  ProductsCategory["getInventoryManufacturers"]["response"];
export type GetInventoryExtraFieldsParams =
  ProductsCategory["getInventoryExtraFields"]["params"];
export type GetInventoryExtraFieldsResponse =
  ProductsCategory["getInventoryExtraFields"]["response"];
export type GetInventoryIntegrationsParams =
  ProductsCategory["getInventoryIntegrations"]["params"];
export type GetInventoryIntegrationsResponse =
  ProductsCategory["getInventoryIntegrations"]["response"];
export type GetInventoryAvailableTextFieldKeysParams =
  ProductsCategory["getInventoryAvailableTextFieldKeys"]["params"];
export type GetInventoryAvailableTextFieldKeysResponse =
  ProductsCategory["getInventoryAvailableTextFieldKeys"]["response"];
export type AddInventoryProductParams =
  ProductsCategory["addInventoryProduct"]["params"];
export type AddInventoryProductResponse =
  ProductsCategory["addInventoryProduct"]["response"];
export type UpdateInventoryProductParams =
  ProductsCategory["updateInventoryProduct"]["params"];
export type UpdateInventoryProductResponse =
  ProductsCategory["updateInventoryProduct"]["response"];
export type DeleteInventoryProductParams =
  ProductsCategory["deleteInventoryProduct"]["params"];
export type GetInventoryProductsDataParams =
  ProductsCategory["getInventoryProductsData"]["params"];
export type GetInventoryProductsDataResponse =
  ProductsCategory["getInventoryProductsData"]["response"];
export type GetInventoryProductsListParams =
  ProductsCategory["getInventoryProductsList"]["params"];
export type GetInventoryProductsListResponse =
  ProductsCategory["getInventoryProductsList"]["response"];
export type GetInventoryProductsStockParams =
  ProductsCategory["getInventoryProductsStock"]["params"];
export type GetInventoryProductsStockResponse =
  ProductsCategory["getInventoryProductsStock"]["response"];
export type UpdateInventoryProductsStockParams =
  ProductsCategory["updateInventoryProductsStock"]["params"];
export type UpdateInventoryProductsStockResponse =
  ProductsCategory["updateInventoryProductsStock"]["response"];
export type GetInventoryProductsPricesParams =
  ProductsCategory["getInventoryProductsPrices"]["params"];
export type GetInventoryProductsPricesResponse =
  ProductsCategory["getInventoryProductsPrices"]["response"];
export type UpdateInventoryProductsPricesParams =
  ProductsCategory["updateInventoryProductsPrices"]["params"];
export type UpdateInventoryProductsPricesResponse =
  ProductsCategory["updateInventoryProductsPrices"]["response"];
export type GetInventoryProductLogsParams =
  ProductsCategory["getInventoryProductLogs"]["params"];
export type GetInventoryProductLogsResponse =
  ProductsCategory["getInventoryProductLogs"]["response"];
export type RunProductMacroTriggerParams =
  ProductsCategory["runProductMacroTrigger"]["params"];

/* Warehouse Documents */

export type GetInventoryDocumentsParams =
  WarehouseDocumentsCategory["getInventoryDocuments"]["params"];
export type GetInventoryDocumentsResponse =
  WarehouseDocumentsCategory["getInventoryDocuments"]["response"];
export type GetInventoryDocumentItemsParams =
  WarehouseDocumentsCategory["getInventoryDocumentItems"]["params"];
export type GetInventoryDocumentItemsResponse =
  WarehouseDocumentsCategory["getInventoryDocumentItems"]["response"];
export type GetInventoryDocumentSeriesResponse =
  WarehouseDocumentsCategory["getInventoryDocumentSeries"]["response"];

/* Warehouse Purchase Orders */

export type GetInventoryPurchaseOrdersParams =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrders"]["params"];
export type GetInventoryPurchaseOrdersResponse =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrders"]["response"];
export type GetInventoryPurchaseOrderItemsParams =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrderItems"]["params"];
export type GetInventoryPurchaseOrderItemsResponse =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrderItems"]["response"];
export type GetInventoryPurchaseOrderSeriesParams =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrderSeries"]["params"];
export type GetInventoryPurchaseOrderSeriesResponse =
  WarehousePurchaseOrdersCategory["getInventoryPurchaseOrderSeries"]["response"];
