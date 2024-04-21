import React, { useState, useRef } from "react";
import "./profile.scss";
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "../../assets/images/avatar.png";
import ChangePassword from "../../assets/images/password.svg";
import InputMask from "react-input-mask";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { useSelector, useDispatch } from "react-redux";
import List from "@mui/material/List";

import PreviewImage from "./PreviewImage";
import FErrorMessage from "../../shared/components/FErrorMessage";
import { getUpdateProfileDetails } from "../../services/combinedAuth";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";

export const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.updateProfile.loading);
  const response = useSelector((state) => state.auth.userLogin.response);

  return (
    <Formik
      initialValues={response.data ? response.data : initialValues}
      enableReinitialize={true}
      onSubmit={(values, { resetForm }) => {
        try {
          dispatch(getUpdateProfileDetails(values, toast));
        } catch (e) {}
      }}
      validationSchema={Schema}
    >
      {(props) => (
        <>
          <Card>
            <CardContent>
              <Typography variant="h5">Edit Profile</Typography>
              <Grid
                container
                alignItems="center"
                p={3}
                sx={{ height: "calc(100% - 20px)", overflow: "auto" }}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" gutterBottom mb={3}>
                    John Doe
                  </Typography>
                  {props.values.file && (
                    <PreviewImage file={props.values.file} />
                  )}
                  <input
                    hidden
                    type="file"
                    onChange={(e) => {
                      props.setFieldValue("file", e.target.files[0]);
                    }}
                    ref={fileRef}
                  />

                  <Button
                    sx={{ marginTop: "30px" }}
                    variant="contained"
                    className="containedPrimary"
                    onClick={() => fileRef.current.click()}
                  >
                    Change Image
                  </Button>
                  <FErrorMessage name="file" />
                  <List sx={{ marginTop: "40px" }}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                          <img src={ChangePassword} width="24px" />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid container spacing={3} mt={3}>
                    <Grid item xs={12} mt={3}>
                      <Typography color="text.primary" variant="h6">
                        User Information
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={props.values.first_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="first_name"
                        error={
                          props.touched.first_name &&
                          Boolean(props.errors.first_name)
                        }
                        helperText={
                          props.touched.first_name && props.errors.first_name
                        }
                        variant="filled"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={props.values.last_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="last_name"
                        error={
                          props.touched.last_name &&
                          Boolean(props.errors.last_name)
                        }
                        helperText={
                          props.touched.last_name && props.errors.last_name
                        }
                        variant="filled"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <InputMask
                        mask="+9 999 9999999"
                        name="phone_number"
                        autoComplete="phone_number"
                        variant="filled"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.phone_number}
                        required
                      >
                        {() => (
                          <TextField
                            fullWidth
                            label="Phone"
                            name="phone_number"
                            variant="filled"
                            value={props.values.phone_number}
                            error={
                              props.touched.phone_number &&
                              Boolean(props.errors.phone_number)
                            }
                            helperText={
                              props.touched.phone_number &&
                              props.errors.phone_number
                            }
                            required
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        value={props.values.address}
                        label="Address"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        variant="filled"
                        name="address"
                        error={
                          props.touched.address && Boolean(props.errors.address)
                        }
                        helperText={
                          props.touched.address && props.errors.address
                        }
                      />
                    </Grid>
                    <Grid item xs={12} mt={3}>
                      <Typography color="text.primary" variant="h6">
                        Company Information
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="company_name"
                        value={response?.data?.company?.company_name}
                        disabled
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        variant="filled"
                        value={response?.data?.department?.name}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        variant="filled"
                        value={response?.data?.company.country}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        fullWidth
                        label="Province"
                        name="province"
                        variant="filled"
                        value={response.data?.company?.province}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions dir={"rtl"}>
              <ButtonGroup
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  "& > *": {
                    mx: 2,
                  },
                }}
              >
                <Button
                  variant="contained"
                  className="containedPrimary"
                  id="long-button"
                  aria-haspopup="true"
                  onClick={props.handleSubmit}
                >
                  {loading ? (
                    <ClipLoader size={25} color="white" loading />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <ToastContainer />
                <Button
                  variant="contained"
                  className="containedDefault"
                  id="long-button"
                  aria-haspopup="true"
                  onClick={() => props.resetForm()}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </CardActions>
          </Card>
        </>
      )}
    </Formik>
  );
};

export default Profile;
