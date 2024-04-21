import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { getTopSellingProducts } from "../../../services/dasboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TopSellingTable from "./TopSellingTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getFormattedDate } from "../../../shared/utils/formatedDate";
import CloseIcon from "@mui/icons-material/Close";

const SellingTable = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dispatch = useDispatch();

  const topSellingProductsLoading = useSelector(
    (state) => state?.dashboard?.topSellingProducts?.loading
  );

  useEffect(() => {
    dispatch(
      getTopSellingProducts("", "", "", function (response) {
        if (response?.status == "success") {
          setTopSellingProducts(response?.data);
        }
      })
    );
  }, []);

  const handleTableLimitChange = (event) => {
    if (event?.target?.value) {
      setLimit(`${event?.target?.value}`);
      dispatch(
        getTopSellingProducts(
          event?.target?.value,
          fromDate ? fromDate : "",
          toDate ? toDate : "",
          function (response) {
            if (response?.status == "success") {
              setTopSellingProducts(response?.data);
            }
          }
        )
      );
    }
  };

  const handleTableFromDateChange = (newValue) => {
    const date = getFormattedDate(`${newValue?.toISOString()}`);
    if (date) {
      setfromDate(date);
      dispatch(
        getTopSellingProducts(
          limit ? limit : "",
          date,
          toDate ? toDate : "",
          function (response) {
            if (response?.status == "success") {
              setTopSellingProducts(response?.data);
            }
          }
        )
      );
    }
  };

  const handleTableToDateChange = (newValue) => {
    const date = getFormattedDate(`${newValue?.toISOString()}`);
    if (date) {
      setToDate(date);
      dispatch(
        getTopSellingProducts(
          limit ? limit : "",
          fromDate ? fromDate : "",
          date,
          function (response) {
            if (response?.status == "success") {
              setTopSellingProducts(response?.data);
            }
          }
        )
      );
    }
  };

  const handleTableRemoveFromDate = () => {
    setfromDate("");
    dispatch(
      getTopSellingProducts(
        limit ? limit : "",
        "",
        toDate ? toDate : "",
        function (response) {
          if (response?.status == "success") {
            setTopSellingProducts(response?.data);
          }
        }
      )
    );
  };

  const handleTableRemoveToDate = () => {
    setToDate("");
    dispatch(
      getTopSellingProducts(
        limit ? limit : "",
        fromDate ? fromDate : "",
        "",
        function (response) {
          if (response?.status == "success") {
            setTopSellingProducts(response?.data);
          }
        }
      )
    );
  };

  return (
    <>
      <Card sx={{ marginBottom: "1px" }}>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Typography variant="h5" component="div" sx={{ padding: "1rem" }}>
            Top products based on units sold
          </Typography>

          <Box display="flex">
            <Box sx={{ margin: "auto 0px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Limit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="selectLimit"
                  label="Limit"
                  name="limit"
                  disabled={topSellingProductsLoading ? true : false}
                  value={limit}
                  onChange={handleTableLimitChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ margin: "auto 10px" }}>
              <Box display="flex" position="relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="From Date"
                    inputFormat="MM/DD/YYYY"
                    disabled={topSellingProductsLoading ? true : false}
                    value={fromDate ? fromDate : null}
                    onChange={(newValue) => {
                      if(newValue){
                        if(newValue?.$d && newValue?.$d != 'Invalid Date'){

                          handleTableFromDateChange(newValue);
                        }
                      }

                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" error={false} />
                    )}
                  />
                  {fromDate && fromDate ? (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "40px",
                        top: "8px",
                      }}
                      onClick={handleTableRemoveFromDate}
                    >
                      <CloseIcon />
                    </Box>
                  ) : null}
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{ margin: "auto 10px" }}>
              <Box display="flex" position="relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="To Date"
                    inputFormat="MM/DD/YYYY"
                    value={toDate ? toDate : null}
                    disabled={topSellingProductsLoading ? true : false}
                    onChange={(newValue) => {
                      if(newValue){
                        if(newValue?.$d && newValue?.$d != 'Invalid Date'){
                          handleTableToDateChange(newValue);
                        }
                      }

                    }}
                    renderInput={(params) => (
                      <TextField
                        className=""
                        {...params}
                        error={false}
                        size="small"
                      />
                    )}
                  />
                  {toDate && toDate ? (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "40px",
                        top: "8px",
                      }}
                      onClick={handleTableRemoveToDate}
                    >
                      <CloseIcon />
                    </Box>
                  ) : null}
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
      <TableContainer component={Paper} className="tableContainer">
        <Table sx={{ minWidth: 700 }}>
          {topSellingProductsLoading ? (
            <Box sx={{ textAlign: "center", margin: "10rem" }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableBody>
              {topSellingProducts && topSellingProducts?.length > 0 ? (
                topSellingProducts?.map((el, index) => {
                  return (
                    <TopSellingTable key={index} el={el} index={index + 1} />
                  );
                })
              ) : (
                <Box sx={{ textAlign: "center", margin: "10rem" }}>
                  No Data!
                </Box>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default SellingTable;
