import React, { lazy, Suspense, useEffect, useState } from "react";
import { setCurrentPage } from "../../features/dataSlice";
import { getGood } from "../../features/dataThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { Box, Paper, Snackbar, Tab, Tabs } from "@mui/material";
import SingleGoodDeleteTab from "../../components/SingleGoodDeleteTab/SingleGoodDeleteTab";
import SingleGoodTradeTab from "../../components/SingleGoodTradeTab/SingleGoodTradeTab";
import "./singleGood.css";

const CreateEditGoodForm = lazy(
  () => import("../../components/CreateEditGoodForm/CreateEditGoodForm"),
);
const GoodInfoTab = lazy(
  () => import("../../components/GoodInfoTab/GoodInfoTab"),
);

const SingleGood = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    good,
    goodLoading,
    goodError,
    deleteGoodError,
    deleteGoodErrorMessage,
  } = useAppSelector((state) => state.dataState);
  const { user } = useAppSelector((state) => state.userState);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(setCurrentPage("Просмотр товара"));
    dispatch(getGood(params?.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (goodError || deleteGoodError) setSnackBarOpen(true);
  }, [goodError, deleteGoodError]);

  const handleSnackBarClose = () => setSnackBarOpen(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="single-good-page">
      <Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab className="single-good-tab-btn" label="Информация" />
          <Tab
            className="single-good-tab-btn"
            label="Трейд"
            disabled={!good?.product}
          />
          {["admin", "Заведующий склада"].includes(user?.role) && (
            <Tab
              className="single-good-tab-btn"
              label="Редактировать"
              disabled={!good?.product}
            />
          )}
          {user?.role === "admin" && (
            <Tab
              className="single-good-tab-btn"
              label="Удалить"
              disabled={!good?.product}
            />
          )}
        </Tabs>
      </Box>
      {value === 0 ? (
        <div className="single-good-page-papers">
          <Suspense fallback={<></>}>
            <GoodInfoTab good={good} goodLoading={goodLoading} />
          </Suspense>
        </div>
      ) : value === 1 ? (
        <Paper
          className="single-good-delete-warning-paper"
          sx={{ p: "40px" }}
          elevation={3}
        >
          <SingleGoodTradeTab goodId={good?.id} />
        </Paper>
      ) : value === 2 ? (
        <Paper className="single-good-edit-paper" elevation={3}>
          <Suspense fallback={<></>}>
            <CreateEditGoodForm
              isEdit
              editingGood={good}
              changeTab={handleTabChange}
            />
          </Suspense>
        </Paper>
      ) : value === 3 ? (
        <Paper
          className="single-good-delete-warning-paper"
          sx={{ p: "40px" }}
          elevation={3}
        >
          <SingleGoodDeleteTab goodId={good?.id} />
        </Paper>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={goodError || deleteGoodErrorMessage}
      />
    </div>
  );
};

export default SingleGood;
