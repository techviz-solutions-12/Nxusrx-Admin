import React, { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Pagination from "../../shared/components/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  getProductDetail,
  getProductInventories,
} from "../../services/products";

export const ProductDetail = () => {
  const [value, setValue] = useState(null);

  const location = useLocation();

  const dispatch = useDispatch();

  let queryStr = new URLSearchParams(location?.search);

  const id = queryStr?.get("id");
  const din = queryStr?.get("din");

  const [productDetail, setProductDetail] = useState(null);
  const [customLoading, setCustomLoading] = useState(true);
  const [inventories, setInventories] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [inventryId, setInventryId] = useState("");
  const [state, setState] = useState({
    inventories: inventories?.inventories,
    count: 0,
  });
  const productDetailLoading = useSelector(
    (state) => state?.products?.productDetail?.loading
  );
  const productInventoriesLoading = useSelector(
    (state) => state?.products?.productInventories?.loading
  );

  const handlePageChange = useCallback((e, value) => {
    setPage(value);
    setCustomLoading(false);
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(
        getProductDetail(id, function (response) {
          if (response?.status === "success") {
            setProductDetail(response?.data[0]);
          }
        })
      );
    }
  }, [id]);

  useEffect(() => {
    if (din) {
      dispatch(
        getProductInventories(din, page, limit, function (response) {
          setInventories(response?.data?.inventories);
          setCustomLoading(false);
        })
      );
    }
  }, [count]);

  useEffect(() => {
    const count = inventories[0]?.metadata[0]?.total;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({
      ...state,
      inventories: inventories[0]?.data,
      count: buttonsCount,
    });
  }, [inventories]);
  const columns = [
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 1,
      valueGetter: (params) =>
        moment(params.row?.expiry_date).format("DD-MM-YYYY"),
    },
    {
      field: "DRUG_IDENTIFICATION_NUMBER",
      headerName: "DIN NO",
      flex: 1,
      valueGetter: (params) =>
        params.row?.product[0]?.DRUG_IDENTIFICATION_NUMBER,
    },
    {
      field: "batch_number",
      headerName: "Batch Number",
      valueGetter: (params) => params.row?.batch_number,
      flex: 1,
    },

    { field: "quantity", headerName: "Quantity", width: 130, editable: true },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      valueGetter: (params) => `$${Number(params?.row?.price).toFixed(2)}`,
    },
  ];

  return (
    <Card className="admin-card">
      <Box className="admin-card-header">
        <Typography variant="h5">Product Detail</Typography>
      </Box>
      <CardContent
        className="admin-card-content"
        style={{ height: "calc(100vh - 215px)", overflow: "auto" }}
      >
        <Grid container mt={3} columnSpacing={3}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className="txt-divider">
                  <Typography color="text.primary" variant="h6">
                    Product Information
                  </Typography>
                  <Divider />
                </Box>
              </Grid>
              {productDetailLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    margin: "auto",
                    padding: "3rem 0rem 0rem 0rem",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={4}>
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
                        Din No
                      </Typography>
                      <Typography variant="subtitle1">
                        {productDetail?.DRUG_IDENTIFICATION_NUMBER}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
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
                        Store Name
                      </Typography>
                      <Typography variant="subtitle1">
                        {productDetail?.store[0]?.store_name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
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
                        Price
                      </Typography>
                      <Typography variant="subtitle1">
                        {`$${Number(productDetail?.stock[0]?.price).toFixed(
                          2
                        )}`}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flex: "1",
                        flexDirection: "column",
                      }}
                    >
                      {productDetail?.stock[0]?.discount
                        ?.isAutomatedDiscountApplied ? (
                        <>
                          <Typography
                            className="label-color"
                            mr={1}
                            variant="subtitle2"
                          >
                            Discounted Percent & Discounted Price
                          </Typography>
                          <Typography variant="subtitle1">
                            {`${productDetail?.stock[0]?.discountedPrice?.discountPercentage} & $${productDetail?.stock[0]?.discountedPrice?.discountedPrice}`}
                          </Typography>
                        </>
                      ) : null}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
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
                        Product Name
                      </Typography>
                      <Typography variant="subtitle1">
                        {productDetail?.product_name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
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
                        Status
                      </Typography>
                      <Typography variant="subtitle1">
                        {productDetail?.store[0]?.status}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flex: "1",
                        flexDirection: "column",
                      }}
                    >
                      <Typography className="label-color" variant="subtitle2">
                        Description
                      </Typography>

                      <TextareaAutosize
                        aria-label="minimum height"
                        value={productDetail?.description}
                        style={{
                          height: "130px",
                          // width: "300px",
                          backgroundColor: "rgb(233, 236, 239)",
                          padding: "10px",
                          border: "none",
                        }}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography color="text.primary" variant="h6">
                    Product Inventories
                  </Typography>
                </Box>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 400, width: "100%" }}>
                  {productInventoriesLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <DataGrid
                      rows={state?.inventories ? state?.inventories : []}
                      getRowId={(row) => row._id}
                      columns={columns}
                      hideFooter={true}
                      hideFooterRowCount={true}
                    />
                  )}
                </div>
                {!customLoading && (
                  <Stack spacing={2}>
                    {state?.count > 0 && (
                      <Pagination
                        totalCount={state?.count}
                        page={page}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ProductDetail;
