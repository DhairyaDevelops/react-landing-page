import test from "node:test";
import assert from "node:assert/strict";
import {
  createBrief,
  validateBrief,
  projectTypes,
  priorities,
} from "../src/brief.js";

const valid = {
  projectType: "Product launch",
  priority: "Explain the offer",
  goal: "Explain a new planning tool clearly.",
};

test("valid input produces a four-section project outline", () => {
  const result = createBrief(valid);
  assert.deepEqual(result.errors, {});
  assert.equal(result.brief.sections.length, 4);
  assert.equal(result.brief.goal, valid.goal);
});
test("every project type and priority is accepted", () => {
  for (const projectType of projectTypes)
    for (const priority of priorities) {
      assert.deepEqual(validateBrief({ ...valid, projectType, priority }), {});
    }
});
test("missing or unknown choices are rejected", () => {
  assert.deepEqual(
    Object.keys(
      validateBrief({ ...valid, projectType: "", priority: "Unknown" }),
    ),
    ["projectType", "priority"],
  );
});
test("blank and too-short goals are rejected", () => {
  for (const goal of ["", "   ", "Short goal", null, undefined]) {
    assert.ok(validateBrief({ ...valid, goal }).goal);
  }
});
test("12- and 180-character trimmed goals pass; 181 fails", () => {
  for (const length of [12, 180])
    assert.equal(
      validateBrief({ ...valid, goal: "x".repeat(length) }).goal,
      undefined,
    );
  assert.ok(validateBrief({ ...valid, goal: "x".repeat(181) }).goal);
});
test("invalid input cannot produce an outline", () => {
  const result = createBrief({ projectType: "", priority: "", goal: "" });
  assert.equal(result.brief, null);
  assert.equal(Object.keys(result.errors).length, 3);
});
test("output trims whitespace and does not mutate the input", () => {
  const input = Object.freeze({ ...valid, goal: `  ${valid.goal}  ` });
  assert.equal(createBrief(input).brief.goal, valid.goal);
  assert.equal(input.goal, `  ${valid.goal}  `);
});
test("different project types produce relevant, separate outlines", () => {
  const portfolio = createBrief({
    ...valid,
    projectType: "Personal portfolio",
  }).brief;
  const service = createBrief({
    ...valid,
    projectType: "Service business",
  }).brief;
  assert.ok(portfolio.sections.includes("Selected work"));
  assert.ok(service.sections.includes("Services"));
  assert.notDeepEqual(portfolio.sections, service.sections);
});
