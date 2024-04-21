import React, { useEffect, useState } from "react";
import "./pharmay.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  getAdminMemberList,
  updateAdminMemberStatus,
  getAdminMember,
  updateAdminMemberStatusSuspend,
} from "../../services/business";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";

const ProductDetail = ({
  open,
  onClose,
  memberId,
  page,
  search,
  limit,
  modId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const response = useSelector((state) => state?.business?.member?.response);
  const loading = useSelector((state) => state?.business?.member?.loading);

  const updateLoading = useSelector(
    (state) => state?.business?.updateMemberStatus?.loading
  );

  const updateMemberSuspendLoading = useSelector(
    (state) => state?.business?.updateMemberSuspendStatus?.loading
  );

  const [btnName, setBtnName] = useState("");
  const [state, setState] = useState({
    member: {},
  });

  useEffect(() => {
    dispatch(getAdminMember(memberId));
  }, [memberId]);

  useEffect(() => {
    setState({ ...state, member: response });
  }, [response]);

  const updatePharmacyStatus = (status, btn) => {
    setBtnName(btn);
    // if (status == "rejected" || status == "approved") {
    dispatch(
      updateAdminMemberStatus({ status }, memberId, function (res) {
        if (res) {
          setTimeout(() => {
            dispatch(getAdminMember(memberId));
            dispatch(
              getAdminMemberList(
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
    // }
    // if (status == "suspended_by_admin" || status == "approved") {
    //   dispatch(
    //     updateAdminMemberStatusSuspend({ status }, memberId, function (res) {
    //       if (res) {
    //         setTimeout(() => {
    //           dispatch(getAdminMember(memberId));
    //           dispatch(
    //             getAdminMemberList(
    //               search ? search : "",
    //               "",
    //               page,
    //               limit,
    //               function (res) {}
    //             )
    //           );
    //           setBtnName("");
    //         }, 100);
    //       }
    //     })
    //   );
    // }
  };

  const updatePharmacySuspendStatus = (status, btn) => {
    setBtnName(btn);
    dispatch(
      updateAdminMemberStatusSuspend({ status }, memberId, function (res) {
        if (res) {
          setTimeout(() => {
            dispatch(getAdminMember(memberId));
            dispatch(
              getAdminMemberList(
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
                Member
              </Typography>
              <IconButton
                className="modal-clear-btn"
                onClick={() => {
                  onClose();
                  modId && navigate("/members");
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
                        Member Details
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6}>
                      <Typography variant="body2">Business Name</Typography>
                      <Typography variant="body2">
                        {state?.member?.business?.business_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6}>
                      <Typography variant="body2">Email</Typography>
                      <Typography variant="body2">
                        {state?.member?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6}>
                      <Typography variant="body2">Mobile N0#</Typography>
                      <Typography variant="body2">
                        {state?.member?.mobile_no}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6} mt={2}>
                      <Typography variant="body2">Status</Typography>
                      <Typography variant="body2">
                        {state?.member &&
                        state?.member?.documents &&
                        state?.member?.documents?.status == "rejected" ? (
                          "rejected"
                        ) : (
                          <>
                            {state?.member?.is_verified == false
                              ? "pending"
                              : `${state?.member?.status}`}
                          </>
                        )}

                        {/* ? "approved"
                          : "not_approved"} */}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6} mt={2}>
                      <Typography variant="body2">First Name</Typography>
                      <Typography variant="body2">
                        {state?.member?.first_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sm={6} mt={2}>
                      <Typography variant="body2">Last Name</Typography>
                      <Typography variant="body2">
                        {state?.member?.last_name}
                      </Typography>
                    </Grid>
                    {state?.member?.is_pharmacist && (
                      <>
                        {state?.member?.license_no && (
                          <Grid item xs={6} md={4} sm={6} mt={2}>
                            <Typography variant="body2">
                              License Number
                            </Typography>
                            <Typography variant="body2">
                              {state?.member?.license_no}
                            </Typography>
                          </Grid>
                        )}
                        {state?.member?.signature && (
                          <Grid item xs={6} md={4} sm={6} mt={2}>
                            <Typography variant="body2">Signature</Typography>

                            <Box
                              className={"image-upload-container-view"}
                              gutterBottom
                              my={1}
                            >
                              <Box variant="body" className="image-view">
                                <img
                                  src={state?.member?.signature}
                                  style={{ objectFit: "fill !important" }}
                                />
                              </Box>
                            </Box>
                          </Grid>
                        )}
                      </>
                    )}
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
                    {state?.member &&
                    state?.member?.documents &&
                    state?.member?.documents?.front_picture ? (
                      <Box
                        className={"image-upload-container-view"}
                        gutterBottom
                        my={1}
                      >
                        <Box variant="body" className="image-view">
                          <img src={state?.member?.documents?.front_picture} />
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body">No Document Found</Typography>
                    )}
                    <input hidden type="file" />
                  </Grid>
                  <Grid item xs={12}>
                    {state?.member &&
                      state?.member?.documents &&
                      state?.member?.documents?.back_picture && (
                        <Box
                          className={"image-upload-container-view"}
                          gutterBottom
                          my={1}
                        >
                          <Box variant="body" className="image-view">
                            <img src={state?.member?.documents?.back_picture} />
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
                {state?.member &&
                state?.member?.documents &&
                state?.member?.documents?.status == "rejected" ? (
                  <>
                    <Button
                      variant="contained"
                      className="contained Primary"
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
                  </>
                ) : (
                  <>
                    {!state?.member?.is_verified ? (
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
                          className="containedPrimary"
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
                    ) : (
                      <>
                        {state?.member?.is_verified &&
                          state?.member?.status == "approved" && (
                            <Button
                              variant="contained"
                              className="contained Primary"
                              onClick={() =>
                                updatePharmacySuspendStatus(
                                  "suspended_by_admin",
                                  "Suspend"
                                )
                              }
                            >
                              {updateMemberSuspendLoading &&
                              btnName == "Suspend" ? (
                                <Box sx={{ display: "flex" }}>
                                  <CircularProgress />
                                </Box>
                              ) : (
                                "Suspend"
                              )}
                            </Button>
                          )}

                        {state?.member?.is_verified &&
                          state?.member?.status == "suspended_by_admin" && (
                            <Button
                              variant="contained"
                              className="contained Primary"
                              onClick={() =>
                                updatePharmacySuspendStatus(
                                  "approved",
                                  "Approve"
                                )
                              }
                            >
                              {updateMemberSuspendLoading &&
                              btnName == "Approve" ? (
                                <Box sx={{ display: "flex" }}>
                                  <CircularProgress />
                                </Box>
                              ) : (
                                "Unsuspend"
                              )}
                            </Button>
                          )}
                      </>
                    )}
                  </>
                )}

                <Button
                  variant="text"
                  onClick={() => {
                    onClose();
                    modId && navigate("/members");
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
