import * as Yup from "yup";

export const initialValues = {
    password: "",
    passwordConfirm: ""
};
export const Schema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
        .required("Confirm pasword required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
});
