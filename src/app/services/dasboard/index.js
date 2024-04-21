import { createAction, handleActions } from "redux-actions";
import {
  _getAdminPharmaciesList,
  _getAdminPharmacy,
  _updateAdminPharmacyStatus,
  _sendReUploadLink,
  _orderReporting,
  _monthlySaleReport,
  _topSellingProducts,
  _getOrderCardReporting,
} from "../../shared/httpService/api";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  pharmacies: { loading: false, response: {}, hasError: false, error: {} },
  pharmacy: { loading: false, response: {}, hasError: false, error: {} },
  updatePharmacyStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  reUploadDocs: { loading: false },
  pharmacyId: "",
  orderReporting: { loading: false, response: {}, hasError: false, error: {} },
  monthlySaleReport: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  orderCardsReporting: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },

  topSellingProducts: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
};

export const getPharmaciesAdminStart = createAction(
  ActionTypes.GET_ADMIN_PHARMACIES
);
export const getPharmaciesAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_PHARMACIES_SUCCESS,
  (response) => response
);
export const getPharmaciesAdminError = createAction(
  ActionTypes.GET_ADMIN_PHARMACIES_ERROR,
  (error) => error
);

export const getAdminPharmaciesList =
  (search, status, page, limit, callback) => (dispatch) => {
    dispatch(getPharmaciesAdminStart());
    return _getAdminPharmaciesList(search, status, page, limit)
      .then((response) => {
        dispatch(getPharmaciesAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(getPharmaciesAdminError(error));
        if (error && error?.error) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

export const getPharmacyAdminStart = createAction(
  ActionTypes.GET_ADMIN_PHARMACY
);
export const getPharmacyAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_PHARMACY_SUCCESS,
  (response) => response
);
export const getPharmacyAdminError = createAction(
  ActionTypes.GET_ADMIN_PHARMACY_ERROR,
  (error) => error
);

export const getAdminPharmacy = (id) => (dispatch) => {
  dispatch(getPharmacyAdminStart());
  return _getAdminPharmacy(id)
    .then((response) => {
      dispatch(getPharmacyAdminSuccess(response));
    })
    .catch((error) => {
      dispatch(getPharmacyAdminError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const updatePharmaciesAdminStart = createAction(
  ActionTypes.UPDATE_PHARMACY_STATUS_ADMIN_PHARMACY
);
export const updatePharmaciesAdminSuccess = createAction(
  ActionTypes.UPDATE_PHARMACY_STATUS_SUCCESS,
  (response) => response
);
export const updatePharmaciesAdminError = createAction(
  ActionTypes.UPDATE_PHARMACY_STATUS_ERROR,
  (error) => error
);

export const updateAdminPharmacyStatus = (data, id, callback) => (dispatch) => {
  dispatch(updatePharmaciesAdminStart());
  return _updateAdminPharmacyStatus(data, id)
    .then((response) => {
      dispatch(updatePharmaciesAdminSuccess(response));
      if (response) {
        callback(response);
      }
    })
    .catch((error) => {
      dispatch(updatePharmaciesAdminError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const docReuploadLinkdminStart = createAction(
  ActionTypes.SEND_REUPLOAD_LINK_START
);
export const docReuploadLinkAdminSuccess = createAction(
  ActionTypes.SEND_REUPLOAD_LINK_SUCCESS,
  (response) => response
);
export const docReuploadLinkAdminError = createAction(
  ActionTypes.SEND_REUPLOAD_LINK_ERROR,
  (error) => error
);

export const sendReUploadLink = (id) => (dispatch) => {
  dispatch(docReuploadLinkdminStart());
  return _sendReUploadLink(id)
    .then((response) => {
      dispatch(docReuploadLinkAdminSuccess(response));
      if (response) {
        toast.success(`${response?.message}`);
      }
    })
    .catch((error) => {
      dispatch(docReuploadLinkAdminError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const pharmacyIdSuccess = createAction("SET_PHARMACY_ID");

export const setPharmacyID = (id) => (dispatch) => {
  dispatch(pharmacyIdSuccess(id));
};
// PHARMACY ORDER REPORTING

// Get Order Cards Reporting
export const getOrderCardReportingStart = createAction(
  ActionTypes.GET_ORDER_CARDS_REPORTING_START
);
export const getOrderCardReportingSuccess = createAction(
  ActionTypes.GET_ORDER_CARDS_REPORTING_SUCCESS,
  (response) => response
);
export const getOrderCardReportingError = createAction(
  ActionTypes.GET_ORDER_CARDS_REPORTING_ERROR,
  (error) => error
);

export const getOrderCardReporting = (callback) => async (dispatch) => {
  try {
    dispatch(getOrderCardReportingStart());
    const response = await _getOrderCardReporting();
    dispatch(getOrderCardReportingSuccess(response));
    if (response) {
      callback(response);
    }
  } catch (error) {
    dispatch(getOrderCardReportingError(error));
    if (error?.status?.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const orderReportingStart = createAction(
  ActionTypes.GET_ORDER_REPORTING_START
);
export const orderReportingSuccess = createAction(
  ActionTypes.GET_ORDER_REPORTING_SUCCESS,
  (response) => response
);
export const orderReportingError = createAction(
  ActionTypes.GET_ORDER_REPORTING_ERROR,
  (error) => error
);

export const getOrderReporting =
  (fromDate, toDate, callback) => async (dispatch) => {
    try {
      dispatch(orderReportingStart());
      const response = await _orderReporting(fromDate, toDate);
      dispatch(orderReportingSuccess(response));
      if (response) {
        callback(response);
      }
    } catch (error) {
      dispatch(orderReportingError(error));
      if (error?.status?.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

// Monthly sale Reporting

export const monthlySaleReportStart = createAction(
  ActionTypes.GET_MONTHLY_SALE_REPORT_START
);
export const monthlySaleReportSuccess = createAction(
  ActionTypes.GET_MONTHLY_SALE_REPORT_SUCCESS,
  (response) => response
);
export const monthlySaleReportError = createAction(
  ActionTypes.GET_MONTHLY_SALE_REPORT_ERROR,
  (error) => error
);

export const getMonthlySaleReport = (callback) => async (dispatch) => {
  try {
    dispatch(monthlySaleReportStart());
    const response = await _monthlySaleReport();
    dispatch(monthlySaleReportSuccess(response));
    if (response) {
      callback(response);
    }
  } catch (error) {
    dispatch(monthlySaleReportError(error));
    if (error?.status?.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const topSellingProductsStart = createAction(
  ActionTypes.TOP_SELLING_PRODUCTS_START
);
export const topSellingProductsSuccess = createAction(
  ActionTypes.TOP_SELLING_PRODUCTS_SUCCESS,
  (response) => response
);
export const topSellingProductsError = createAction(
  ActionTypes.TOP_SELLING_PRODUCTS_ERROR,
  (error) => error
);

export const getTopSellingProducts =
  (limit, fromDate, toDate, callback) => async (dispatch) => {
    try {
      dispatch(topSellingProductsStart());
      const response = await _topSellingProducts(limit, fromDate, toDate);
      dispatch(topSellingProductsSuccess(response));
      if (response) {
        callback(response);
      }
    } catch (error) {
      dispatch(topSellingProductsError(error));
      if (error?.status?.length > 0) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
const reducer = handleActions(
  {
    //PHARMACIES
    [ActionTypes.GET_ADMIN_PHARMACIES]: (state) => ({
      ...state,
      pharmacies: {
        ...state.pharmacies,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_PHARMACIES_SUCCESS]: (state, action) => ({
      ...state,

      pharmacies: {
        ...state.pharmacies,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_PHARMACIES_ERROR]: (state) => ({
      ...state,

      pharmacies: {
        ...state.pharmacies,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //PHARMACY DETAIL
    [ActionTypes.GET_ADMIN_PHARMACY]: (state) => ({
      ...state,
      pharmacy: {
        ...state.pharmacy,
        loading: true,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.GET_ADMIN_PHARMACY_SUCCESS]: (state, action) => ({
      ...state,

      pharmacy: {
        ...state.pharmacy,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_PHARMACY_ERROR]: (state) => ({
      ...state,

      updatePharmacyStatus: {
        ...state.updatePharmacyStatus,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //PHARMACY DETAIL
    [ActionTypes.UPDATE_PHARMACY_STATUS_ADMIN_PHARMACY]: (state) => ({
      ...state,
      updatePharmacyStatus: {
        ...state.updatePharmacyStatus,
        loading: true,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.UPDATE_PHARMACY_STATUS_SUCCESS]: (state, action) => ({
      ...state,

      updatePharmacyStatus: {
        ...state.updatePharmacyStatus,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.UPDATE_PHARMACY_STATUS_ERROR]: (state) => ({
      ...state,

      updatePharmacyStatus: {
        ...state.updatePharmacyStatus,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    [ActionTypes.SEND_REUPLOAD_LINK_START]: (state) => ({
      ...state,
      reUploadDocs: {
        ...state.reUploadDocs,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.SEND_REUPLOAD_LINK_SUCCESS]: (state, action) => ({
      ...state,
      reUploadDocs: {
        ...state.reUploadDocs,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.SEND_REUPLOAD_LINK_ERROR]: (state, action) => ({
      ...state,
      reUploadDocs: {
        ...state.reUploadDocs,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.GET_ORDER_REPORTING_START]: (state) => ({
      ...state,
      orderReporting: {
        ...state.orderReporting,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ORDER_REPORTING_SUCCESS]: (state, action) => ({
      ...state,
      orderReporting: {
        ...state.orderReporting,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ORDER_REPORTING_ERROR]: (state, action) => ({
      ...state,
      orderReporting: {
        ...state.orderReporting,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.GET_ORDER_CARDS_REPORTING_START]: (state) => ({
      ...state,
      orderCardsReporting: {
        ...state.orderCardsReporting,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ORDER_CARDS_REPORTING_SUCCESS]: (state, action) => ({
      ...state,
      orderCardsReporting: {
        ...state.orderCardsReporting,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ORDER_CARDS_REPORTING_ERROR]: (state, action) => ({
      ...state,
      orderCardsReporting: {
        ...state.orderCardsReporting,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.GET_MONTHLY_SALE_REPORT_START]: (state) => ({
      ...state,
      monthlySaleReport: {
        ...state.monthlySaleReport,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_MONTHLY_SALE_REPORT_SUCCESS]: (state, action) => ({
      ...state,
      monthlySaleReport: {
        ...state.monthlySaleReport,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_MONTHLY_SALE_REPORT_ERROR]: (state, action) => ({
      ...state,
      monthlySaleReport: {
        ...state.monthlySaleReport,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.TOP_SELLING_PRODUCTS_START]: (state) => ({
      ...state,
      topSellingProducts: {
        ...state.topSellingProducts,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.TOP_SELLING_PRODUCTS_SUCCESS]: (state, action) => ({
      ...state,
      topSellingProducts: {
        ...state.topSellingProducts,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.TOP_SELLING_PRODUCTS_ERROR]: (state, action) => ({
      ...state,
      topSellingProducts: {
        ...state.topSellingProducts,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    //'SET_PHARMACY_ID'
    ["SET_PHARMACY_ID"]: (state, action) => ({
      ...state,

      pharmacyId: action.payload,
    }),
  },
  initialState
);

export default reducer;
