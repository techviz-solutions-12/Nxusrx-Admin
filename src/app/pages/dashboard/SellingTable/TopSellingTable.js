import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const TopSellingTable = ({ el, index }) => {
  return (
    <TableRow key={index}>
      <TableCell sx={{ padding: "0px" }} colSpan={6} style={{ border: "none" }}>
        <Table size="small" aria-label="purchases">
          <TableBody>
            <TableCell className="tableBodyCell" width="30px">
              <Typography mx={1} variant="h5" fontSize={16}>
                {index}
              </Typography>
            </TableCell>
            <TableCell
              className="tableBodyCell"
              sx={{ padding: "10px 0px" }}
              width="120px"
            >
              <Box
                sx={{
                  background: "#f3f5f7",
                  textAlign: "center",
                  padding: "20px 0px",
                  borderRadius: "4px",
                  width: "110px",
                  margin: "auto",
                }}
              >
                {el && el?.imageCover?.full_image ? (
                  <img
                    src={el?.imageCover?.full_image}
                    style={{
                      minHeight: "60px",
                      maxHeight: "60px",
                      minWidth: "80px",
                      maxWidth: "80px",
                    }}
                  />
                ) : (
                  <Box className="cusProductName">
                    <Typography>{el?.product_name}</Typography>
                  </Box>
                )}
              </Box>
            </TableCell>
            <TableCell className="tableBodyCell" width=" 300px">
              <Box>
                <Typography mx={1} variant="h5" fontSize={14}>
                  Products
                </Typography>
                <Typography
                  mx={1}
                  variant="h5"
                  fontSize={14}
                  sx={{ fontWeight: "600" }}
                  mb={1}
                >
                  {el?.product_name}
                </Typography>
                <Typography mx={1} variant="h5" fontSize={14}>
                  Price
                </Typography>
                {el?.maxPrice == el?.minPrice ? (
                  <Typography
                    mx={1}
                    variant="h5"
                    fontSize={16}
                    mb={1}
                    sx={{ fontWeight: "600" }}
                  >
                    ${el?.maxPrice}
                  </Typography>
                ) : (
                  <Typography
                    mx={1}
                    variant="h5"
                    fontSize={16}
                    mb={1}
                    sx={{ fontWeight: "600" }}
                  >
                    ${el?.minPrice} - ${el?.maxPrice}
                  </Typography>
                )}
              </Box>
            </TableCell>
            <TableCell className="tableBodyCell" align="center">
              <>
                <Typography mx={1} variant="h5" fontSize={14}>
                  Customers
                </Typography>
                <Typography
                  mx={1}
                  variant="h5"
                  fontSize={14}
                  sx={{ fontWeight: "600" }}
                >
                  {el?.totalCustomer}
                </Typography>
              </>
            </TableCell>
            <TableCell className="tableBodyCell" align="center">
              <>
                <Typography mx={1} variant="h5" fontSize={14}>
                  Total Sold
                </Typography>
                <Typography
                  mx={1}
                  variant="h5"
                  fontSize={14}
                  sx={{ fontWeight: "600" }}
                >
                  {el?.totalSold}
                </Typography>
              </>
            </TableCell>
            <TableCell className="tableBodyCell" align="center">
              <>
                <Typography mx={1} variant="h5" fontSize={14}>
                  Total Sales
                </Typography>
                <Typography
                  mx={1}
                  variant="h5"
                  fontSize={14}
                  sx={{ fontWeight: "600" }}
                >
                  ${Math?.round((el?.totalPrice * 100) / 100)?.toFixed(2)}
                </Typography>
              </>
            </TableCell>
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
};

export default TopSellingTable;
