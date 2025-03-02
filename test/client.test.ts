import { describe, expect, it } from "bun:test";
import { createBaselinkerClient } from "../src/index";

describe("Baselinker client", () => {
  it("should throw when apiKey is not provided", () => {
    // @ts-expect-error - testing empty baselinker
    expect(() => createBaselinkerClient({})).toThrow(
      "Baselinker API key is required",
    );
  });
});
