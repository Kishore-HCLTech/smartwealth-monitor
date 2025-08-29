// src/validation/formSchema.ts
import * as yup from "yup";

export const formSchema = yup.object().shape({
  income: yup
    .number()
    .typeError("Income must be a number")
    .required("Income is required")
    .min(0, "Income must be at least 0"),

  expenses: yup
    .number()
    .typeError("Expenses must be a number")
    .required("Expenses are required")
    .min(0, "Expenses must be at least 0"),

  dependents: yup
    .number()
    .typeError("Dependents must be a number")
    .required("Dependents are required")
    .min(0, "Must be at least 0"),

  creditScore: yup
    .number()
    .required("Credit score is required")
    .min(300, "Minimum credit score is 300")
    .max(850, "Maximum credit score is 850"),
});
