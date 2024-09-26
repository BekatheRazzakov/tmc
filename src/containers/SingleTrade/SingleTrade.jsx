import React, { useEffect, useState } from "react";
import { setCurrentPage } from "../../features/dataSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import TradeInfoTab from "../../components/TradeInfoTab/TradeInfoTab";
import { getTrade } from "../../features/tradeThunk";
import "../SingleGood/singleGood.css";

const SingleTrade = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { trade, tradeLoading, tradeErrorMessage } = useAppSelector(
    (state) => state.tradeState,
  );
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    dispatch(setCurrentPage("Просмотр товара"));
    dispatch(getTrade(params?.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (tradeErrorMessage) setSnackBarOpen(true);
  }, [tradeErrorMessage]);

  const handleSnackBarClose = () => setSnackBarOpen(false);

  return (
    <div className="single-good-page" style={{ marginTop: 0 }}>
      <div className="single-good-page-papers" style={{ marginTop: "20px" }}>
        <TradeInfoTab
          trade={trade}
          tradeLoading={tradeLoading}
          tradeId={params?.id}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={tradeErrorMessage}
      />
    </div>
  );
};

export default SingleTrade;
