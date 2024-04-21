import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Button, Card, CardContent, Select } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import Stack from "@mui/material/Stack";
import {
  getActiveBusiness,
  getAdminMemberList,
  getStores,
} from "../../services/business";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../shared/components/Pagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getProducts } from "../../services/products";
import { useNavigate } from "react-router-dom";
// import { Button } from "bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "./products.scss";
import NotImageAvail from "../../assets/1.jpg";

export const Products = () => {
  const [age, setAge] = useState("");
  const [business, setBusiness] = useState([]);
  const [businessValue, setBusinessValue] = useState("");
  const [stores, setStores] = useState([]);
  const [storeValue, setStoreValue] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const response = useSelector((state) => state?.products?.products?.response);

  const loading = useSelector((state) => state?.products?.products?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [memberId, setMemberId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [state, setState] = useState({
    products: response,
    count: 0,
  });

  useEffect(() => {
    dispatch(
      getActiveBusiness(function (res) {
        if (res?.status == "success") {
          setBusiness(res?.data?.businesses);
        }
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getProducts(
        "",
        "",
        page,
        limit,
        businessValue ? businessValue : "",
        "",
        function (res) {
          if (res) {
            setCustomLoading(false);
          }
        }
      )
    );
  }, []);

  useEffect(() => {
    const count =
      response &&
      response?.length &&
      response[0] &&
      response[0]?.metadata?.length &&
      response[0]?.metadata[0]?.total;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({
      ...state,
      products: response && response?.length ? response[0]?.data : [],
      count: buttonsCount,
    });
  }, [response]);

  const handlePageChange = useCallback((e, value) => {
    dispatch(
      getProducts(
        search ? search : "",
        "",
        value,
        limit,
        "",
        "",
        function (res) {}
      )
    );
    setPage(value);
    setCustomLoading(false);
  }, []);

  const debouncedGetSearch = useCallback(
    debounce((query) => {
      setPage(1);
      dispatch(
        getProducts(
          query,
          "",
          page,
          limit,
          businessValue ? businessValue : "",
          storeValue ? storeValue : "",
          function (res) {}
        )
      );
    }, 1000),
    []
  );

  const searchText = (e) => {
    setSearch(e.target.value);
    debouncedGetSearch(e.target.value, "", page, limit);
  };

  const handleBusinessChange = (busName) => {
    if (busName) {
      const tempObj = business?.find((el) => {
        return el?.business_name == busName;
      });

      if (tempObj) {
        setBusinessValue(tempObj?.id);
        dispatch(
          getStores(tempObj?.id, function (res) {
            if (res?.status == "success") {
              setStores(res?.data?.stores);
            }
          })
        );

        dispatch(
          getProducts("", "", page, limit, tempObj?.id, "", function (res) {})
        );
      }
    }
  };

  const handleStoreChange = (storeName) => {
    if (storeName) {
      const tempObj = stores?.find((el) => {
        return el?.store_name == storeName;
      });

      if (tempObj) {
        setStoreValue(tempObj?.id);
        dispatch(
          getProducts(
            "",
            "",
            page,
            limit,
            businessValue ? businessValue : "",
            tempObj?.id,
            function (res) {}
          )
        );
      }
    }
  };

  const handleCloseBusinessChange = (e, val, reason) => {
    if (reason == "input" && val == "") {
      setBusinessValue("");
      dispatch(
        getProducts("", "", page, limit, "", "", function (res) {
          if (res) {
            setStores([]);
            setStoreValue("");
          }
        })
      );
    }
  };

  const handleCloseStoresChange = (e, val, reason) => {
    if (reason == "input" && val == "") {
      setStoreValue("");
      dispatch(
        getProducts(
          "",
          "",
          page,
          limit,
          businessValue ? businessValue : "",
          "",
          function (res) {}
        )
      );
    }
  };

  let columns = [
    {
      field: "imageCover",
      headerName: "Image Cover",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {params?.row &&
            params?.row?.imageCover &&
            params?.row?.imageCover?.full_image ? (
              <img
                style={{ width: "100px", padding: "10px" }}
                src={params?.row?.imageCover?.full_image}
              />
            ) : (
              <Box className="cusProductName">
                <Typography>{params?.row?.product_name}</Typography>
              </Box>
            )}
          </Box>
        );
      },
    },

    { field: "brand", headerName: "BRAND NAME", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 1 },
    { field: "DRUG_IDENTIFICATION_NUMBER", headerName: "DIN NO", flex: 1 },

    { field: "total", headerName: "Quantity", flex: 1 },
    {
      field: "PRODUCT STATUS",
      headerName: "Price",
      flex: 2,
      renderCell: (params) => {
        return (
          <Box>
            <>
              <Typography variant="body1" component="body1">
                Max Price : {params?.row?.max_price}{" "}
                {params?.row?.max_price != params?.row?.min_price && (
                  <> / Min Price : {params?.row?.min_price} </>
                )}
              </Typography>
            </>
          </Box>
        );
      },
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <>
              <IconButton
                variant="text"
                onClick={() =>
                  navigate({
                    pathname: "/productDetail",
                    search: `?id=${params?.row?._id}&din=${params?.row?.DRUG_IDENTIFICATION_NUMBER}`,
                  })
                }
              >
                <VisibilityIcon />
              </IconButton>
            </>
          </Box>
        );
      },
    },
  ];

  return (
    <Box className="productsContainer">
      <Card className="admin-card">
        <Box className="admin-card-header">
          <Typography variant="h5" sx={{ flex: 1 }}>
            Products
          </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={searchText}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            className="busSelect"
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl
              sx={{ width: "100%" }}
              size="small"
              className="cusForm"
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={business?.map((option) => option?.business_name)}
                onChange={(e, newValue) => {
                  handleBusinessChange(newValue);
                }}
                onInputChange={(e, val, reason) => {
                  handleCloseBusinessChange(e, val, reason);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Business"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: null,
                      type: "search",
                    }}
                  />
                )}
              />
            </FormControl>
          </Box>

          {/* <Box className="busSelect">
            <FormControl
              sx={{ minWidth: 120, marginLeft: "20px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Business</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={businessValue}
                label="Business"
                onChange={(e) => handleBusinessChange(e)}
              >
                {business?.map((bus) => {
                  return (
                    <MenuItem value={bus?.id}>{bus?.business_name}</MenuItem>
                  );
                })}
              </Select>

              {stores?.length > 0 ? (
                <Box className="busSelectCloseIcon">
                  <CloseIcon
                    onClick={handleCloseBusinessChange}
                    sx={{ fontSize: "14px" }}
                  />
                </Box>
              ) : null}
            </FormControl>
          </Box> */}

          {stores?.length > 0 ? (
            <Box
              className="busSelect"
              component="form"
              noValidate
              autoComplete="off"
            >
              <FormControl
                sx={{ width: "100%" }}
                size="small"
                className="cusForm"
              >
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo1"
                  disableClearable
                  options={stores?.map((option) => option?.store_name)}
                  onChange={(e, newValue) => {
                    handleStoreChange(newValue);
                  }}
                  onInputChange={(e, val, reason) => {
                    handleCloseStoresChange(e, val, reason);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Stores"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: null,
                        type: "search",
                      }}
                    />
                  )}
                />
              </FormControl>
            </Box>
          ) : // <Box className="busSelect">
          //   <FormControl
          //     sx={{ minWidth: 120, marginLeft: "20px" }}
          //     size="small"
          //   >
          //     <InputLabel id="demo-simple-select-label">Stores</InputLabel>
          //     <Select
          //       labelId="demo-simple-select-label"
          //       id="demo-simple-select"
          //       value={storeValue}
          //       label="Stores"
          //       onChange={(e) => handleStoreChange(e)}
          //     >
          //       {stores?.map((store) => {
          //         return (
          //           <MenuItem value={store?.id}>{store?.store_name}</MenuItem>
          //         );
          //       })}
          //     </Select>
          //     {storeValue != "" ? (
          //       <Box className="busSelectCloseIcon">
          //         <CloseIcon
          //           onClick={handleCloseStoresChange}
          //           sx={{ fontSize: "14px" }}
          //         />
          //       </Box>
          //     ) : null}
          //   </FormControl>
          // </Box>
          null}
        </Box>

        <CardContent>
          <Box sx={{ height: "calc(100vh - 300px)", px: "20px" }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={
                  state?.products && state?.products?.length > 0
                    ? state?.products
                    : []
                }
                columns={columns}
                hideFooter={true}
                hideFooterRowCount={true}
              />
            )}
          </Box>

          {!customLoading && (
            <Stack spacing={2}>
              <Pagination
                totalCount={state?.count}
                page={page}
                onPageChange={handlePageChange}
              />
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Products;
