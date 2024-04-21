import { createAction, handleActions } from "redux-actions";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";
import {
  _getProductDetail,
  _getProducts,
  _getSameProductInventories,
} from "../../shared/httpService/api";
const initialState = {
  products: { loading: false, response: {}, hasError: false, error: {} },
  productDetail: { loading: false, response: {}, hasError: false, error: {} },
  productInventories: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
};

export const getProductsStart = createAction(ActionTypes.GET_PRODUCTS_START);
export const getProductsSuccess = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  (response) => response
);
export const getProductsError = createAction(
  ActionTypes.GET_PRODUCTS_ERROR,
  (error) => error
);

export const getProducts =
  (search, status, page, limit, busId, storeId, callback) =>
  async (dispatch) => {
    try {
      dispatch(getProductsStart());
      const response = await _getProducts(
        search,
        status,
        page,
        limit,
        busId,
        storeId
      );
      if (response) {
        callback(response);
      }
      dispatch(getProductsSuccess(response));
    } catch (error) {
      dispatch(getProductsError(error));
      if (error?.status.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

//Product_DETAIL

export const getProductDetailStart = createAction(
  ActionTypes.GET_PRODUCT_DETAIL_START
);
export const getProductDetailSuccess = createAction(
  ActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
  (response) => response
);
export const getProductDetailError = createAction(
  ActionTypes.GET_PRODUCT_DETAIL_ERROR,
  (error) => error
);

export const getProductDetail = (id, callback) => async (dispatch) => {
  try {
    dispatch(getProductDetailStart());
    const response = await _getProductDetail(id);
    if (response) {
      callback(response);
    }
    dispatch(getProductDetailSuccess(response));
  } catch (error) {
    dispatch(getProductDetailError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
//PRODUCT_INEVNTORIES
export const getProductInventoriesStart = createAction(
  ActionTypes.GET_PRODUCT_INVENTORY_START
);
export const getProductInventoriesSuccess = createAction(
  ActionTypes.GET_PRODUCT_INVENTORY_SUCCESS,
  (response) => response
);
export const getProductInventoriesError = createAction(
  ActionTypes.GET_PRODUCT_INVENTORY_ERROR,
  (error) => error
);

export const getProductInventories =
  (din, page, limit, callback) => async (dispatch) => {
    try {
      dispatch(getProductInventoriesStart());
      const response = await _getSameProductInventories(din, page, limit);
      if (response) {
        callback(response);
      }
      dispatch(getProductInventoriesSuccess(response));
    } catch (error) {
      dispatch(getProductInventoriesError(error));
      if (error?.status.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
const reducer = handleActions(
  {
    //PRODUCTS
    [ActionTypes.GET_PRODUCTS_START]: (state) => ({
      ...state,
      products: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_PRODUCTS_SUCCESS]: (state, action) => ({
      ...state,
      products: {
        ...state.products,
        loading: false,
        hasError: false,
        error: {},
        response: action?.payload?.data,
      },
    }),
    [ActionTypes.GET_PRODUCTS_ERROR]: (state, action) => ({
      ...state,
      products: {
        ...state.products,
        loading: false,
        hasError: false,
        error: action.payload,
        response: {},
      },
    }),
    //PRODUCT_DETAIL
    [ActionTypes.GET_PRODUCT_DETAIL_START]: (state) => ({
      ...state,
      productDetail: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_PRODUCT_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload,
      },
    }),
    [ActionTypes.GET_PRODUCT_DETAIL_ERROR]: (state, action) => ({
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        hasError: false,
        error: action.payload,
        response: {},
      },
    }),
    //PRODUCT_INVENTORIES
    [ActionTypes.GET_PRODUCT_INVENTORY_START]: (state) => ({
      ...state,
      productInventories: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_PRODUCT_INVENTORY_SUCCESS]: (state, action) => ({
      ...state,
      productInventories: {
        ...state.productInventories,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload,
      },
    }),
    [ActionTypes.GET_PRODUCT_INVENTORY_ERROR]: (state, action) => ({
      ...state,
      productInventories: {
        ...state.productInventories,
        loading: false,
        hasError: false,
        error: action.payload,
        response: {},
      },
    }),
  },
  initialState
);

export default reducer;
