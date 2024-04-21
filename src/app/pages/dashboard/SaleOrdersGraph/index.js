import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "react-apexcharts";
import { getOrderReporting } from "../../../services/dasboard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getFormattedDate } from "../../../shared/utils/formatedDate";
import CloseIcon from "@mui/icons-material/Close";
import { getTotal } from "../../../helpers/getTotal";

const SaleOrdersGraph = () => {
  const [saleFromDate, setSaleFromDate] = useState(null);
  const [saleToDate, setSaleToDate] = useState("");
  const [ordersState, setOrdersState] = useState({
    chartOrdersData: [],
    chartOrdersOptions: {},
  });
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

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const dispatch = useDispatch();

  const orderReportingloading = useSelector(
    (state) => state?.dashboard?.orderReporting?.loading
  );

  useEffect(() => {
    dispatch(
      getOrderReporting("", "", function (response) {
        let data = response?.data;
        if (data) {
          const labels = data?.map((el) => el?.orderStatus);
          const series = data?.map((el) => el?.totalSaleAmount);
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

          const options = {
            chart: {
              width: 380,
              type: "donut",
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$" + Math.round((val * 100) / 100)?.toFixed(2);
                },

                title: {
                  formatter: function (seriesName) {
                    return seriesName;
                  },
                },
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: "Total",
                      formatter: () =>
                        `$${Math.round(
                          (tempObj?.totalSaleAmount * 100) / 100
                        ).toFixed(2)}`,
                    },
                    value: {
                      show: true,

                      formatter: function (val) {
                        return "$" + Math.round((val * 100) / 100).toFixed(2);
                      },
                    },
                  },
                },
              },
            },

            labels: labels,
            dataLabels: {
              enabled: false,
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],
            legend: {
              position: "right",
              offsetY: 0,
              height: 230,
            },
          };

          setOrdersState({
            ...ordersState,
            chartOrdersData: series,
            chartOrdersOptions: options,
          });
        }
      })
    );
  }, []);

  const handleSaleOrderFromDateChange = (newValue) => {
    const date = getFormattedDate(`${newValue?.toISOString()}`);
    if (date) {
      setSaleFromDate(date);
      dispatch(
        getOrderReporting(
          date,
          saleToDate ? saleToDate : "",
          function (response) {
            if (response?.status == "success") {
              let data = response?.data;
              if (data) {
                const labels = data?.map((el) => el?.orderStatus);
                const series = data?.map((el) => el?.totalSaleAmount);
                response.data = orderReporting?.map((item) => ({
                  ...item,
                  ...data?.find(
                    (el) => el?.orderStatus == item?.orderStatus && el
                  ),
                }));
                let tempObj = {
                  totalSaleAmount: getTotal(response?.data),
                  count: 0,
                  orderStatus: "Total Revenue",
                };
                response?.data?.splice(0, 1, tempObj);
                const options = {
                  chart: {
                    width: 380,
                    type: "donut",
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return "$" + Math.round((val * 100) / 100)?.toFixed(2);
                      },

                      title: {
                        formatter: function (seriesName) {
                          return seriesName;
                        },
                      },
                    },
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: "Total",
                            formatter: () =>
                              `$${Math.round(
                                (tempObj?.totalSaleAmount * 100) / 100
                              ).toFixed(2)}`,
                          },
                          value: {
                            show: true,

                            formatter: function (val) {
                              return (
                                "$" + Math.round((val * 100) / 100).toFixed(2)
                              );
                            },
                          },
                        },
                      },
                    },
                  },

                  labels: labels,
                  dataLabels: {
                    enabled: false,
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200,
                        },
                        legend: {
                          show: false,
                        },
                      },
                    },
                  ],
                  legend: {
                    position: "right",
                    offsetY: 0,
                    height: 230,
                  },
                };
                setOrdersState({
                  ...ordersState,
                  chartOrdersData: series,
                  chartOrdersOptions: options,
                });
              }
            }
          }
        )
      );
    }
  };

  const handleSaleOrderToDateChange = (newValue) => {
    const date = getFormattedDate(`${newValue?.toISOString()}`);
    if (date) {
      setSaleToDate(date);
      dispatch(
        getOrderReporting(
          saleFromDate ? saleFromDate : "",
          date,
          function (response) {
            if (response?.status == "success") {
              let data = response?.data;
              if (data) {
                const labels = data?.map((el) => el?.orderStatus);
                const series = data?.map((el) => el?.totalSaleAmount);
                response.data = orderReporting?.map((item) => ({
                  ...item,
                  ...data?.find(
                    (el) => el?.orderStatus == item?.orderStatus && el
                  ),
                }));
                let tempObj = {
                  totalSaleAmount: getTotal(response?.data),
                  count: 0,
                  orderStatus: "Total Revenue",
                };
                response?.data?.splice(0, 1, tempObj);
                const options = {
                  chart: {
                    width: 380,
                    type: "donut",
                  },
                  tooltip: {
                    y: {
                      formatter: function (val) {
                        return "$" + Math.round((val * 100) / 100)?.toFixed(2);
                      },

                      title: {
                        formatter: function (seriesName) {
                          return seriesName;
                        },
                      },
                    },
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: "Total",
                            formatter: () =>
                              `$${Math.round(
                                (tempObj?.totalSaleAmount * 100) / 100
                              ).toFixed(2)}`,
                          },
                          value: {
                            show: true,

                            formatter: function (val) {
                              return (
                                "$" + Math.round((val * 100) / 100).toFixed(2)
                              );
                            },
                          },
                        },
                      },
                    },
                  },

                  labels: labels,
                  dataLabels: {
                    enabled: false,
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200,
                        },
                        legend: {
                          show: false,
                        },
                      },
                    },
                  ],
                  legend: {
                    position: "right",
                    offsetY: 0,
                    height: 230,
                  },
                };
                setOrdersState({
                  ...ordersState,
                  chartOrdersData: series,
                  chartOrdersOptions: options,
                });
              }
            }
          }
        )
      );
    }
  };

  const handleRemoveSaleOrderFromDate = () => {
    if (fromDateRef) {
      fromDateRef.current.value = "";
    }
    setSaleFromDate("");
    dispatch(
      getOrderReporting("", saleToDate ? saleToDate : "", function (response) {
        if (response?.status == "success") {
          let data = response?.data;
          if (data) {
            const labels = data?.map((el) => el?.orderStatus);
            const series = data?.map((el) => el?.totalSaleAmount);
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
            const options = {
              chart: {
                width: 380,
                type: "donut",
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return "$" + Math.round((val * 100) / 100)?.toFixed(2);
                  },

                  title: {
                    formatter: function (seriesName) {
                      return seriesName;
                    },
                  },
                },
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: "Total",
                        formatter: () =>
                          `$${Math.round(
                            (tempObj?.totalSaleAmount * 100) / 100
                          ).toFixed(2)}`,
                      },
                      value: {
                        show: true,

                        formatter: function (val) {
                          return "$" + Math.round((val * 100) / 100).toFixed(2);
                        },
                      },
                    },
                  },
                },
              },

              labels: labels,
              dataLabels: {
                enabled: false,
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      show: false,
                    },
                  },
                },
              ],
              legend: {
                position: "right",
                offsetY: 0,
                height: 230,
              },
            };
            setOrdersState({
              ...ordersState,
              chartOrdersData: series,
              chartOrdersOptions: options,
            });
          }
        }
      })
    );
  };

  const handleRemoveSaleOrderToDate = () => {
    if (toDateRef) {
      fromDateRef.current.value = "";
    }
    setSaleToDate("");
    dispatch(
      getOrderReporting(
        saleFromDate ? saleFromDate : "",
        "",
        function (response) {
          if (response?.status == "success") {
            let data = response?.data;
            if (data) {
              const labels = data?.map((el) => el?.orderStatus);
              const series = data?.map((el) => el?.totalSaleAmount);
              response.data = orderReporting?.map((item) => ({
                ...item,
                ...data?.find(
                  (el) => el?.orderStatus == item?.orderStatus && el
                ),
              }));
              let tempObj = {
                totalSaleAmount: getTotal(response?.data),
                count: 0,
                orderStatus: "Total Revenue",
              };
              response?.data?.splice(0, 1, tempObj);
              const options = {
                chart: {
                  width: 380,
                  type: "donut",
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return "$" + Math.round((val * 100) / 100)?.toFixed(2);
                    },

                    title: {
                      formatter: function (seriesName) {
                        return seriesName;
                      },
                    },
                  },
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          label: "Total",
                          formatter: () =>
                            `$${Math.round(
                              (tempObj?.totalSaleAmount * 100) / 100
                            ).toFixed(2)}`,
                        },
                        value: {
                          show: true,

                          formatter: function (val) {
                            return (
                              "$" + Math.round((val * 100) / 100).toFixed(2)
                            );
                          },
                        },
                      },
                    },
                  },
                },

                labels: labels,
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        show: false,
                      },
                    },
                  },
                ],
                legend: {
                  position: "right",
                  offsetY: 0,
                  height: 230,
                },
              };
              setOrdersState({
                ...ordersState,
                chartOrdersData: series,
                chartOrdersOptions: options,
              });
            }
          }
        }
      )
    );
  };

  return (
    <Card className="admin-card-sales">
      <Box>
        <Typography variant="h5" component="div" sx={{ marginBottom: "10px" }}>
          Sale Orders
        </Typography>
        <Box display="flex" width="100%" justifyContent="right">
          <Box sx={{ margin: "0px 10px" }}>
            <Box display="flex" position="relative">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="From Date"
                  name={"SaleFromDate"}
                  inputRef={fromDateRef}
                  inputFormat="MM/DD/YYYY"
                  disabled={orderReportingloading ? true : false}
                  value={saleFromDate ? saleFromDate : null}
                  onChange={(newValue) => {

                    if(newValue){
                      if(newValue?.$d && newValue?.$d != 'Invalid Date'){

                        handleSaleOrderFromDateChange(newValue);
                      }
                    }

                  }}
                  renderInput={(params) => (
                    <TextField {...params} error={false} size="small" />
                  )}
                />
                {saleFromDate && saleFromDate ? (
                  <Box
                    sx={{
                      position: "absolute",
                      right: "40px",
                      top: "8px",
                    }}
                    onClick={handleRemoveSaleOrderFromDate}
                  >
                    <CloseIcon />
                  </Box>
                ) : null}
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ margin: "0px 10px" }}>
            <Box display="flex" position="relative">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="To Date"
                  inputFormat="MM/DD/YYYY"
                  inputRef={toDateRef}
                  disabled={orderReportingloading ? true : false}
                  value={saleToDate ? saleToDate : null}
                  onChange={(newValue) => {
                    if(newValue){
                      if(newValue?.$d && newValue?.$d != 'Invalid Date'){

                        handleSaleOrderToDateChange(newValue);
                      }
                    }

                  }}
                  renderInput={(params) => (
                    <TextField {...params} error={false} size="small" />
                  )}
                />
                {saleToDate && saleToDate ? (
                  <Box
                    sx={{
                      position: "absolute",
                      right: "40px",
                      top: "8px",
                    }}
                    onClick={handleRemoveSaleOrderToDate}
                  >
                    <CloseIcon />
                  </Box>
                ) : null}
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
      </Box>
      {orderReportingloading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "3rem auto",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardContent sx={{ height: "530px", padding: "0", margin: "20px 0px" }}>
          {ordersState?.chartOrdersData.length > 0 ? (
            <Chart
              options={ordersState?.chartOrdersOptions}
              series={ordersState?.chartOrdersData}
              type="donut"
              height={350}
            />
          ) : (
            "NO ORDERS DATA"
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SaleOrdersGraph;
