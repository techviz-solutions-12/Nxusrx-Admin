import { createAction, handleActions } from "redux-actions";
import { _signIn } from "../../shared/httpService/api";
import ActionTypes from "../../shared/constants/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  userDetails: { loading: false, response: {}, hasError: false, error: {} },
  forgotPassword: { loading: false, response: {}, hasError: false, error: {} },
  resetPassword: { loading: false },
};
export const resetStore = () => {
  return {
    type: "USER_LOGOUT",
  };
};

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

export const signIn = (formData, history) => (dispatch) => {
  dispatch(signInStart());

  return _signIn(formData)
    .then((response) => {
      localStorage.setItem("token", response?.data?.token);
      toast.success("Logged in Successfully");
      setTimeout(() => {
        history("/pharmacies", { replace: true });
      }, 400);

      dispatch(signInSuccess(response));
    })
    .catch((error) => {
      dispatch(signInError(error));
      if (error && error?.error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    });
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
  },
  initialState
);

export default reducer;
