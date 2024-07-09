import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import { categories } from "../../constants";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createGood,
  createManufacture,
  createModel,
  getManufactures,
  getModels,
  updateGood
} from "../../features/dataThunk";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetCreateGoodData,
  setGoodIsUpdated
} from "../../features/dataSlice";

const FileUpload = lazy(() => import("../../components/FileUpload/FileUpload"));

const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
};

const CreateEditGoodForm = ({ isEdit, editingGood, changeTab }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    good,
    createGoodLoading,
    createGoodErrorMessage,
    createGoodError,
    models,
    manufactures,
    updateGoodLoading,
    updateGoodError,
    updateGoodErrorMessage,
    manufacturesLoading,
    modelsLoading,
    goodIsCreated,
    goodIsUpdated,
    createManufactureLoading,
    createModelLoading,
    manufactureIsCreated,
    modelIsCreated,
    createManufactureError,
    createModelError,
    createManufactureErrorMessage,
    createModelErrorMessage,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState({
    id: params?.id || null,
    nazvanie_id: editingGood?.nazvanie_id,
    barcode: editingGood?.barcode,
    product_type: editingGood?.product_type,
    product_manufacture_id: editingGood?.product?.product_manufacture_id,
    product_model_id: editingGood?.product?.product_model_id,
    good_status_id: 1,
    cost: editingGood?.product?.cost,
    photo_path: editingGood?.photo_path || null,
  });
  const [newManufactureData, setNewManufactureData] = useState(null);
  const [newModelData, setNewModelData] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [newManufactureModalOpen, setNewManufactureModalOpen] = useState(false);
  const [newModelModalOpen, setNewModelModalOpen] = useState(false);
  
  useEffect(() => {
    return () => dispatch(resetCreateGoodData());
  }, [dispatch]);
  
  useEffect(() => {
    if (createGoodError || updateGoodError || modelIsCreated || manufactureIsCreated || createManufactureError || createModelError) {
      setSnackBarOpen(true);
    }
  }, [createGoodError, createManufactureError, createModelError, manufactureIsCreated, modelIsCreated, updateGoodError]);
  
  useEffect(() => {
    if (state.product_type) {
      dispatch(getModels(state?.product_type));
      dispatch(getManufactures(state?.product_type));
    }
  }, [dispatch, state.product_type]);
  
  useEffect(() => {
    if (goodIsCreated) {
      navigate(`/goods/${good?.id}`);
      dispatch(resetCreateGoodData());
    }
  }, [dispatch, good?.id, goodIsCreated, navigate]);
  
  useEffect(() => {
    if (goodIsUpdated) {
      changeTab(null, 0);
      dispatch(setGoodIsUpdated(false));
    }
  }, [changeTab, dispatch, goodIsUpdated]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setState((prevState) => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  const handleManufactureDataChange = (e) => {
    const { name, value } = e.target;
    
    setNewManufactureData((prevState) => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  const handleModelDataChange = (e) => {
    const { name, value } = e.target;
    
    setNewModelData((prevState) => (
      {
        ...prevState, [name]: value,
      }
    ));
  };
  
  const handleFileChange = (e) => {
    setState((prevState) => (
      {
        ...prevState, photo_path: e.target.files[0],
      }
    ));
  };
  
  const removeImage = () => {
    setState((prevState) => (
      {
        ...prevState, photo_path: null,
      }
    ));
  };
  
  const handleNewManufactureModalOpen = () => {
    setNewManufactureModalOpen(true);
    setNewManufactureData(prevState => (
      {
        ...prevState,
        product_type: state?.product_type,
      }
    ));
  }
  
  const handleNewManufactureModalClose = () => {
    setNewManufactureModalOpen(false);
    setNewManufactureData(null);
  };
  
  const handleNewModelModalOpen = () => {
    setNewModelModalOpen(true);
    setNewModelData(prevState => (
      {
        ...prevState,
        product_type: state?.product_type,
      }
    ));
  }
  
  const handleNewModelModalClose = () => {
    setNewModelModalOpen(false);
    setNewModelData(null);
  };
  
  const handleSnackBarClose = () => setSnackBarOpen(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state.product_type || !(
      state.product_manufacture_id >= 0
    ) || !(
      state.product_model_id >= 0
    ) || !state.good_status_id || !state.cost || !state.barcode) return;
    if (isEdit) {
      await dispatch(updateGood({
        ...state,
        product_type_has_changed: editingGood?.product_type !== state.product_type,
        good_data_has_changed: editingGood?.product?.product_manufacture_id !== state.product_manufacture_id || editingGood?.product?.product_model_id !== state.product_model_id || editingGood?.product?.cost !== state.cost,
      }));
    } else dispatch(createGood(state));
  };
  
  const onNewManufactureCreate = async (e) => {
    e.preventDefault();
    if (modelIsCreated || manufactureIsCreated) {
      dispatch(resetCreateGoodData());
    }
    if (!newManufactureData.product_type || !newManufactureData.name) return;
    await dispatch(createManufacture(newManufactureData));
    handleNewManufactureModalClose();
  };
  
  const onNewModelCreate = async (e) => {
    e.preventDefault();
    if (modelIsCreated || manufactureIsCreated) {
      dispatch(resetCreateGoodData());
    }
    if (newModelModalOpen && (
      !newModelData?.product_type || !newModelData?.name
    )) return;
    await dispatch(createModel(newModelData));
    handleNewModelModalClose();
  };
  
  return (
    <>
      <Box className='new-good-form'
        component='form'
        onSubmit={onSubmit}>
        <FormControl required>
          <InputLabel id='category-select-required-label'>категорий</InputLabel>
          <Select
            labelId='category-select-required-label'
            id='category-select-required'
            value={state.product_type}
            label='категорий'
            name='product_type'
            onChange={handleChange}
          >
            {categories.map(category => (
              <MenuItem value={category.name}
                key={category.name}>{category.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {state?.product_type && <>
          <FormControl required>
            <InputLabel id='manufacture-select-required-label'>производитель</InputLabel>
            <Select
              labelId='manufacture-select-required-label'
              id='manufacture-select-required'
              value={state.product_manufacture_id}
              label='производитель'
              name='product_manufacture_id'
              onChange={handleChange}
            >
              <MenuItem value={state?.product_manufacture_id || 0}
                onClick={handleNewManufactureModalOpen}><em>Создать производителя</em></MenuItem>
              {manufactures.map(manufacture => (
                <MenuItem value={manufacture.id}
                  key={manufacture.id}>{manufacture.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel id='model-select-required-label'>модель</InputLabel>
            <Select
              labelId='model-select-required-label'
              id='model-select-required'
              value={state.product_model_id}
              label='модель'
              name='product_model_id'
              onChange={handleChange}
            >
              <MenuItem value={state?.product_model_id || 0}
                onClick={handleNewModelModalOpen}><em>Создать модель</em></MenuItem>
              {models.map(model => (
                <MenuItem value={model.id}
                  key={model.id}>{model.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>}
        <TextField
          id='price'
          label='цена'
          type='number'
          inputProps={{
            min: 0,
          }}
          variant='outlined'
          name='cost'
          value={state.cost}
          onChange={handleChange}
          required
        />
        <TextField id='outlined-basic'
          label='штрих код'
          variant='outlined'
          name='barcode'
          value={state.barcode}
          onChange={handleChange}
          required
        />
        <Suspense fallback={<></>}>
          <FileUpload label='фото товара'
            file={isEdit ? typeof state?.photo_path === 'string' ? 'data:image/png;base64,' + state?.photo_path : state?.photo_path : state?.photo_path || null}
            handleFileChange={handleFileChange}
            removeImage={removeImage}
            isByte={typeof state?.photo_path === 'string'}
          />
        </Suspense>
        <LoadingButton
          type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}
          disabled={!state.product_type || !(
            state.product_manufacture_id > 0
          ) || !(
            state.product_model_id > 0
          ) || !state.good_status_id || !state.cost || !state.barcode || modelsLoading || manufacturesLoading}
          loading={createGoodLoading || updateGoodLoading}
        >
          {isEdit ? 'Сохранить' : 'Создать'}
        </LoadingButton>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackBarOpen}
          onClose={handleSnackBarClose}
          message={(
            isEdit && updateGoodErrorMessage
          ) || createGoodErrorMessage || createManufactureErrorMessage || createModelErrorMessage || (
            modelIsCreated && 'модель товара создана'
          ) || (
            manufactureIsCreated && 'производитель товара создан'
          )}
        />
      </Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={newManufactureModalOpen || newModelModalOpen}
        onClose={() => {
          handleNewManufactureModalClose();
          handleNewModelModalClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={newManufactureModalOpen || newModelModalOpen}>
          <Box sx={modalStyle} className='new-manufacture-model-form-modal'>
            <Typography variant='h6'
              component='h6'
              className='new-manufacture-model-form-modal-title'
            >Создать производителя</Typography>
            <Box className='new-good-form'
              component='form'
              onSubmit={newManufactureModalOpen ? onNewManufactureCreate : newModelModalOpen ? onNewModelCreate : () => {}}
            >
              <FormControl required>
                <InputLabel id='category-select-required-label'>
                  категорий
                </InputLabel>
                <Select
                  labelId='category-select-required-label'
                  id='category-select-required'
                  value={state?.product_type}
                  label='категорий'
                  name='product_type'
                  onChange={newManufactureModalOpen ? handleManufactureDataChange : newModelModalOpen ? handleModelDataChange : () => {}}
                  disabled
                >
                  {categories.map(category => (
                    <MenuItem value={category.name}
                      key={category.name}>{category.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField id='outlined-basic'
                label={newManufactureModalOpen ? 'производитель' : newModelModalOpen ? 'модель' : ''}
                variant='outlined'
                name='name'
                value={newManufactureModalOpen ? newManufactureData?.name : newModelModalOpen ? newModelData?.name : ''}
                onChange={newManufactureModalOpen ? handleManufactureDataChange : newModelModalOpen ? handleModelDataChange : () => {}}
                required
              />
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={newManufactureModalOpen ? !newManufactureData?.product_type || !newManufactureData?.name : newModelModalOpen ? !newModelData?.product_type || !newModelData?.name : false}
                loading={newManufactureModalOpen ? createManufactureLoading : newModelModalOpen ? createModelLoading : false}
              >
                Создать
              </LoadingButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CreateEditGoodForm;