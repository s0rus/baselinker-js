import { ProductCategory } from "../../src/types/products";

export function mockAddInventoryPriceGroup(
  params: ProductCategory["addInventoryPriceGroup"]["params"],
) {
  if (params.name && params.currency && params.description) {
    return Promise.resolve(
      new Response(
        JSON.stringify({
          status: "SUCCESS",
          price_group_id: 1,
        }),
      ),
    );
  }

  return Promise.resolve(
    new Response(
      JSON.stringify({
        status: "ERROR",
        error_message: "Missing required parameters",
        error_code: 400,
      }),
    ),
  );
}

export function mockUpdateInventoryPriceGroup(
  params: ProductCategory["updateInventoryPriceGroup"]["params"],
) {
  if (
    params.price_group_id &&
    params.name &&
    params.description &&
    params.currency
  ) {
    return Promise.resolve(
      new Response(
        JSON.stringify({
          status: "SUCCESS",
          price_group_id: 1,
        }),
      ),
    );
  }

  return Promise.resolve(
    new Response(
      JSON.stringify({
        status: "ERROR",
        error_message: "Missing required parameters",
        error_code: 400,
      }),
    ),
  );
}

export function mockDeleteInventoryPriceGroup(
  params: ProductCategory["deleteInventoryPriceGroup"]["params"],
) {
  if (params.price_group_id) {
    return Promise.resolve(
      new Response(
        JSON.stringify({
          status: "SUCCESS",
        }),
      ),
    );
  }

  return Promise.resolve(
    new Response(
      JSON.stringify({
        status: "ERROR",
        error_message: "Missing required parameters",
        error_code: 400,
      }),
    ),
  );
}
