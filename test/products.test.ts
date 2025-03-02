import { describe, expect, test } from "bun:test";
import { mockFetch } from "./test-setup";
import { createBaselinkerClient } from "../src/index";
import {
  mockAddInventoryPriceGroup,
  mockDeleteInventoryPriceGroup,
  mockUpdateInventoryPriceGroup,
} from "./mocks/product";

describe("Product category", () => {
  const client = createBaselinkerClient({
    apiKey: "test-api-key",
  });

  test("addInventoryPriceGroup - success", async () => {
    mockFetch.mockReturnValueOnce(
      mockAddInventoryPriceGroup({
        name: "test-category",
        currency: "USD",
        description: "test-description",
      }),
    );

    const data = await client.products.addInventoryPriceGroup({
      name: "test-category",
      currency: "USD",
      description: "test-description",
    });

    expect(data.status).toBe("SUCCESS");
    if (data.status === "SUCCESS") {
      expect(data.price_group_id).toBe(1);
    }
  });

  test("addInventoryPriceGroup - missing required parameters", async () => {
    mockFetch.mockReturnValueOnce(
      mockAddInventoryPriceGroup({
        name: "test-category",
        currency: "USD",
        description: "",
      }),
    );

    const data = await client.products.addInventoryPriceGroup({
      name: "test-category",
      currency: "USD",
      description: "",
    });

    expect(data.status).toBe("ERROR");
  });

  test("updateInventoryPriceGroup - success", async () => {
    mockFetch.mockReturnValueOnce(
      mockUpdateInventoryPriceGroup({
        price_group_id: 1,
        name: "test-category",
        currency: "USD",
        description: "test-description",
      }),
    );

    const data = await client.products.updateInventoryPriceGroup({
      price_group_id: 1,
      name: "test-category",
      currency: "USD",
      description: "test-description",
    });

    expect(data.status).toBe("SUCCESS");
    if (data.status === "SUCCESS") {
      expect(data.price_group_id).toBe(1);
    }
  });

  test("updateInventoryPriceGroup - missing required parameters", async () => {
    mockFetch.mockReturnValueOnce(
      mockUpdateInventoryPriceGroup({
        name: "test-category",
        currency: "USD",
        description: "test-description",
      }),
    );

    // @ts-expect-error - testing missing required parameters
    const data = await client.products.updateInventoryPriceGroup({
      name: "test-category",
      currency: "USD",
      description: "test-description",
    });

    expect(data.status).toBe("ERROR");
  });

  test("deleteInventoryPriceGroup - success", async () => {
    mockFetch.mockReturnValueOnce(
      mockDeleteInventoryPriceGroup({
        price_group_id: 1,
      }),
    );

    const data = await client.products.deleteInventoryPriceGroup({
      price_group_id: 1,
    });

    expect(data.status).toBe("SUCCESS");
  });

  test("deleteInventoryPriceGroup - missing required parameters", async () => {
    mockFetch.mockReturnValueOnce(mockDeleteInventoryPriceGroup({}));

    // @ts-expect-error - testing missing required parameters
    const data = await client.products.deleteInventoryPriceGroup({});

    expect(data.status).toBe("ERROR");
  });
});
