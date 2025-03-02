import type { BaselinkerConnectCategory } from "./baselinker-connect.js";
import type { CourierShipmentsCategory } from "./courier-shipments.js";
import type { OrderReturnsCategory } from "./order-returns.js";
import type { OrdersCategory } from "./orders.js";
import type { ProductsCategory } from "./products.js";
import type { WarehouseDocumentsCategory } from "./warehouse-documents.js";

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
  orders: OrdersCategory;
  orderReturns: OrderReturnsCategory;
  courierShipments: CourierShipmentsCategory;
  baselinkerConnect: BaselinkerConnectCategory;
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
    ? () => Promise<
        | Prettify<BaselinkerFetchSuccess<ResponseOf<C, M>>>
        | Prettify<BaselinkerFetchError>
      >
    : (
        params: MethodsByCategory[C][M] extends { params: infer P } ? P : never,
      ) => Promise<
        | Prettify<BaselinkerFetchSuccess<ResponseOf<C, M>>>
        | Prettify<BaselinkerFetchError>
      >;
};

export const VALID_CATEGORIES: Array<keyof MethodsByCategory> = [
  "products",
  "orders",
  "orderReturns",
  "courierShipments",
  "warehouseDocuments",
  "baselinkerConnect",
];

type HasVoidParams<
  C extends Category,
  M extends MethodsOf<C>,
> = MethodsByCategory[C][M] extends { params: void } ? true : false;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
