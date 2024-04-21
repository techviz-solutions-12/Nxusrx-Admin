import { createAction, handleActions } from "redux-actions";
import {
  _signIn,
  _forgotPassword,
  _createNewPassword,
  _getAdminNotificationList,
  _updateAdminNotification,
  _signIn_QR,
  _resendQR,
    _logout
} from "../../shared/httpService/api";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";

const initialState = {
    sockets: [],
    user: {},
    isSessionExpired:false,
  userDetails: { loading: false, response: {}, hasError: false, error: {} },
  forgotPassword: { loading: false, response: {}, hasError: false, error: {} },
  resetPassword: { loading: false },
  notifications: { loading: false, response: {}, hasError: false, error: {} },
  updateNotifications: { loading: false },
  resendQRLoading: { loading: false },
};
export const resetStore = () => {
  return {
    type: "USER_LOGOUT",
  };
};


export const logout = (callback) => (dispatch) => {
    return _logout()
        .then((response) => {
            if (response) {
                callback(response);
            }
        })
        .catch((error) => {
            if (error && error?.message) {
                toast.error(error?.message);
            } else {
                toast.error("Something went wrong");
            }
        });
};


export const updateSessionAction = createAction(
    'update-session',
    (response) => response
);

export const updateSession = (bool) => async (dispatch) => {
    dispatch(updateSessionAction(bool));
}

// SignIn
export const signInStart = createAction(ActionTypes.SIGNIN);
export const signInSuccess = createAction(
  ActionTypes.SIGNIN_SUCCESS,
  (response) => response
);
export const signInError = createAction(
  ActionTypes.SIGNIN_ERROR,
  (error) => error
);

