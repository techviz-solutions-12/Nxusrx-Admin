import React, { useEffect, useState } from "react";
import "./pharmay.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { ImageGroup, Image } from "react-fullscreen-image";
import {
  getAdminBusinessList,
  updateAdminBusinessStatus,
  getAdminBusiness,
} from "../../services/business";
import { sendReUploadLink } from "../../services/dasboard";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

// const images = [medicine, avatar];
const ProductDetail = ({
  open,
  onClose,
  business,
  page,
  search,
  limit,
  modId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const response = useSelector((state) => state?.business?.business?.response);
  const loading = useSelector((state) => state?.business?.business?.loading);

  const updateLoading = useSelector(
    (state) => state?.business?.updateBusinessStatus?.loading
  );
  const linkLoading = useSelector(
    (state) => state?.dashboard?.reUploadDocs?.loading
  );

  const [btnName, setBtnName] = useState("");
  const [state, setState] = useState({
    buiness: {},
  });

  useEffect(() => {
    dispatch(getAdminBusiness(business));
  }, [business]);

  useEffect(() => {
    setState({ ...state, buiness: response });
  }, [response]);

  // const images = [medicine, avatar];
  let images = [
    state?.buiness?.default_store?.documents?.front_picture,
    state?.buiness?.default_store?.documents?.back_picture,
  ];

  const updatePharmacyStatus = (status, btn) => {
    setBtnName(btn);
    dispatch(
      updateAdminBusinessStatus({ status }, business, function (res) {
        if (res) {
          toast.success(`Business status hase been changed to ${status}`);
          setTimeout(() => {
            dispatch(getAdminBusiness(business));
            dispatch(
              getAdminBusinessList(
                search ? search : "",
                "",
                page,
                limit,
                function (res) {}
              )
            );
            setBtnName("");
          }, 100);
        }
      })
    );
  };

  const handleSendLink = () => {
    dispatch(sendReUploadLink(state?.buiness?.default_store?._id));
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="admin-modal"
    >
      <Box className="modal-mui">
        {loading ? (
          <Box sx={{ position: "absolute", top: "45%", left: "46%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container>
              <Grid item md={12} sm={12} xs={12}>
                {" "}
                <Box className="modal-header-mui">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Business Details
                  </Typography>
                  <IconButton
                    className="modal-clear-btn"
                    onClick={() => {
                      onClose();
                      modId && navigate("/businesses");
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <Divider />
                </Box>
              </Grid>{" "}
            </Grid>

            <Box className="modal-content-mui-business">
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <Grid container xs={12} spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Business
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6} pt={0}>
                      <Box>
                        <Typography
                          variant="body2"
                          mr={2}
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Business Name
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.business_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Email
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.email}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Mobile NO#
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.mobile_no}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Status
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.status}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Country
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.country}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          City
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.city}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography
                        mt={3}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Default Store
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ padding: "0px" }}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Store Name
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.store_name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Email
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.email}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Mobile N0#
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.mobile_no}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Store Type
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.type}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          status
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.status}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          Country
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.country}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Box mt={2}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#7E7E7E", fontWeight: "500" }}
                        >
                          City
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "500" }}>
                          {state?.buiness?.default_store?.city}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid container xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Documents
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={12}>
                      {" "}
                      {state?.buiness &&
                      state?.buiness?.default_store?.documents ? (
                        <>
                          {images.map((el) => (
                            <Box
                              key={uuidv4()}
                              variant="body"
                              className="image-view"
                            >
                              <ImageGroup>
                                <ul className="images">
                                  <li key={uuidv4()}>
                                    <Image src={el} />
                                  </li>
                                </ul>
                              </ImageGroup>
                            </Box>
                          ))}
                        </>
                      ) : (
                        <Typography variant="body">
                          No Document Found
                        </Typography>
                      )}
                      <input hidden type="file" />
                    </Grid>
                    {/* <Grid item xs={6} sm={12}>
                      {state?.buiness &&
                      state?.buiness?.default_pharmacy?.documents &&
                      state?.buiness?.default_pharmacy?.documents
                        ?.back_picture ? (
                        <Box variant="body" className="image-view">
                          <ImageGroup>
                            <ul className="images">
                              {images.map((i) => (
                                <li key={i}>
                                  <Image
                                    src={
                                      state?.buiness?.default_pharmacy
                                        ?.documents?.back_picture
                                    }
                                    alt="nature"
                                  />
                                </li>
                              ))}
                            </ul>
                          </ImageGroup>
                          <img
                            src={
                              state?.buiness?.default_pharmacy?.documents
                                ?.back_picture
                            }
                          />
                        </Box>
                      ) : (
                        <Typography variant="body">
                          No Document Found
                        </Typography>
                      )}
                      <input hidden type="file" />
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box className="modal-footer-mui">
              <ButtonGroup
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  "& > *": {
                    mx: 3,
                  },
                }}
              >
                {state?.buiness?.status == "suspended" && (
                  <Button
                    variant="contained"
                    className="containedPrimary"
                    onClick={() =>
                      updatePharmacyStatus("approved", "Approve Store")
                    }
                  >
                    {updateLoading && btnName == "Approve Store" ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      "Unsuspend"
                    )}
                  </Button>
                )}

                {state?.buiness?.status == "rejected" ? (
                  <>
                    <Button
                      variant="contained"
                      className="containedPrimary"
                      onClick={() =>
                        updatePharmacyStatus("approved", "Approve Store")
                      }
                    >
                      {updateLoading && btnName == "Approve Store" ? (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        "Approve Store"
                      )}
                    </Button>
                    <Button
                      variant="contained"
                      className="containedPrimary"
                      onClick={() => handleSendLink()}
                    >
                      {linkLoading ? (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        "Send ReUpload Documents Link"
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <>
                      {state?.buiness?.status == "pending" && (
                        <>
                          <Button
                            variant="contained"
                            className="containedPrimary"
                            onClick={() =>
                              updatePharmacyStatus("approved", "Approve")
                            }
                          >
                            {updateLoading && btnName == "Approve" ? (
                              <Box sx={{ display: "flex" }}>
                                <CircularProgress />
                              </Box>
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="contained"
                            className="contained
                        Primary"
                            onClick={() =>
                              updatePharmacyStatus("rejected", "Reject")
                            }
                          >
                            {updateLoading && btnName == "Reject" ? (
                              <Box sx={{ display: "flex" }}>
                                <CircularProgress />
                              </Box>
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </>
                      )}

                      {
                        state?.buiness?.status == "approved" ? (
                          <Button
                            variant="contained"
                            className="contained
                        Primary"
                            onClick={() =>
                              updatePharmacyStatus("suspended", "Suspend")
                            }
                          >
                            {updateLoading && btnName == "Suspend" ? (
                              <Box sx={{ display: "flex" }}>
                                <CircularProgress />
                              </Box>
                            ) : (
                              "Suspend"
                            )}
                          </Button>
                        ) : (
                          <></>
                        )

                        //   <Button
                        //       variant="contained"
                        //       className="contained
                        // Primary"
                        //       onClick={() =>
                        //           updatePharmacyStatus("rejected", "Reject")
                        //       }
                        //   >
                        //     {updateLoading && btnName == "Reject" ? (
                        //         <Box sx={{ display: "flex" }}>
                        //           <CircularProgress />
                        //         </Box>
                        //     ) : (
                        //         "Reject"
                        //     )}
                        //   </Button>
                      }
                    </>
                  </>
                )}
                <Button
                  variant="text"
                  onClick={() => {
                    onClose();
                    modId && navigate("/businesses");
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ProductDetail;
