import { createAction, handleActions } from "redux-actions";
import {
  _getAdminBusinessList,
  _getAdminBusiness,
  _updateAdminBusinessStatus,
  _getAdminMemberList,
  _getAdminMember,
  _updateAdminMemberStatus,
  _getActiveBusiness,
  _getStores,
  _updateAdminMemberStatusSuspend,
} from "../../shared/httpService/api";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  businesses: { loading: false, response: {}, hasError: false, error: {} },
  business: { loading: false, response: {}, hasError: false, error: {} },
  updateBusinessStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },

  members: { loading: false, response: {}, hasError: false, error: {} },
  member: { loading: false, response: {}, hasError: false, error: {} },
  updateMemberStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  updateMemberSuspendStatus: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },

  activeBusiness: { loading: false, response: {}, hasError: false, error: {} },
  stores: { loading: false, response: {}, hasError: false, error: {} },
};

export const getBusinessesAdminStart = createAction(
  ActionTypes.GET_ADMIN_BUSINESSES
);
export const getBusinessesAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_BUSINESSES_SUCCESS,
  (response) => response
);
export const getBusinessesAdminError = createAction(
  ActionTypes.GET_ADMIN_BUSINESSES_ERROR,
  (error) => error
);

export const getAdminBusinessList =
  (search, status, page, limit, callback) => (dispatch) => {
    dispatch(getBusinessesAdminStart());
    return _getAdminBusinessList(search, status, page, limit)
      .then((response) => {
        dispatch(getBusinessesAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(getBusinessesAdminError(error));
        if (error && error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

export const getBusinessAdminStart = createAction(
  ActionTypes.GET_ADMIN_BUSINESS
);
export const getBusinessAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_BUSINESS_SUCCESS,
  (response) => response
);
export const getBusinessAdminError = createAction(
  ActionTypes.GET_ADMIN_BUSINESS_ERROR,
  (error) => error
);

export const getAdminBusiness = (id) => (dispatch) => {
  dispatch(getBusinessAdminStart());
  return _getAdminBusiness(id)
    .then((response) => {
      dispatch(getBusinessAdminSuccess(response));
    })
    .catch((error) => {
      dispatch(getBusinessAdminError(error));
      if (error && error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const updateBusinessesAdminStart = createAction(
  ActionTypes.UPDATE_BUSINESS_STATUS_ADMIN
);
export const updateBusinessesAdminSuccess = createAction(
  ActionTypes.UPDATE_BUSINESS_STATUS_SUCCESS,
  (response) => response
);
export const updateBusinessesAdminError = createAction(
  ActionTypes.UPDATE_BUSINESS_STATUS_ERROR,
  (error) => error
);

export const updateAdminBusinessStatus = (data, id, callback) => (dispatch) => {
  dispatch(updateBusinessesAdminStart());
  return _updateAdminBusinessStatus(data, id)
    .then((response) => {
      dispatch(updateBusinessesAdminSuccess(response));
      if (response) {
        callback(response);
      }
    })
    .catch((error) => {
      dispatch(updateBusinessesAdminError(error));
      if (error && error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const getMembersAdminStart = createAction(ActionTypes.GET_ADMIN_MEMBERS);
export const getMembersAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_MEMBERS_SUCCESS,
  (response) => response
);
export const getMembersAdminError = createAction(
  ActionTypes.GET_ADMIN_MEMBERS_ERROR,
  (error) => error
);

export const getAdminMemberList =
  (search, status, page, limit, callback) => (dispatch) => {
    dispatch(getMembersAdminStart());
    return _getAdminMemberList(search, status, page, limit)
      .then((response) => {
        dispatch(getMembersAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(getMembersAdminError(error));
        if (error && error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

export const getMemberAdminStart = createAction(ActionTypes.GET_ADMIN_MEMBER);
export const getMemberAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_MEMBER_SUCCESS,
  (response) => response
);
export const getMemberAdminError = createAction(
  ActionTypes.GET_ADMIN_MEMBER_ERROR,
  (error) => error
);

export const getAdminMember = (id) => (dispatch) => {
  dispatch(getMemberAdminStart());
  return _getAdminMember(id)
    .then((response) => {
      dispatch(getMemberAdminSuccess(response));
    })
    .catch((error) => {
      dispatch(getMemberAdminError(error));
      if (error && error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const updateMemberAdminStart = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_ADMIN
);
export const updateMemberAdminSuccess = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_SUCCESS,
  (response) => response
);
export const updateMemberAdminError = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_ERROR,
  (error) => error
);

export const updateAdminMemberStatus = (data, id, callback) => (dispatch) => {
  dispatch(updateMemberAdminStart());
  return _updateAdminMemberStatus(data, id)
    .then((response) => {
      dispatch(updateMemberAdminSuccess(response));
      if (response) {
        callback(response);
      }
    })
    .catch((error) => {
      dispatch(updateMemberAdminError(error));
      if (error && error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const updateMemberSuspendAdminStart = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_ADMIN_SUSPEND
);
export const updateMemberSuspendAdminSuccess = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_SUCCESS_SUSPEND,
  (response) => response
);
export const updateMemberSuspendAdminError = createAction(
  ActionTypes.UPDATE_MEMBER_STATUS_ERROR_SUSPEND,
  (error) => error
);

export const updateAdminMemberStatusSuspend =
  (data, id, callback) => (dispatch) => {
    dispatch(updateMemberSuspendAdminStart());
    return _updateAdminMemberStatusSuspend(data, id)
      .then((response) => {
        dispatch(updateMemberSuspendAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(updateMemberSuspendAdminError(error));
        if (error && error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

//ACTIVE_BUSINESS
export const activeBusinessStart = createAction(
  ActionTypes.GET_ACTIVE_BUSINESS_START
);
export const activeBusinessSuccess = createAction(
  ActionTypes.GET_ACTIVE_BUSINESS_SUCCESS,
  (response) => response
);
export const activeBusinessError = createAction(
  ActionTypes.GET_ACTIVE_BUSINESS_ERROR,
  (error) => error
);
export const getActiveBusiness = (callback) => async (dispatch) => {
  try {
    dispatch(activeBusinessStart());
    const response = await _getActiveBusiness();
    if (response) {
      callback(response);
    }
    dispatch(activeBusinessSuccess(response));
  } catch (error) {
    dispatch(activeBusinessError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

//STORE_BY_BUSINESSES
export const getStoresStart = createAction(ActionTypes.GET_STORES_START);
export const getStoresSuccess = createAction(
  ActionTypes.GET_STORES_SUCCESS,
  (response) => response
);
export const getStoresError = createAction(
  ActionTypes.GET_STORES_ERROR,
  (error) => error
);
export const getStores = (id, callback) => async (dispatch) => {
  try {
    dispatch(getStoresStart());
    const response = await _getStores(id);
    if (response) {
      callback(response);
    }
    dispatch(getStoresSuccess(response));
  } catch (error) {
    dispatch(getStoresError(error));
    if (error?.status.length > 0) {
      toast.error(error?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

const reducer = handleActions(
  {
    //Businesses
    [ActionTypes.GET_ADMIN_BUSINESSES]: (state) => ({
      ...state,
      businesses: {
        ...state.businesses,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_BUSINESSES_SUCCESS]: (state, action) => ({
      ...state,

      businesses: {
        ...state.businesses,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_BUSINESSES_ERROR]: (state) => ({
      ...state,

      businesses: {
        ...state.businesses,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //Business DETAIL
    [ActionTypes.GET_ADMIN_BUSINESS]: (state) => ({
      ...state,
      business: {
        ...state.business,
        loading: true,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.GET_ADMIN_BUSINESS_SUCCESS]: (state, action) => ({
      ...state,

      business: {
        ...state.business,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_BUSINESS_ERROR]: (state) => ({
      ...state,

      business: {
        ...state.business,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //Update business DETAIL
    [ActionTypes.UPDATE_BUSINESS_STATUS_ADMIN]: (state) => ({
      ...state,
      updateBusinessStatus: {
        loading: true,
      },
    }),
    [ActionTypes.UPDATE_BUSINESS_STATUS_SUCCESS]: (state, action) => ({
      ...state,

      updatePharmacyStatus: {
        loading: false,
      },
    }),
    [ActionTypes.UPDATE_BUSINESS_STATUS_ERROR]: (state) => ({
      ...state,

      updatePharmacyStatus: {
        loading: false,
      },
    }),
    //Members
    [ActionTypes.GET_ADMIN_MEMBERS]: (state) => ({
      ...state,
      members: {
        ...state.members,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_MEMBERS_SUCCESS]: (state, action) => ({
      ...state,

      members: {
        ...state.members,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_MEMBERS_ERROR]: (state) => ({
      ...state,

      members: {
        ...state.members,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //Member DETAIL
    [ActionTypes.GET_ADMIN_MEMBER]: (state) => ({
      ...state,
      member: {
        ...state.member,
        loading: true,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.GET_ADMIN_MEMBER_SUCCESS]: (state, action) => ({
      ...state,

      member: {
        ...state.member,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_MEMBER_ERROR]: (state) => ({
      ...state,

      member: {
        ...state.member,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //Update Member DETAIL
    [ActionTypes.UPDATE_MEMBER_STATUS_ADMIN]: (state) => ({
      ...state,
      updateMemberStatus: {
        loading: true,
      },
    }),
    [ActionTypes.UPDATE_MEMBER_STATUS_SUCCESS]: (state, action) => ({
      ...state,

      updateMemberStatus: {
        loading: false,
      },
    }),
    [ActionTypes.UPDATE_MEMBER_STATUS_ERROR]: (state) => ({
      ...state,

      updateMemberStatus: {
        loading: false,
      },
    }),

    [ActionTypes.UPDATE_MEMBER_STATUS_ADMIN_SUSPEND]: (state) => ({
      ...state,
      updateMemberSuspendStatus: {
        loading: true,
      },
    }),
    [ActionTypes.UPDATE_MEMBER_STATUS_SUCCESS_SUSPEND]: (state, action) => ({
      ...state,

      updateMemberSuspendStatus: {
        loading: false,
      },
    }),
    [ActionTypes.UPDATE_MEMBER_STATUS_ERROR_SUSPEND]: (state) => ({
      ...state,

      updateMemberSuspendStatus: {
        loading: false,
      },
    }),

    //ACTIVE_BUSINESS
    [ActionTypes.GET_ACTIVE_BUSINESS_START]: (state) => ({
      ...state,
      activeBusiness: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ACTIVE_BUSINESS_SUCCESS]: (state, action) => ({
      ...state,
      activeBusiness: {
        ...state.activeBusiness,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload,
      },
    }),
    [ActionTypes.GET_ACTIVE_BUSINESS_ERROR]: (state, action) => ({
      ...state,
      activeBusiness: {
        ...state.activeBusiness,
        loading: false,
        hasError: false,
        error: action.payload,
        response: {},
      },
    }),

    //STORES
    [ActionTypes.GET_STORES_START]: (state) => ({
      ...state,
      stores: {
        loading: true,
        response: {},
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_STORES_SUCCESS]: (state, action) => ({
      ...state,
      stores: {
        ...state.stores,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload,
      },
    }),
    [ActionTypes.GET_STORES_ERROR]: (state, action) => ({
      ...state,
      stores: {
        ...state.stores,
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
