import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { getMonthlySaleReport } from "../../../services/dasboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySaleGraph = () => {
  const [state, setState] = useState({
    chartData: { datasets: [] },
    chartOptions: {},
  });

  const dispatch = useDispatch();

  const saleLoading = useSelector(
    (state) => state?.dashboard?.monthlySaleReport?.loading
  );

  useEffect(() => {
    dispatch(
      getMonthlySaleReport(function (res) {
        if (res) {
          const options = {
            plugins: {
              title: {
                display: true,
                text: "",
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          };

          const labels = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ];

          let chartData = res?.data[0]?.monthsAndCount?.sort(
            (a, b) => a?.month - b?.month
          );

          let staticStatus = [
            {
              name: "Ready for pickup",
              data: [],
            },
            {
              name: "In Processing",
              data: [],
            },
            {
              name: "Completed",
              data: [],
            },
            {
              name: "New Order",
              data: [],
            },

            {
              name: "Order Accepted By Store",
              data: [],
            },
            {
              name: "Order declined",
              data: [],
            },
            {
              name: "Order pending for buyer approval",
              data: [],
            },
          ];

          for (let i = 0; i < chartData?.length; i++) {
            if (chartData[i].count == 0) {
              for (let j = 0; j < staticStatus?.length; j++) {
                staticStatus[j].data[i] = 0;
              }
            } else if (chartData[i]?.status_data?.length) {
              let foundIndexes = [];
              for (let k = 0; k < staticStatus?.length; k++) {
                let found = chartData[i]?.status_data.findIndex(
                  (el) => el?.status_data?.status == staticStatus[k].name
                );

                if (found > -1) {
                  staticStatus[k]?.data?.push(
                    chartData[i]?.status_data[found]?.status_data?.total
                  );
                  foundIndexes.push(k);
                } else {
                  staticStatus[k]?.data?.push(0);
                }
              }
            }
          }

          const data = {
            labels,
            datasets: [
              ...staticStatus.map((el) => {
                return {
                  label: el?.name,
                  data: el?.data,
                  backgroundColor:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                };
              }),
            ],
          };

          setState({ ...state, chartOptions: options, chartData: data });
        }
      })
    );
  }, []);

  return (
    <Card className="admin-card-revenue">
      <Typography variant="h5" component="div" sx={{ marginBottom: "20px" }}>
        Monthly Sales Revenue
      </Typography>
      {saleLoading ? (
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
        <CardContent sx={{ height: "530px" }} style={{ padding: "0" }}>
          {!state?.chartData?.datasets?.every((el) => el?.data?.length == 0) ? (
            <Bar options={state?.chartOptions} data={state?.chartData || {}} />
          ) : (
            "NO REVENUE DATA"
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default MonthlySaleGraph;
