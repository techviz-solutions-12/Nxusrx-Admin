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
import { getAdminMember, getAdminMemberList } from "../../services/business";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../shared/components/Pagination";
import useDialogModal from "../../hooks/useDialogModal";
import BusinessDetails from "./memberDetails";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router";

export const Businesses = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let queryStr = new URLSearchParams(location?.search);
  const modId = queryStr?.get("modId");
  const randomId = queryStr?.get("ranId");
  const response = useSelector((state) => state?.business?.members?.response);
  const loading = useSelector((state) => state?.business?.members?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [memberId, setMemberId] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [BusinessDetailDialog, showBusinessDetailDialog, closeBusinessDialog] =
    useDialogModal(BusinessDetails);
  const [state, setState] = useState({
    members: response,
    count: 0,
  });

  useEffect(() => {
    dispatch(
      getAdminMemberList("", "", page, limit, function (res) {
        if (res) {
          setCustomLoading(false);
        }
      })
    );
  }, []);

  useEffect(() => {
    const count = response?.count;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({ ...state, members: response.members, count: buttonsCount });
  }, [response]);

  useEffect(() => {
    if (modId) {
      dispatch(getAdminMember(modId));
      showBusinessDetailDialog();
    }
  }, [modId, randomId]);

  const handlePageChange = useCallback((e, value) => {
    dispatch(
      getAdminMemberList(
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
      dispatch(getAdminMemberList(query, "", page, limit, function (res) {}));
    }, 1000),
    []
  );

  const searchText = (e) => {
    setSearch(e.target.value);
    debouncedGetSearch(e.target.value, "", page, limit);
  };

  let columns = [
    {
      field: "business_name",
      headerName: "Business Name",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <>
              <Typography>{params?.row?.business?.business_name}</Typography>
            </>
          </Box>
        );
      },
    },

    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile_no", headerName: "Mobile N0#", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },

    { field: "last_name", headerName: "Last Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return params?.row?.approvalStage == "stage1" ||
          params?.row?.approvalStage == "stage2" ? (
          <Box>
            <Typography variant="caption">pending</Typography>
          </Box>
        ) : params?.row?.approvalStage == "stage3" &&
          params?.row?.is_verified == false ? (
          <Box>
            <Typography variant="caption">rejected</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="caption">{params?.row?.status}</Typography>
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
                onClick={() => {
                  setMemberId(params?.row?._id);
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
          Members
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
                state?.members && state?.members?.length > 0
                  ? state?.members
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
        memberId={modId ? modId : memberId}
        page={page}
        modId={modId}
        search={search}
        limit={limit}
      />
    </Card>
  );
};

export default Businesses;
