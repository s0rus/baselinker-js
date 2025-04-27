![baselinker-js](.github/assets/banner.jpg "baselinker-js")

## Installation

Install the package using your preferred package manager:

```bash
bun add baselinker-js

# or

pnpm add baselinker-js

# or

yarn add baselinker-js

# or

npm install baselinker-js
```

## Usage

Define a baselinker client, and provide your BaseLinker API key:

```typescript
// src/lib/baselinker.ts
import { createBaselinkerClient } from "baselinker-js";

const bl = createBaselinkerClient({
  apiKey: "YOUR_API_KEY",
});

export { bl };
```

Now you can use the client to interact with the BaseLinker API:

```typescript
try {
  const query = await bl.products.getInventories();

  if (query.status === "ERROR") {
    throw new Error(query.error_message);
  }

  query.inventories.forEach((inventory) => {
    console.log(inventory);
  });
} catch (error) {
  console.error(error);
}
```

## Documentation & API Reference

Entire structure and types of the client methods are based on the [BaseLinker API documentation](https://api.baselinker.com/).

> Note: The client is updated up to **2025-04-23** version of the API.
>
> You can also find the official [BaseLinker API changelog](https://api.baselinker.com/?changelog) to check for any changes.

The following functions have been added that aren't in the BaseLinker API for more explicit code:

| Function                      | Description                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `updateInventoryPriceGroup`   | Works exactly the same as `addInventoryPriceGroup` but is more explicit in naming and expects a `price_group_id` parameter.    |
| `updateInventoryWarehouse`    | Works exactly the same as `addInventoryWarehouse` but is more explicit in naming and expects a `warehouse_id` parameter.       |
| `updateInventory`             | Works exactly the same as `addInventory` but is more explicit in naming and expects an `inventory_id` parameter.               |
| `updateInventoryCategory`     | Works exactly the same as `addInventoryCategory` but is more explicit in naming and expects a `category_id` parameter.         |
| `updateInventoryManufacturer` | Works exactly the same as `addInventoryManufacturer` but is more explicit in naming and expects a `manufacturer_id` parameter. |
| `updateInventoryProduct`      | Works exactly the same as `addInventoryProduct` but is more explicit in naming and expects a `product_id` parameter.           |
