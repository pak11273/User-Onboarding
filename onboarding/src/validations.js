import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("a name is required")
    .min(6, "name needs to be at least 6 chars"),
  email: yup.string().email("a valid email address is required"),
  password: yup.string().required("a password is required"),
  terms: yup.boolean().oneOf([true], "you must agree to the terms"),
});
