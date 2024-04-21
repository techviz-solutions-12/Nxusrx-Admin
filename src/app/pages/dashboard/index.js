import React from "react";
import Grid from "@mui/material/Grid";
import "./dashboard.scss";
import SaleOrdersCard from "./SaleOrdersCard";
import MonthlySaleGraph from "./MonthlySaleGraph";
import SaleOrdersGraph from "./SaleOrdersGraph";
import SellingTable from "./SellingTable";

function Dashboard() {
  return (
    <>
      <Grid container spacing={3}>
        {/* Sales Orders Cards */}
        <Grid item xs={12} md={12}>
          <SaleOrdersCard />
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <MonthlySaleGraph />
        </Grid>

        {/* Sales Orders Chart */}
        <Grid item xs={12} md={6}>
          <SaleOrdersGraph />
        </Grid>

        {/* Top Selling Products Table */}
        <Grid item xs={12} md={12} mb={3}>
          <SellingTable />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
