import axios from "axios";

import {
  ALL_BRANDS_REQUEST,  ALL_BRANDS_SUCCESS,  ALL_BRANDS_FAIL,
  NEW_BRAND_REQUEST,  NEW_BRAND_SUCCESS,NEW_BRAND_FAIL,
  DELETE_BRAND_REQUEST,  DELETE_BRAND_SUCCESS,DELETE_BRAND_FAIL,
  UPDATE_BRAND_REQUEST,  UPDATE_BRAND_SUCCESS,  UPDATE_BRAND_FAIL,
  BRAND_DETAILS_REQUEST,  BRAND_DETAILS_SUCCESS,  BRAND_DETAILS_FAIL,
  CLEAR_ERRORS,
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
} from "../constants/brandConstants";

//Get brands
export const getBrands = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BRANDS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/brands`);

    dispatch({
      type: ALL_BRANDS_SUCCESS,
      payload: data.brands,
    });
  } catch (error) {
    dispatch({
      type: ALL_BRANDS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const newBrand = (brandData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BRAND_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/admin/brands/new`,brandData,config);

    dispatch({
      type: NEW_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

///delete brand (admin) ----------------------------------------------------------------------------
export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/brand/${id}`);

    dispatch({
      type: DELETE_BRAND_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Brand (admin) --------------------------------------------------------------------------------
export const updateBrand = (id, brandData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/admin/brand/${id}`,  brandData, config);

    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Details Brand
export const getBrandDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/brand/${id}`);

    dispatch({
      type: BRAND_DETAILS_SUCCESS,
      payload: data.brand,
    });
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
