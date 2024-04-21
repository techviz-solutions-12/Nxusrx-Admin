import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, FormControlLabel, Select } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import "./pharmay.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { getAdminOrdersList } from "../../services/orders";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Pagination from "../../shared/components/Pagination";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Verify from "../../assets/images/teenyicons_tick-circle-outline.svg";
import Reject from "../../assets/images/system-uicons_cross-circle.svg";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment/moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const response = useSelector((state) => state?.orders?.orders?.response);
  const loading = useSelector((state) => state?.orders?.orders?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [state, setState] = useState({
    orders: [],
    count: 0,
  });

  useEffect(() => {
    dispatch(
      getAdminOrdersList("", "", page, limit, function (res) {
        if (res) {
          setCustomLoading(false);
        }
      })
    );
  }, []);

  useEffect(() => {
    const count = response.count ? response.count : 0;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({
      ...state,
      orders:
        response?.orders && response?.orders?.length ? response?.orders : [],
      count: buttonsCount,
    });
  }, [response]);

  const handlePageChange = (e, value) => {
    dispatch(
      getAdminOrdersList(
        search ? search : "",
        status ? status : "",
        value,
        limit,
        function (res) {}
      )
    );
    setPage(value);
    setCustomLoading(false);
  };

  const debouncedGetSearch = useCallback(
    debounce((query) => {
      setPage(1);
      dispatch(
        getAdminOrdersList(
          query,
          status ? status : "",
          page,
          limit,
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

  let columns = [
    {
      field: "Order",
      headerName: "Order",
      width: 50,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption" sx={{ flex: "1 1 100%" }}>
              #{params?.row?.order_no}{" "}
              {params?.row?.orderedBy && params?.row?.orderedBy?.length
                ? params?.row?.orderedBy[0]?.pharmacy_name
                : ""}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "SubOrders",
      headerName: "SubOrders",
      width: 250,
      renderCell: (params) => {
        return (
          <Box>
            {params?.row?.subOrders && params?.row?.subOrders?.length
              ? params?.row?.subOrders?.map((el) => (
                  <Box>
                    <Typography variant="caption">
                      {IconForStatus(el?.orderStatus)} #{el?.order_no} (in{" "}
                      {el?.orderedTo?.store_name} store)
                    </Typography>
                  </Box>
                ))
              : "N/A"}
          </Box>
        );
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {`${moment(params?.row?.createdAt).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {params?.row?.orderStatus}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "SubTotal",
      headerName: "SubTotal",
      width: 80,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              ${Number(params?.row?.total).toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Tax",
      headerName: "Tax",
      flex: 3,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {params?.row?.taxDetails
                ? "$" +
                  Number(params?.row?.taxDetails?.tax_in_amount).toFixed(2)
                : "N/A"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Total",
      headerName: "Total",
      flex: 3,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {params?.row?.taxDetails
                ? "$" +
                  Number(
                    params?.row?.total + params?.row?.taxDetails?.tax_in_amount
                  ).toFixed(2)
                : "N/A"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "MarketPlaceFee",
      headerName: "MarketPlaceFee",
      flex: 3,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {params?.row?.marketPlaceFee
                ? "$" +
                  Number(params?.row?.marketPlaceFee?.fee_amount).toFixed(2)
                : "N/A"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Paid",
      headerName: "Paid",
      flex: 3,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="caption">
              {/* <FormControlLabel control={ */}
              <Checkbox size="small" />
              {/* } /> */}
            </Typography>
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
                    pathname: "/orderDetail",
                    search: `?id=${params?.row?._id}`,
                  })
                }
              >
                {params?.row?.status == "pending" ||
                params?.row?.status == "rejected" ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </>
          </Box>
        );
      },
    },
  ];

  const handleStatus = (e) => {
    setPage(1);
    dispatch(
      getAdminOrdersList(
        search ? search : "",
        e.target.value,
        1,
        limit,
        function (res) {}
      )
    );

    setStatus(e.target.value);
  };

  const IconForStatus = (status) => {
    switch (status) {
      case "Order declined":
        return <CancelIcon sx={{ color: "red" }} />;
      case "Completed":
        return <VerifiedIcon color="success" />;
      case "Refunded":
        return <CurrencyExchangeIcon color="secondary" />;

      default:
        return <RemoveCircleIcon sx={{ color: "yellow" }} />;
    }
  };

  const filters = [
    {
      label: "New Order",
      value: "New Order",
    },
    {
      label: "In Processing",
      value: "In Processing",
    },
    {
      label: "Partialy Completed",
      value: "Partialy Completed",
    },
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "Refunded",
      value: "Refunded",
    },
    {
      label: "Order declined",
      value: "Order declined",
    },
  ];

  return (
    <Card className="admin-card">
      <Box className="admin-card-header">
        <Typography variant="h5" sx={{ flex: "1 1 100%" }}>
          Orders
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
        <FormControl variant="standard" sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">
            Search By Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Search By Status"
            id="demo-simple-select"
            value={status}
            onChange={(e) => handleStatus(e)}
          >
            {filters.map((filter) => {
              return <MenuItem value={filter?.value}>{filter?.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <CardContent>
        <Box sx={{ height: "calc(100vh - 300px)", px: "20px" }}>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={
                state?.orders && state?.orders?.length > 0 ? state?.orders : []
              }
              columns={columns}
              hideFooter={true}
              hideFooterRowCount={true}
            />
          )}
        </Box>
      </CardContent>
      {!customLoading && (
        <Stack spacing={2}>
          <Pagination
            totalCount={state?.count}
            page={page}
            onPageChange={handlePageChange}
          />
        </Stack>
      )}
    </Card>
  );
};

export default Orders;
