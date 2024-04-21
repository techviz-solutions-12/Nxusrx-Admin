import React, { useEffect } from "react";
import AuthLayout from "../../shared/components/authLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword } from "../../services/auth";

import { ClipLoader } from "react-spinners";

const ResetPassword = () => {
  let params = useParams();
  const uniqueString = params?.uniqueString;
  const history = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.auth?.resetPassword?.loading);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, { resetForm }) => {
        values.uniqueString = uniqueString;
        dispatch(
          createNewPassword(values, history, function (res) {
            if (res) {
              resetForm();
            }
          })
        );
      }}
      validationSchema={Schema}
    >
      {(props) => (
        <AuthLayout>
          <Box pb={4}>
            <Typography variant="h4" gutterBottom>
              Reset Password
            </Typography>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              No worries, We'll send you password reset instruction on your
              email
            </Typography>
          </Box>
          <form autoComplete="off" onSubmit={props.handleSubmit}>
            <Box
              py={2}
              sx={{
                "& .MuiTextField-root": { my: 2 },
              }}
            >
              <TextField
                fullWidth
                placeholder="password"
                value={props.values.password}
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="password"
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
                required
              />
              <TextField
                fullWidth
                placeholder="Confirm Password"
                value={props.values.passwordConfirm}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                name="passwordConfirm"
                error={
                  props?.touched?.passwordConfirm &&
                  Boolean(props?.errors?.passwordConfirm)
                }
                type="password"
                helperText={
                  props?.touched?.passwordConfirm &&
                  props?.errors?.passwordConfirm
                }
                required
              />
            </Box>
            <Button
              disabled={loading}
              className="containedPrimary"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={props?.handleSubmit}
            >
              {loading ? (
                <ClipLoader size={25} color="white" loading />
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
            <Button
              variant="text"
              onClick={() => history("/login", { replace: true })}
            >
              <ArrowBack /> Back to Login
            </Button>
          </Box>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default ResetPassword;
