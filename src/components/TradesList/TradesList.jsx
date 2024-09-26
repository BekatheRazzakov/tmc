import React, {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  AppBar,
  Box,
  Chip,
  MenuItem,
  Paper,
  Select,
  TableContainer,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, tradeStatuses } from "../../constants";
import GoodsListFooter from "../GoodsListFooter/GoodsListFooter";
import { getDeletedTrades, getTrades } from "../../features/tradeThunk";
import { useAppSelector } from "../../app/hooks";

const GoodsListTable = lazy(() => import("../GoodListTable/GoodsListTable"));

const columns = [
  {
    id: "source_user_name",
    label: "От кого",
    minWidth: 200,
    align: "center",
    format: (value) => value?.full_name,
  },
  {
    id: "destination_user_name",
    label: "Кому",
    minWidth: 200,
    align: "center",
    format: (value) => value?.full_name || value,
  },
  {
    id: "good_id",
    label: "Товар",
    minWidth: 100,
    align: "center",
  },
  {
    id: "create_date",
    label: "Дата создания",
    minWidth: 120,
    align: "center",
    format: (value) => formatDate(value),
  },
  {
    id: "trade_status_id",
    label: "Статус",
    minWidth: 95,
    align: "center",
    format: (value) => (
      <Chip
        label={tradeStatuses[value - 1]?.value || ""}
        color={tradeStatuses[value - 1]?.color || "default"}
        sx={{ height: "22px", fontSize: "12px", lineHeight: "12px" }}
      />
    ),
  },
];

const TradesList = memo(({ trades }) => {
  const dispatch = useDispatch();
  const { tradesLoading } = useSelector((state) => state.tradeState);
  const { user } = useAppSelector((state) => state.userState);
  const [sortBy, setSortBy] = useState(0);
  const [paginationData, setPaginationData] = useState({
    pageSize: 20,
    pageNumber: 1,
    sortByCategory: 0,
  });

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePaginationDataChange = (e) => {
    const { name, value } = e.target;
    setPaginationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getTrades(paginationData));
  }, [dispatch, paginationData]);

  useEffect(() => {
    if (user?.role === "admin" && sortBy === 4)
      dispatch(getDeletedTrades(paginationData));
    else dispatch(getTrades(paginationData));
  }, [dispatch, paginationData, user?.role, sortBy]);

  const sortedByStatusWaiting = useCallback(() => {
    return (trades || []).filter((trade) => trade?.trade_status_id === 1);
  }, [trades]);

  const sortedByStatusAccepted = useCallback(() => {
    return (trades || []).filter((trade) => trade?.trade_status_id === 2);
  }, [trades]);

  const sortedByStatusDenied = useCallback(() => {
    return (trades || []).filter((trade) => trade?.trade_status_id === 3);
  }, [trades]);

  const filteredGoodsList = useCallback(() => {
    return sortBy === 1
      ? sortedByStatusWaiting()
      : sortBy === 2
        ? sortedByStatusAccepted()
        : sortBy === 3
          ? sortedByStatusDenied()
          : trades || [];
  }, [
    trades,
    sortBy,
    sortedByStatusAccepted,
    sortedByStatusWaiting,
    sortedByStatusDenied,
  ]);

  return (
    <Paper
      elevation={4}
      sx={{ m: "30px 10px 0", borderRadius: "10px", overflow: "hidden" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className="goods-list-toolbar"
          position="static"
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "wrap",
            p: "10px 0",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "no-wrap",
            }}
          >
            <Typography variant="body1" component="span" sx={{ mr: "10px" }}>
              Фильтр по{sortBy === 4 && " удалённым"}:
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={sortBy}
              onChange={handleSortByChange}
              sx={{ color: "#FFFFFF", minWidth: "175px" }}
            >
              <MenuItem value={0}>без фильтрации</MenuItem>
              {tradeStatuses.map((status) => (
                <MenuItem value={status.name} key={status.id}>
                  статус: {status.value}
                </MenuItem>
              ))}
              {user?.role === "admin" && (
                <MenuItem value={4}>Удалённые</MenuItem>
              )}
            </Select>
          </Box>
        </AppBar>
      </Box>
      <TableContainer sx={{ maxHeight: 530 }}>
        <Suspense fallback={<></>}>
          <GoodsListTable
            filteredGoodsList={filteredGoodsList}
            columns={columns}
            goodsLoading={tradesLoading}
          />
        </Suspense>
      </TableContainer>
      <GoodsListFooter
        handlePaginationDataChange={handlePaginationDataChange}
        paginationData={paginationData}
      />
    </Paper>
  );
});

export default TradesList;
