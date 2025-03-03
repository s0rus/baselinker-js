import { describe, expect, it } from "bun:test";
import { createBaselinkerClient } from "../src/index";

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
});
