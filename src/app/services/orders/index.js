import { createAction, handleActions } from "redux-actions";
import {
  _getAdminOrdersList,
  _getOrderDetail,
  _updateOrderStatus,
  _generateOrderQR,
} from "../../shared/httpService/api";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  orders: { loading: false, response: {}, hasError: false, error: {} },
  adminOrderDetails: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  updateOrderStatus: { loading: false },
  scan_qr: { loading: false },
};

export const getOrdersAdminStart = createAction(ActionTypes.GET_ADMIN_ORDERS);
export const getOrdersAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_ORDERS_SUCCESS,
  (response) => response
);
export const getOrdersAdminError = createAction(
  ActionTypes.GET_ADMIN_ORDERS_ERROR,
  (error) => error
);

export const getAdminOrdersList =
  (search, status, page, limit, callback) => (dispatch) => {
    dispatch(getOrdersAdminStart());
    return _getAdminOrdersList(search, status, page, limit)
      .then((response) => {
        dispatch(getOrdersAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(getOrdersAdminError(error));
        if (error && error?.error) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

/* GET  ORDER DETAIL  */
export const getOrderDetailStart = createAction(
  ActionTypes.GET_ADMIN_ORDER_DETAIL_START
);
export const getOrderDetailSuccess = createAction(
  ActionTypes.GET_ADMIN_ORDER_DETAIL_SUCCESS,
  (response) => response
);
export const getOrderDetailError = createAction(
  ActionTypes.GET_ADMIN_ORDER_DETAIL_ERROR,
  (error) => error
);
export const getOrderDetail = (id, callback) => async (dispatch) => {
  try {
    dispatch(getOrderDetailStart());

    const response = await _getOrderDetail(id);
    if (response) {
      callback(response);
    }
    dispatch(getOrderDetailSuccess(response));
  } catch (error) {
    dispatch(getOrderDetailError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

/* Update Order Status  */
export const updateStatusOrderStart = createAction(
  ActionTypes.UPDATE_ADMIN_ORDER_STATUS
);
export const updateStatusOrderSuccess = createAction(
  ActionTypes.UPDATE_ADMIN_ORDER_STATUS_SUCCESS,
  (response) => response
);
export const updateStatusOrderError = createAction(
  ActionTypes.UPDATE_ADMIN_ORDER_STATUS_ERROR,
  (error) => error
);
export const updateOrderStatus = (id, data, callback) => async (dispatch) => {
  try {
    dispatch(updateStatusOrderStart());

    const response = await _updateOrderStatus(id, data);
    if (response) {
      callback(response);
    }
    dispatch(updateStatusOrderSuccess(response));
  } catch (error) {
    dispatch(updateStatusOrderError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const scanQROrderStart = createAction(ActionTypes.SCAN_QR_START);
export const scanQROrderSuccess = createAction(
  ActionTypes.SCAN_QR_SUCCESS,
  (response) => response
);
export const scanQROrderError = createAction(
  ActionTypes.SCAN_QR_ERROR,
  (error) => error
);
export const generateOrderQR =
  (id, forType, callback, callbackError) => async (dispatch) => {
    try {
      dispatch(scanQROrderStart());

      const response = await _generateOrderQR(id, forType);
      if (response) {
        callback(response);
      }
      dispatch(scanQROrderSuccess(response));
    } catch (error) {
      callbackError(error);
      dispatch(scanQROrderError(error));
      if (error?.status?.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

const reducer = handleActions(
  {
    //ORDERS
    [ActionTypes.GET_ADMIN_ORDERS]: (state) => ({
      ...state,
      orders: {
        ...state.orders,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_ORDERS_SUCCESS]: (state, action) => ({
      ...state,

      orders: {
        ...state.orders,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_ORDERS_ERROR]: (state) => ({
      ...state,

      orders: {
        ...state.orders,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //   GET  ORDER DETAIL
    [ActionTypes.GET_ADMIN_ORDER_DETAIL_START]: (state) => ({
      ...state,
      adminOrderDetails: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_ORDER_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      adminOrderDetails: {
        ...state.adminOrderDetails,
        response: action.payload.data,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_ORDER_DETAIL_ERROR]: (state, action) => ({
      ...state,
      adminOrderDetails: {
        ...state.adminOrderDetails,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    //   UPDATE ORDER DETAIL
    [ActionTypes.UPDATE_ADMIN_ORDER_STATUS]: (state) => ({
      ...state,
      updateOrderStatus: {
        loading: true,
      },
    }),
    [ActionTypes.UPDATE_ADMIN_ORDER_STATUS_SUCCESS]: (state, action) => ({
      ...state,
      updateOrderStatus: {
        loading: false,
      },
    }),
    [ActionTypes.UPDATE_ADMIN_ORDER_STATUS_ERROR]: (state, action) => ({
      ...state,
      updateOrderStatus: {
        loading: false,
      },
    }),

    [ActionTypes.SCAN_QR_START]: (state) => ({
      ...state,
      scan_qr: {
        loading: true,
      },
    }),
    [ActionTypes.SCAN_QR_SUCCESS]: (state, action) => ({
      ...state,
      scan_qr: {
        loading: false,
      },
    }),
    [ActionTypes.SCAN_QR_ERROR]: (state, action) => ({
      ...state,
      scan_qr: {
        loading: false,
      },
    }),
  },
  initialState
);

export default reducer;
