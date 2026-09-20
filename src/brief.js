export const projectTypes = [
  "Product launch",
  "Service business",
  "Personal portfolio",
];
export const priorities = [
  "Explain the offer",
  "Show the work",
  "Encourage an enquiry",
];

/** Validate only non-sensitive demo inputs. This module has no I/O or storage. */
export function validateBrief(values) {
  const errors = {};
  if (!projectTypes.includes(values.projectType))
    errors.projectType = "Choose a project type.";
  if (!priorities.includes(values.priority))
    errors.priority = "Choose a main priority.";
  if (typeof values.goal !== "string" || values.goal.trim().length < 12) {
    errors.goal = "Add a sample goal with at least 12 characters.";
  } else if (values.goal.trim().length > 180) {
    errors.goal = "Keep your sample goal to 180 characters or fewer.";
  }
  return errors;
}

export function createBrief(values) {
  const errors = validateBrief(values);
  if (Object.keys(errors).length) return { errors, brief: null };
  const sections = {
    "Product launch": [
      "Value proposition",
      "Product features",
      "How it works",
      "Next step",
    ],
    "Service business": [
      "Clear introduction",
      "Services",
      "Approach and FAQs",
      "Next step",
    ],
    "Personal portfolio": [
      "Introduction",
      "Selected work",
      "About and skills",
      "Next step",
    ],
  };
  return {
    errors: {},
    brief: {
      projectType: values.projectType,
      priority: values.priority,
      goal: values.goal.trim(),
      sections: sections[values.projectType],
    },
  };
}
