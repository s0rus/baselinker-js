import { mock, beforeEach, afterAll } from "bun:test";

export const mockFetch = mock();

global.fetch = mockFetch;
mock.module("node-fetch", () => mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

afterAll(() => {
  mockFetch.mockRestore();
});
