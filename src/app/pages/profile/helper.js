import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  address: "",
  file: null,
};
export const Schema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "First Name must be at least 3 characters.")
    .required(" First Name is required!"),
  last_name: Yup.string()
    .min(3, "Last Name must be at least 3 characters.")
    .required(" Last Name is required"),
  phone_number: Yup.string().required("phone number is required"),
  address: Yup.string().required("Address is required"),
  // company_name: Yup.string()
  //   .min(3, "Name must be at least 3 characters.")
  //   .required(" Company Name is required!"),
  // department: Yup.string().required("Department Name is required"),
  // country: Yup.string().required("Country is required"),
  // province: Yup.string().required("Province is required"),
  file: Yup.mixed()
    .nullable()
    .required()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
