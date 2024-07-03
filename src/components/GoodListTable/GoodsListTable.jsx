import React, { memo } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const GoodsListTable = memo(({
  columns, goodsLoading, filteredGoodsList
}) => {
  const navigate = useNavigate();
  
  return (<Table stickyHeader aria-label='sticky table'>
    <TableHead>
      <TableRow>
        {columns.map((column, i) => (<TableCell
          key={i}
          align={column.align}
          style={{minWidth: column.minWidth}}
        >
          {column.label}
        </TableCell>))}
      </TableRow>
    </TableHead>
    {goodsLoading ? <>
      {['', '', ''].map((_, i) => (<TableRow key={i}>
        {['', '', '', '', '', ''].map((_, i) => (<TableCell key={i}>
          <Skeleton variant='text' sx={{fontSize: '1rem'}}/>
        </TableCell>))}
      </TableRow>))}
    </> : <TableBody>
      {(filteredGoodsList() || []).map((row) => {
        return (<TableRow
          hover role='checkbox'
          tabIndex={-1} key={row?.id}
          onClick={() => navigate(`/goods/${row?.id}`)}
        >
          {columns?.map((column, i) => {
            const value = row[column.id];
            return (<TableCell key={i} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>);
          })}
        </TableRow>);
      })}
    </TableBody>}
  </Table>);
});

export default GoodsListTable;