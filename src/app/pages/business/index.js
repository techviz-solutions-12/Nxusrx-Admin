import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Select } from "@mui/material";
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
import Stack from "@mui/material/Stack";
import {
  getAdminBusiness,
  getAdminBusinessList,
} from "../../services/business";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../shared/components/Pagination";
import useDialogModal from "../../hooks/useDialogModal";
import BusinessDetails from "./businessDetails";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router";

export const Businesses = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let queryStr = new URLSearchParams(location?.search);
  const modId = queryStr?.get("modId");
  const randomId = queryStr?.get("ranId");
  const response = useSelector(
    (state) => state?.business?.businesses?.response
  );
  const loading = useSelector((state) => state?.business?.businesses?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [BusinessDetailDialog, showBusinessDetailDialog, closeBusinessDialog] =
    useDialogModal(BusinessDetails);
  const [state, setState] = useState({
    businesses: response,
    count: 0,
  });


  useEffect(() => {
    dispatch(
      getAdminBusinessList("", "", page, limit, function (res) {
        if (res) {
          setCustomLoading(false);
        }
      })
    );
  }, []);

  useEffect(() => {
    if (modId) {
      dispatch(getAdminBusiness(modId));
      showBusinessDetailDialog();
    }
  }, [modId, randomId]);

  useEffect(() => {
    const count = response?.count;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({
      ...state,
      businesses: response.businesses,
      count: buttonsCount,
    });
  }, [response]);

  const handlePageChange = useCallback((e, value) => {
    dispatch(
      getAdminBusinessList(
        search ? search : "",
        "",
        value,
        limit,
        function (res) {}
      )
    );
    setPage(value);
    setCustomLoading(false);
  }, []);

  const debouncedGetSearch = useCallback(
    debounce((query) => {
      setPage(1);
      dispatch(getAdminBusinessList(query, "", page, limit, function (res) {}));
    }, 1000),
    []
  );

  const searchText = (e) => {
    setSearch(e.target.value);
    debouncedGetSearch(e.target.value, "", page, limit);
  };

  let columns = [
    { field: "business_name", headerName: "Business Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile_no", headerName: "Mobile N0#", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },

    { field: "country", headerName: "Country", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
                onClick={() => {
                  setBusinessId(params?.row?._id);
                  showBusinessDetailDialog();
                }}
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
    <Card className="admin-card">
      <Box className="admin-card-header">
        <Typography variant="h5" sx={{ flex: "1 1 100%" }}>
          Businesses
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
                state?.businesses && state?.businesses?.length > 0
                  ? state?.businesses
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

      <BusinessDetailDialog
        business={modId ? modId : businessId}
        page={page}
        modId={modId}
        search={search}
        limit={limit}
      />
    </Card>
  );
};

export default Businesses;
