import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { Card, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { getOrderCardReporting } from "../../../services/dasboard";
import { getTotal } from "../../../helpers/getTotal";

const SaleOrdersCard = () => {
  const [adminOrderReporting, setAdminOrderReporting] = useState([]);
  const [orderReporting, setOrderReporting] = useState([
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "Total Revenue",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "New Order",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "In Processing",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "Partialy Completed",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "Order declined",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "Refunded",
    },
    {
      totalSaleAmount: 0,
      count: 0,
      orderStatus: "Completed",
    },
  ]);

  const dispatch = useDispatch();

  const orderCardsReportingloading = useSelector(
    (state) => state?.dashboard?.orderCardsReporting?.loading
  );

  useEffect(() => {
    dispatch(
      getOrderCardReporting(function (response) {
        if (response?.status == "success") {
          let data = response?.data;
          if (data) {
            response.data = orderReporting?.map((item) => ({
              ...item,
              ...data?.find((el) => el?.orderStatus == item?.orderStatus && el),
            }));
            let tempObj = {
              totalSaleAmount: getTotal(response?.data),
              count: 0,
              orderStatus: "Total Revenue",
            };
            response?.data?.splice(0, 1, tempObj);
            setAdminOrderReporting([...adminOrderReporting, response?.data]);
          }
        }
      })
    );
  }, []);

  return (
    <Grid container spacing={2}>
      {orderCardsReportingloading ? (
        <Box sx={{ margin: "3rem auto" }}>
          <CircularProgress />
        </Box>
      ) : (
        adminOrderReporting &&
        adminOrderReporting[0]?.map((orderReport) => {
          return (
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: "10px",
                  height: "250px",
                  mt: 1,
                  ml: 2,
                }}
                className="admin-card-order"
              >
                <Box
                  sx={{
                    backgroundColor: "#333",
                    borderRadius: "8px",
                    justifyContent: "center",
                  }}
                >
                  <DonutLargeIcon
                    sx={{
                      color: "white",
                      fontSize: "50px",
                      alignItems: "center",
                    }}
                  />
                </Box>

                <Box mt={1}>
                  <Typography variant="h5" sx={{ pl: 1 }}>{`$${Math.round(
                    (orderReport?.totalSaleAmount * 100) / 100
                  ).toFixed(2)}`}</Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#989898", pl: 1 }}
                  >
                    {orderReport?.orderStatus}
                    {orderReport?.orderStatus == "Total Revenue" ? null : (
                      <>
                        {orderReport?.count == 0 ? (
                          <strong> (0)</strong>
                        ) : (
                          <strong> ({orderReport?.count})</strong>
                        )}
                      </>
                    )}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default SaleOrdersCard;