export const signIn = (formData, history, callback) => (dispatch) => {
  if (formData.token !== "") {
    dispatch(signInStart());

    return _signIn(formData)
      .then((response) => {
        localStorage.setItem("token", response?.data?.token);
        toast.success("Logged in Successfully");
        setTimeout(() => {
          history("/dashboard", { replace: true });
        }, 600);

        dispatch(signInSuccess(response));
      })
      .catch((error) => {
        dispatch(signInError(error));
        if (error && error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  } else {
    dispatch(signInStart());
    return _signIn_QR(formData)
      .then((response) => {
        if (response) {
          callback({ is_qr: true, response });
        }

        dispatch(signInSuccess(response));
      })
      .catch((error) => {
        dispatch(signInError(error));
        if (error && error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  }
};

// forgot Password
export const forgotPasswordStart = createAction(ActionTypes.FORGOT_PASSWORD);
export const forgotPasswordSuccess = createAction(
  ActionTypes.FORGOT_PASSWORD_SUCCESS,
  (response) => response
);
export const forgotPasswordError = createAction(
  ActionTypes.FORGOT_PASSWORD_ERROR,
  (error) => error
);

export const forgotPassword = (formData, callback) => (dispatch) => {
  dispatch(forgotPasswordStart());
  return _forgotPassword(formData)
    .then((response) => {
      dispatch(forgotPasswordSuccess(response));
      if (response) {
        callback(response);
        toast.success(`${response?.message}`);
      }
    })
    .catch((error) => {
      dispatch(forgotPasswordError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

// create New Password
export const createNewPasswordStart = createAction(
  ActionTypes.CREATE_NEW_PASSWORD
);
export const createNewPasswordSuccess = createAction(
  ActionTypes.CREATE_NEW_PASSWORD_SUCCESS,
  (response) => response
);
export const createNewPasswordError = createAction(
  ActionTypes.CREATE_NEW_PASSWORD_ERROR,
  (error) => error
);

export const createNewPassword =
  (formData, history, callback) => (dispatch) => {
    dispatch(createNewPasswordStart());
    return _createNewPassword(formData)
      .then((response) => {
        if (response) {
          callback(response);
          setTimeout(() => {
            toast.success("Password created successfully");
          }, 100);

          history("/login", { replace: true });
        }
        dispatch(createNewPasswordSuccess(response));
      })
      .catch((error) => {
        dispatch(createNewPasswordError(error));
        if (error && error?.error) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

export const updateNotificationAdminStart = createAction(
  ActionTypes.UPDATE_ADMIN_NOTIFICATIONS
);
export const updateNotificationAdminSuccess = createAction(
  ActionTypes.UPDATE_ADMIN_NOTIFICATIONS_SUCCESS,
  (response) => response
);
export const updateNotificationAdminError = createAction(
  ActionTypes.UPDATE_ADMIN_NOTIFICATIONS_ERROR,
  (error) => error
);

export const updateAdminNotification = (callback) => (dispatch) => {
  dispatch(updateNotificationAdminStart());
  return _updateAdminNotification()
    .then((response) => {
      dispatch(updateNotificationAdminSuccess(response));
      if (response) {
        callback(response);
      }
    })
    .catch((error) => {
      dispatch(updateNotificationAdminError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const getNotificationAdminStart = createAction(
  ActionTypes.GET_ADMIN_NOTIFICATIONS
);
export const getNotificationAdminSuccess = createAction(
  ActionTypes.GET_ADMIN_NOTIFICATIONS_SUCCESS,
  (response) => response
);
export const getNotificationAdminError = createAction(
  ActionTypes.GET_ADMIN_NOTIFICATIONS_ERROR,
  (error) => error
);

export const getAdminNotificationList =
  (page, limit, callback) => (dispatch) => {
    dispatch(getNotificationAdminStart());
    return _getAdminNotificationList(page, limit)
      .then((response) => {
        dispatch(getNotificationAdminSuccess(response));
        if (response) {
          callback(response);
        }
      })
      .catch((error) => {
        dispatch(getNotificationAdminError(error));
        if (error && error?.error) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

// forgot Password
export const qrResendStart = createAction(ActionTypes.RESEND_QR_DETAILS_START);
export const qrResendSuccess = createAction(
  ActionTypes.RESEND_QR_DETAILS_SUCCESS,
  (response) => response
);
export const qrResendError = createAction(
  ActionTypes.RESEND_QR_DETAILS_ERROR,
  (error) => error
);

export const resendQR = (formData, callback) => (dispatch) => {
  dispatch(qrResendStart());
  return _resendQR(formData)
    .then((response) => {
      dispatch(qrResendSuccess(response));
      if (response) {
        callback(response);
        toast.success(`${response?.message}`);
      }
    })
    .catch((error) => {
      dispatch(qrResendError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
};

export const addSocketsSuccess = createAction(
    ActionTypes.ADD_SOCKETS_SUCCESS,
    (response) => response
);

export const addSocket = (sockets) => (dispatch) => {
    dispatch(addSocketsSuccess(sockets));
};

const reducer = handleActions(
  {
    //SIGNIN
    [ActionTypes.SIGNIN]: (state) => ({
      ...state,
      userDetails: {
        ...state.userDetails,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.SIGNIN_SUCCESS]: (state, action) => ({
      ...state,
      user: action.payload?.data,
      userDetails: {
        ...state.userDetails,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.SIGNIN_ERROR]: (state, action) => ({
      ...state,

      userDetails: {
        ...state.userDetails,
        loading: false,
        hasError: false,
        error: {},
      },
    }),

    //forgot password
    [ActionTypes.FORGOT_PASSWORD]: (state) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.FORGOT_PASSWORD_SUCCESS]: (state, action) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.FORGOT_PASSWORD_ERROR]: (state, action) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //create new password
    [ActionTypes.CREATE_NEW_PASSWORD]: (state) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: true,
      },
    }),
    [ActionTypes.CREATE_NEW_PASSWORD_SUCCESS]: (state) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: false,
      },
    }),
    [ActionTypes.CREATE_NEW_PASSWORD_ERROR]: (state, action) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: false,
      },
    }),


      [ActionTypes.ADD_SOCKETS_SUCCESS]: (state, action) => ({
          ...state,

          sockets: action.payload,
      }),

    //update notifications
    [ActionTypes.UPDATE_ADMIN_NOTIFICATIONS]: (state) => ({
      ...state,
      updateNotifications: {
        ...state.updateNotifications,
        loading: true,
      },
    }),
    [ActionTypes.UPDATE_ADMIN_NOTIFICATIONS_SUCCESS]: (state) => ({
      ...state,
      updateNotifications: {
        ...state.updateNotifications,
        loading: false,
      },
    }),
    [ActionTypes.UPDATE_ADMIN_NOTIFICATIONS_ERROR]: (state, action) => ({
      ...state,
      updateNotifications: {
        ...state.updateNotifications,
        loading: false,
      },
    }),
      // Update Session

      ['update-session']: (state, action) => ({
          ...state,
          isSessionExpired:action.payload
      }),


    //NOTIFICATONS
    [ActionTypes.GET_ADMIN_NOTIFICATIONS]: (state) => ({
      ...state,
      notifications: {
        ...state.notifications,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_ADMIN_NOTIFICATIONS_SUCCESS]: (state, action) => ({
      ...state,

      notifications: {
        ...state.notifications,
        loading: false,
        hasError: false,
        error: {},
        response: action.payload?.data,
      },
    }),
    [ActionTypes.GET_ADMIN_NOTIFICATIONS_ERROR]: (state) => ({
      ...state,

      notifications: {
        ...state.notifications,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),

    //RESEND QR
    [ActionTypes.RESEND_QR_DETAILS_START]: (state) => ({
      ...state,
      resendQRLoading: {
        ...state.resendQRLoading,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.RESEND_QR_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      resendQRLoading: {
        ...state.resendQRLoading,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),
    [ActionTypes.RESEND_QR_DETAILS_ERROR]: (state, action) => ({
      ...state,
      resendQRLoading: {
        ...state.resendQRLoading,
        loading: false,
        hasError: false,
        error: {},
        response: {},
      },
    }),
  },
  initialState
);

export default reducer;
