import React, { useEffect, useRef, useState } from "react";
// import "./viewCart.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderDetail, generateOrderQR } from "../../services/orders";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import PDFFile from "../../shared/components/PDF/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NotImageAvail from "../../assets/1.jpg";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row, orders } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row && row?.order_no}</TableCell>

        <TableCell align="left">
          {row && (row?.orderedTo ? row?.orderedTo?.store_name : "N/A")}
        </TableCell>
        <TableCell align="left">
          {row && (row?.cartTotal ? `$${Number(row?.cartTotal)}` : "N/A")}
        </TableCell>
        <TableCell align="left">
          {row &&
            (row?.taxDetails
              ? `$${Number(row?.taxDetails?.tax_in_amount).toFixed(2)}`
              : "N/A")}
        </TableCell>
        <TableCell align="left">
          {row &&
            (row?.taxDetails
              ? `$${
                  Number(row?.taxDetails?.tax_in_amount) +
                  Number(row?.cartTotal)
                }`
              : "N/A")}
        </TableCell>
        <TableCell align="left">
          {row &&
            (row?.taxDetails
              ? `$${Number(row?.marketPlaceFee?.fee_amount).toFixed(2)}`
              : "N/A")}
        </TableCell>
        <TableCell align="left">
          {row && (row?.orderStatus ? `${row?.orderStatus}` : "N/A")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row?.products &&
              row?.products?.length &&
              row?.products?.map((item) => (
                <Box sx={{ margin: 1 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: "1" }}
                  >
                    <Box
                      my={3}
                      sx={{
                        display: "flex",
                        flex: "1",
                        alignItems: "center",
                        "& img": { alignSelf: "flex-start" },
                      }}
                    >
                      <Box display="flex" flex="1" alignItems="center">
                        {item &&
                        item?.product?.product?.imageCover &&
                        item?.product?.product?.imageCover?.full_image ? (
                          <img
                            width="80px"
                            src={item?.product?.product?.imageCover?.full_image}
                          />
                        ) : (
                          <Box className="cusProductName">
                            <Typography>
                              {item?.product?.product?.product_name}
                            </Typography>
                          </Box>
                        )}

                        <Typography
                          mx={1}
                          variant="h5"
                          fontSize={16}
                          sx={{ maxWidth: "400px" }}
                        >
                          {item?.product?.product?.product_name}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Typography
                          sx={{ marginX: "15px" }}
                          variant="subtitle1"
                          fontSize={18}
                        >
                          {`$${Number(
                            item?.discountedPrice
                              ? item?.discountedPrice?.discountedPrice
                              : item?.price
                          )}`}{" "}
                          <span> x {Number(item?.count)}</span>
                        </Typography>

                        <Box display="flex" sx={{ flex: "1" }}>
                          <Typography
                            sx={{ marginX: "10px" }}
                            variant="subtitle1"
                            fontSize={18}
                          >
                            {`$${
                              Number(
                                item?.discountedPrice
                                  ? item?.discountedPrice?.discountedPrice
                                  : item?.price
                              ) * Number(item?.count)
                            }`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const PurchaseOrderDetail = () => {
  const downloadRef = useRef();
  const location = useLocation();
  let queryStr = new URLSearchParams(location?.search);
  const id = queryStr?.get("id");
  const randomId = queryStr?.get("ranId");
  const response = useSelector(
    (state) => state?.orders?.adminOrderDetails?.response
  );
  const loading = useSelector(
    (state) => state?.orders?.adminOrderDetails?.loading
  );
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({ order: {} });
  const [status, setStatus] = useState("");
  const [qrloading, setQrLoading] = useState(false);
  const [qrDetails, setQrDetails] = useState({});
  const [productIndex, setProductIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (id) {
      dispatch(getOrderDetail(id, function (res) {}));
    }
  }, [id, randomId]);

  useEffect(() => {
    if (response) {
      setState({ ...state, order: response });
      setStatus(response?.orderStatus);
    }
  }, [response]);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleGenerateQr = (id, i) => {
    setQrLoading(true);
    setProductIndex(i);
    dispatch(
      generateOrderQR(
        id,
        "recipient",
        function (res) {
          if (res) {
            setQrDetails(res?.data);
            setTimeout(() => {
              setQrLoading(false);
              setProductIndex(null);
              downloadRef?.current?.click();
            }, 400);
          }
        },
        function (err) {
          setQrLoading(false);
          setProductIndex(null);
        }
      )
    );
  };

  return (
    <React.Fragment>
      <PDFDownloadLink
        style={{ display: "none" }}
        PDFDownloadLink
        document={<PDFFile data={qrDetails} forType={"recipient"} />}
        filename="order"
      >
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button ref={downloadRef}>Download</button>
          )
        }
      </PDFDownloadLink>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card className="admin-card">
          <Box
            className="admin-card-header"
            // sx={{
            //   position: "sticky",
            //   top: "0",
            //   paddingLeft: "10px",
            //   paddingTop: "10px",
            // }}
          >
            <Typography variant="h5">
              {" "}
              Order #{state?.order?.order_no} details{" "}
            </Typography>
          </Box>
          <CardContent className="admin-card-content">
            {/* <Box
                className="admin-card-header"
                sx={{ position: "sticky", top: "0" }}
              >
                <Typography variant="h5">
                  Order #{state?.order?.order_no} details
                </Typography>
              </Box> */}
            <Grid container columnGap={3} mt={3}>
              <Grid container lg={12} alignContent="start" spacing={3}>
                <Grid item xs={12} mt={3}>
                  <Typography variant="h6">Order Information</Typography>
                  <Divider />
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flex: "1",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      className="label-color"
                      mr={1}
                      variant="subtitle2"
                    >
                      Ordered By
                    </Typography>
                    <Typography variant="subtitle1">
                      {state?.order?.orderedBy?.store_name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flex: "1",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      className="label-color"
                      mr={1}
                      variant="subtitle2"
                    >
                      Created At
                    </Typography>
                    <Typography variant="subtitle1">
                      {state?.order?.createdAt
                        ? moment(state?.order?.createdAt).format(
                            "MM/DD/YYYY hh:mm A"
                          )
                        : ""}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flex: "1",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      className="label-color"
                      mr={1}
                      variant="subtitle2"
                    >
                      Order Status
                    </Typography>
                    <Typography variant="subtitle1">
                      {`${state?.order?.orderStatus}`}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container lg={12}>
                <Grid item xs={12} mt={3}>
                  <Divider />
                </Grid>
                <Grid item lg={12} md={8} xs={12}>
                  <TableContainer component={Paper} sx={{ margin: "16px 0px" }}>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="left">SubOrder No#</TableCell>
                          <TableCell align="left">Ordered To</TableCell>
                          <TableCell align="left">SubTotal</TableCell>
                          <TableCell align="left">Tax</TableCell>
                          <TableCell align="left">Total</TableCell>
                          <TableCell align="left">Market Place Fee</TableCell>
                          <TableCell align="left">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {state?.order &&
                        state?.order?.subOrders &&
                        state?.order?.subOrders?.length
                          ? state?.order?.subOrders?.map((el, i) => {
                              return (
                                <>
                                  <Row key={i} row={el} />
                                </>
                              );
                            })
                          : "No Orders are available!"}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <Box>
                <Typography variant="h6">Order Summary</Typography>
                <Divider />
              </Box>

              <Box display="flex" flexWrap="wrap" my={3}>
                <Box display="flex" flex="1">
                  <Typography variant="body1">Order Note</Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    value="ship all the ordered items together by tommorroow and I send you an email please check thanks"
                    style={{
                      minWidth: "320px",
                      marginLeft: "15px",
                      marginRight: "15px",
                      height: "170px",
                      backgroundColor: "rgb(233, 236, 239)",
                      padding: "10px",
                      border: "none",
                    }}
                  />
                </Box>
                {state?.order &&
                state?.order?.subOrders &&
                state?.order?.subOrders?.length > 0 ? (
                  <>
                    <Box justifyContent="flex-end">
                      <Box display="flex" my={2} alignItems="center">
                        <Typography sx={{ flex: "1" }} variant="subtitle1">
                          Items Subtotal
                        </Typography>
                        <Typography variant="h5" fontSize={18}>
                          ${state?.order?.total}
                        </Typography>
                      </Box>

                      <Box display="flex" my={2} alignItems="center">
                        <Typography sx={{ flex: "1" }} variant="subtitle1">
                          Tax
                        </Typography>
                        <Typography variant="h5" fontSize={18}>
                          {state?.order?.taxDetails?.tax_in_amount
                            ? "$" +
                              parseFloat(
                                state?.order?.taxDetails?.tax_in_amount.toFixed(
                                  2
                                )
                              )
                            : "N/A"}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={2}>
                        <Typography sx={{ flex: "1" }} variant="subtitle1">
                          Shipping Fee
                        </Typography>
                        <Typography variant="h5" fontSize={18}>
                          $
                          {parseFloat(state?.order?.shipping?.total).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={2}>
                        <Typography sx={{ flex: "1" }} variant="subtitle1">
                          Order Total
                        </Typography>

                        {state?.order?.taxDetails?.tax_in_amount ? (
                          <Typography variant="h5" fontSize={18}>
                            $
                            {parseFloat(
                              Number(state?.order?.total) +
                                Number(state?.order?.shipping?.total) +
                                state?.order?.taxDetails?.tax_in_amount
                            ).toFixed(2)}
                          </Typography>
                        ) : (
                          <Typography variant="h5" fontSize={18}>
                            $
                            {parseFloat(
                              Number(state?.order?.total) +
                                Number(state?.order?.shipping?.total)
                            ).toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                      <Box
                        display="flex"
                        my={3}
                        style={{ width: "200px" }}
                        alignItems="center"
                      ></Box>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PurchaseOrderDetail;
