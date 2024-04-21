import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import "./pagination.scss";
import Box from "@mui/material/Box";

function Paginations(props) {
    const {onPageChange = () => null, totalCount, page} = props;


    return (
        <Box>
            {totalCount > 0 &&
                < Pagination count={totalCount} variant="outlined" color="primary" page={page}
                             onChange={(e, value) => onPageChange(e, value)}/>
            }
        </Box>
    );
}

export default React.memo(Paginations);
