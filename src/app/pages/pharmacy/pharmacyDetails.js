import React, { useEffect, useState } from "react";
import "./pharmay.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  getAdminPharmacy,
  updateAdminPharmacyStatus,
  getAdminPharmaciesList,
  sendReUploadLink,
} from "../../services/dasboard";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ProductDetail = ({
  open,
  onClose,
  pharmacy,
  page,
  search,
  limit,
  handleDispatchPharmacyId,
  modId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const response = useSelector((state) => state?.dashboard?.pharmacy?.response);
  const loading = useSelector((state) => state?.dashboard?.pharmacy?.loading);

  const updateLoading = useSelector(
    (state) => state?.dashboard?.updatePharmacyStatus?.loading
  );
  const linkLoading = useSelector(
    (state) => state?.dashboard?.reUploadDocs?.loading
  );
  const [btnName, setBtnName] = useState("");
  const [state, setState] = useState({
    store: {},
  });

  useEffect(() => {
    dispatch(getAdminPharmacy(pharmacy));
  }, [pharmacy]);

  useEffect(() => {
    setState({ ...state, store: response });
  }, [response]);

  const updatePharmacyStatus = (status, btn) => {
    setBtnName(btn);
    dispatch(
      updateAdminPharmacyStatus({ status }, pharmacy, function (res) {
        toast.success(`Store status hase been changed  to ${status}`);
        if (res) {
          setTimeout(() => {
            dispatch(getAdminPharmacy(pharmacy));
            dispatch(getAdminPharmaciesList("", "", 1, 10, function (res) {}));
            setBtnName("");
          }, 100);
        }
      })
    );
  };

  const handleSendLink = () => {
    dispatch(sendReUploadLink(pharmacy));
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-mui">
        {loading ? (
          <Box sx={{ position: "absolute", top: "45%", left: "46%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box className="modal-header-mui">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Store
              </Typography>
              <IconButton
                className="modal-clear-btn"
                onClick={() => {
                  onClose();
                  handleDispatchPharmacyId();
                  modId && navigate("/stores");
                }}
              >
                <ClearIcon />
              </IconButton>
              <Divider />
            </Box>
            <Box className="modal-content-mui">
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <Grid container xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontSize: "14px" }}
                      >
                        Store Details
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Store Name
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.store_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Business Name
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.business?.business_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Business Owner
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.business?.business_owner_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Email
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Mobile N0#
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.mobile_no}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Store Type
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        Country
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} mt={2}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7E7E7E", fontWeight: "500" }}
                      >
                        City
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        {state?.store?.city}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12} sm={3}>
                  <Grid item xs={12}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ fontSize: "14px" }}
                    >
                      Documents
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {state?.store &&
                    state?.store?.documents &&
                    state?.store?.documents?.front_picture ? (
                      <Box
                        className={"image-upload-container-view"}
                        gutterBottom
                        my={1}
                      >
                        <Box variant="body" className="image-view">
                          <img src={state?.store?.documents?.front_picture} />
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body">No Document Found</Typography>
                    )}
                    <input hidden type="file" />
                  </Grid>
                  <Grid item xs={12}>
                    {state?.store &&
                      state?.store?.documents &&
                      state?.store?.documents?.back_picture && (
                        <Box
                          className={"image-upload-container-view"}
                          gutterBottom
                          my={1}
                        >
                          <Box variant="body" className="image-view">
                            <img src={state?.store?.documents?.back_picture} />
                          </Box>
                        </Box>
                      )}
                    <input hidden type="file" />
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
                {state?.store?.status == "suspended" && (
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

                {state?.store?.status == "rejected" ? (
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
                      {state?.store?.status == "pending" && (
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
                            className="contained Primary"
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

                      {state?.store?.status == "approved" ? (
                        <Button
                          variant="contained"
                          className="contained Primary"
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
                      )}
                    </>
                  </>
                )}
                <Button
                  variant="text"
                  onClick={() => {
                    onClose();
                    handleDispatchPharmacyId();
                    modId && navigate("/stores");
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
