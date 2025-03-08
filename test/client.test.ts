import { describe, expect, it } from "bun:test";
import { createBaselinkerClient } from "../src/index";
import { mockFetch } from "./test-setup";
import { BASELINKER_API_URL } from "../src/internal/utils";

describe("Baselinker client", () => {
  it("should throw when apiKey is not provided", () => {
    // @ts-expect-error - testing empty baselinker
    expect(() => createBaselinkerClient({})).toThrow(
      "Baselinker API key is required",
    );
  });

  const bl = createBaselinkerClient({
    apiKey: "bl-api-key",
  });

  it("should throw when wrong category is used", () => {
    // @ts-expect-error - testing wrong category
    expect(() => bl.wrongCategory.wrongMethod()).toThrow();
  });

  it("should throw when wrong method is used", () => {
    // @ts-expect-error - testing wrong method
    expect(() => bl.products.wrongMethod()).toThrow();
  });

  it("should fetch data with correct headers, method and params", async () => {
    mockFetch.mockReset();

    mockFetch.mockReturnValueOnce(
      Promise.resolve(
        new Response(
          JSON.stringify({
            status: "SUCCESS",
            documents: [],
          }),
        ),
      ),
    );

    await bl.warehouseDocuments.getInventoryDocuments({ page: 1 });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      BASELINKER_API_URL,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-BLToken": "bl-api-key",
        },
        body: expect.stringContaining(
          "method=getInventoryDocuments&parameters=%7B%22page%22%3A1%7D",
        ),
      }),
    );
  });
});
