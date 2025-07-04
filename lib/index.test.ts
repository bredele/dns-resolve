import { test } from "node:test";
import * as assert from "node:assert";
import resolve from ".";

test("resolves valid hostname", async () => {
  const result = await resolve("google.com");
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(typeof result[0] === "string");
});

test("resolves with explicit A record type", async () => {
  const result = await resolve("google.com", "A");
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(typeof result[0] === "string");
});

test("accepts timeout option", async () => {
  // This test verifies the timeout option is accepted without error
  // DNS resolution will likely fail before timeout in test environment
  await assert.rejects(resolve("test.invalid", "A", { timeout: 1000 }), Error);
});

test("resolves with custom DNS server", async () => {
  const result = await resolve("google.com", "A", { servers: ["8.8.8.8"] });
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(typeof result[0] === "string");
});

test("resolves with multiple DNS servers", async () => {
  const result = await resolve("google.com", "A", { 
    servers: ["8.8.8.8", "8.8.4.4"] 
  });
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(typeof result[0] === "string");
});

test("uses retry option", async () => {
  // Test with invalid domain and retries
  await assert.rejects(
    resolve("nonexistent.invalid", "A", { tries: 2 }),
    Error
  );
});

test("uses default servers when empty array", async () => {
  const result = await resolve("google.com", "A", { servers: [] });
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
  assert.ok(typeof result[0] === "string");
});
