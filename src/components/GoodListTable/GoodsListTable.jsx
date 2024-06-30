import React, { memo } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const GoodsListTable = memo(({
  checkBoxColumn, columns, goodsLoading, filteredGoodsList
}) => {
  const navigate = useNavigate();
  
  return (<Table stickyHeader aria-label='sticky table'>
    <TableHead>
      <TableRow>
        {[checkBoxColumn(), ...columns].map((column) => (<TableCell
          key={column.id}
          align={column.align}
          style={{minWidth: column.minWidth}}
        >
          {column.label}
        </TableCell>))}
      </TableRow>
    </TableHead>
    {goodsLoading ? <>
      {['', '', ''].map(() => (<TableRow>
        {['', '', '', '', '', ''].map(() => (<TableCell>
          <Skeleton variant='text' sx={{fontSize: '1rem'}}/>
        </TableCell>))}
      </TableRow>))}
    </> : <TableBody>
      {(filteredGoodsList() || []).map((row) => {
        return (<TableRow
          hover role='checkbox'
          tabIndex={-1} key={row.code}
          onClick={() => navigate(`/goods/${row?.id}`)}
        >
          {[checkBoxColumn(row.id), ...columns].map((column) => {
            const value = row[column.id];
            return (<TableCell key={column.id} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>);
          })}
        </TableRow>);
      })}
    </TableBody>}
  </Table>);
});

export default GoodsListTable;