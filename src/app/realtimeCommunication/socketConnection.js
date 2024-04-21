import io from "socket.io-client";
import { store } from "../redux/store";
import { toast } from "react-toastify";
import { getAdminPharmaciesList, getAdminPharmacy } from "../services/dasboard";
import { getAdminNotificationList,addSocket } from "../services/auth";
import { getAdminOrdersList } from "../services/orders";
import { getAdminBusinessList, getAdminMemberList } from "../services/business";
let socket = null;

export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails?.token;
  socket = io(`${process?.env?.REACT_APP_BASE_URL}`, {
    auth: {
      token: jwtToken,
    },
    withCredentials: true,
    // transports:['websocket'],
  });

  socket.on("connect", () => {
    console.log("Successfully connected socket server");
    let sockets = store?.getState()?.auth?.sockets
    if(socket.id) {
      sockets.push(socket.id)
    }
    store.dispatch(addSocket(sockets))
  });

  socket.on("disconnect", () => {});
  socket.on("store_signup__notification", (data) => {
    const { notification_for, message } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    if (notification_for.includes(id)) {
      store.dispatch(getAdminPharmaciesList("", "", "", "", function (res) {}));
      store.dispatch(getAdminNotificationList("1", "10", function (res) {}));

      toast.success(message);
    }
  });

  socket.on("document_reupload_notification", (data) => {
    const { notification_for, message, pharmacyId } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    let pharmacyID = store?.getState()?.dashboard?.pharmacyId
      ? store?.getState()?.dashboard?.pharmacyId
      : "";
    if (notification_for.includes(id)) {
      if (pharmacyID && pharmacyID == pharmacyId) {
        store.dispatch(getAdminPharmacy(pharmacyId));
      }
      store.dispatch(getAdminNotificationList("1", "10", function (res) {}));
      toast.success(message);
    }
  });
  socket.on("store_order_notification", (data) => {
    const { notification_for, message } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    if (notification_for.includes(id)) {
      store.dispatch(
        getAdminNotificationList("1", "10", function (res) {
          if (res) {
            toast.success(message, {
              toastId: "success1",
            });
          }
        })
      );
      store.dispatch(getAdminOrdersList("", "", "1", "10", function (res) {}));
    }
    // toast.success(message)
  });

  socket.on("store_orderStatus_notification", (data) => {
    const { notification_for, message } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    if (notification_for.includes(id)) {
      store.dispatch(
        getAdminNotificationList("1", "10", function (res) {
          if (res) {
            toast.success(message, {
              toastId: "success1",
            });
          }
        })
      );
      store.dispatch(getAdminOrdersList("", "", "1", "10", function (res) {}));
    }
    // toast.success(message)
  });
  socket.on("business_signup", (data) => {
    const { notification_for, message } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    if (notification_for.includes(id)) {
      store.dispatch(
        getAdminNotificationList("1", "10", function (res) {
          if (res) {
            toast.success(message, {
              toastId: "success1",
            });
          }
        })
      );
      store.dispatch(
        getAdminBusinessList("", "", "1", "10", function (res) {})
      );
    }
    // toast.success(message)
  });

  socket.on("member_document_upload_notification", (data) => {
    const { notification_for, message } = data;
    let id = store?.getState()?.auth?.user
      ? store?.getState()?.auth?.user?._id
      : "";
    if (notification_for.includes(id)) {
      store.dispatch(
        getAdminNotificationList("1", "10", function (res) {
          if (res) {
            toast.success(message, {
              toastId: "success1",
            });
          }
        })
      );
      store.dispatch(getAdminMemberList("", "", "1", "10", function (res) {}));
    }
    // toast.success(message)
  });
};

export const socketServer = () => {
  return socket;
};
