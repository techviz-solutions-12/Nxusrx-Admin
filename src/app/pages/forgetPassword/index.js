import React from "react";
import AuthLayout from "../../shared/components/authLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, TextField} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {Formik} from "formik";
import {initialValues, Schema} from "./helper";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../services/auth";
import {ClipLoader} from "react-spinners";


const ForgetPassword = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) => state?.auth?.forgotPassword?.loading
    );


    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, {resetForm}) => {

                dispatch(forgotPassword(values, function (res) {
                    if (res) {
                        resetForm();
                    }
                }));


            }}
            validationSchema={Schema}
        >
            {(props) => (
                <AuthLayout>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Forget Password
                        </Typography>
                        <Typography color="text.secondary" variant="body2" gutterBottom>
                            No worries, We'll send you password reset instruction on your
                            email
                        </Typography>
                        <form autoComplete="off" onSubmit={props.handleSubmit}>
                            <Box py={2} my={2}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your Email"
                                    name="email"
                                    type="email"
                                    required
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                    value={props.values.email}
                                    error={props.touched.email && Boolean(props.errors.email)}
                                    helperText={props.touched.email && props.errors.email}
                                />
                            </Box>
                            <Button
                                className="containedPrimary"
                                variant="contained"
                                sx={{width: "100%", marginTop: "30px"}}
                                onClick={props.handleSubmit}
                            >
                                {loading ? (
                                    <ClipLoader size={25} color="white" loading/>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                         
                        </form>
                        <Box
                            pt={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button variant="text" onClick={() => history("/login", {replace: true})}>
                                <ArrowBack/> Back to Login
                            </Button>
                        </Box>
                    </Box>
                </AuthLayout>
            )}

        </Formik>

    );
};

export default ForgetPassword;
