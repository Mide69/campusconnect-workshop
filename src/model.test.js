import test from "node:test";
import assert from "node:assert/strict";
import { opportunities } from "./data.js";
import {
  readState,
  selectOpportunities,
  validateListing,
  writeState,
} from "./model.js";

test("search, category and remote filters work together without mutating input", () => {
  const result = selectOpportunities(opportunities, {
    query: "frontend",
    category: "Internship",
    remoteOnly: true,
  });
  assert.deepEqual(
    result.map((item) => item.id),
    ["sample-5"],
  );
  const originalOrder = opportunities.map((item) => item.id);
  selectOpportunities(opportunities, { sort: "deadline" });
  assert.deepEqual(
    opportunities.map((item) => item.id),
    originalOrder,
  );
});

test("saved view only returns saved items and supports empty states", () => {
  assert.equal(
    selectOpportunities(opportunities, { savedOnly: true, saved: [] }).length,
    0,
  );
  assert.deepEqual(
    selectOpportunities(opportunities, {
      savedOnly: true,
      saved: ["sample-3"],
    }).map((item) => item.id),
    ["sample-3"],
  );
  assert.equal(
    selectOpportunities(opportunities, { query: "no such listing" }).length,
    0,
  );
});

test("corrupted or inaccessible browser storage recovers safely", () => {
  assert.deepEqual(readState({ getItem: () => "{broken" }), {
    listings: [],
    saved: [],
  });
  const blocked = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("full");
    },
  };
  assert.deepEqual(readState(blocked), { listings: [], saved: [] });
  assert.equal(writeState(blocked, { listings: [], saved: [] }), false);
});

test("added listings and bookmarks survive persistence and invalid records are discarded", () => {
  let value;
  const storage = {
    getItem: () => value,
    setItem: (_key, next) => {
      value = next;
    },
  };
  const listing = {
    ...opportunities[0],
    id: "custom-1",
    title: "Student-created listing",
  };
  assert.equal(
    writeState(storage, {
      listings: [listing, { id: "bad" }],
      saved: ["custom-1", "custom-1", "missing"],
    }),
    true,
  );
  assert.deepEqual(readState(storage), {
    listings: [listing],
    saved: ["custom-1"],
  });
});

test("form validation rejects whitespace, invalid dates and past deadlines", () => {
  assert.ok(validateListing({ ...opportunities[0], title: "   " }).title);
  assert.ok(
    validateListing({ ...opportunities[0], deadline: "2000-01-01" }).deadline,
  );
  assert.ok(
    validateListing({ ...opportunities[0], deadline: "invalid" }).deadline,
  );
  assert.deepEqual(
    validateListing({ ...opportunities[0], deadline: "2099-12-31" }),
    {},
  );
});
