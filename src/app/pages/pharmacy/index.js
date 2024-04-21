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
import VisibilityIcon from "@mui/icons-material/Visibility";

import debounce from "lodash.debounce";
import "./pharmay.scss";
import Stack from "@mui/material/Stack";
import {
  getAdminPharmaciesList,
  getAdminPharmacy,
  setPharmacyID,
} from "../../services/dasboard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../shared/components/Pagination";
import useDialogModal from "../../hooks/useDialogModal";
import PharmacyDetails from "./pharmacyDetails";
import Verify from "../../assets/images/teenyicons_tick-circle-outline.svg";
import Reject from "../../assets/images/system-uicons_cross-circle.svg";
import { useLocation, useNavigate } from "react-router";

export const Pharmacies = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let queryStr = new URLSearchParams(location?.search);
  const modId = queryStr?.get("modId");
  const randomId = queryStr?.get("ranId");
  const response = useSelector(
    (state) => state?.dashboard?.pharmacies?.response
  );
  const loading = useSelector((state) => state?.dashboard?.pharmacies?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [PharmacyDetailDialog, showPharmacyDetailDialog, closePharmacyDialog] =
    useDialogModal(PharmacyDetails);
  const [state, setState] = useState({
    pharmacies: response,
    count: 0,
  });

  useEffect(() => {
    dispatch(
      getAdminPharmaciesList("", "", page, limit, function (res) {
        if (res) {
          setCustomLoading(false);
        }
      })
    );
  }, []);

  useEffect(() => {
    if (modId) {
      dispatch(getAdminPharmacy(modId));
      showPharmacyDetailDialog();
    }
  }, [modId, randomId]);

  useEffect(() => {
    const count = response?.count;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({
      ...state,
      pharmacies: response.stores,
      count: buttonsCount,
    });
  }, [response]);

  const handlePageChange = useCallback((e, value) => {
    dispatch(
      getAdminPharmaciesList(
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
      dispatch(
        getAdminPharmaciesList(query, "", page, limit, function (res) {})
      );
    }, 1000),
    []
  );

  const searchText = (e) => {
    setSearch(e.target.value);
    debouncedGetSearch(e.target.value, "", page, limit);
  };

  let columns = [
    { field: "store_name", headerName: "Store Name", flex: 1 },
    { field: "type", headerName: "Store Type", flex: 1 },
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
                  setPharmacyId(params?.row?._id);
                  showPharmacyDetailDialog();
                  dispatch(setPharmacyID(params?.row?._id));
                }}
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

  return (
    <Card className="admin-card">
      <Box className="admin-card-header">
        <Typography variant="h5" sx={{ flex: "1 1 100%" }}>
          Stores
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
                state?.pharmacies && state?.pharmacies?.length > 0
                  ? state?.pharmacies
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

      <PharmacyDetailDialog
        pharmacy={modId ? modId : pharmacyId}
        page={page}
        modId={modId}
        search={search}
        limit={limit}
        handleDispatchPharmacyId={() => dispatch(setPharmacyID(""))}
      />
    </Card>
  );
};

export default Pharmacies;
