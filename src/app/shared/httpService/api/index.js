import API from "../config";
import URLS from "../../constants/urls";

export const _signIn = (data) => {
  return API.post(`${URLS.USER_LOGIN}`, data);
};

export const _signIn_QR = (data) => {
  return API.post(`${URLS.USER_LOGIN_QR}`, data);
};

/**
 * forgot password
 *
 * @returns api response
 */
export const _forgotPassword = (body) => {
  return API.post(`${URLS.FORGOT_PASSWORD}`, body, { timeout: 8000 });
};

export const _createNewPassword = (body) => {
  let token = body?.uniqueString;
  if (body) {
    delete body.uniqueString;
  }
  return API.patch(`${URLS.CREATE_NEW_PASSWORD}/${token}/`, body, {
    timeout: 8000,
  });
};

export const _getAdminPharmaciesList = async (
  search,
  status,
  page,
  limit = 10
) => {
  let url = `${URLS.PHARMACIES}/?page=${page ? page : ""}&limit=${
    limit ? limit : ""
  }`;
  if (search) {
    url += `&search=${search ? search : ""}`;
  }
  if (status) {
    url += `&status=${status ? status : ""}`;
  }
  return API.get(`${url}`, { timeout: 20000 });
};

export const _getAdminPharmacy = (id) => {
  return API.get(`${URLS.PHARMACIES}/${id}`, { timeout: 20000 });
};

export const _updateAdminPharmacyStatus = (data, id) => {
  return API.patch(`${URLS.PHARMACIES}/${id}`, data, { timeout: 10000 });
};

export const _getAdminNotificationList = async (page, limit = 100) => {
  let url = `${URLS.NOTIFICATIONS}/?page=${page ? page : ""}&limit=${
    limit ? 100 : ""
  }`;

  return API.get(`${url}`, { timeout: 20000 });
};

export const _updateAdminNotification = () => {
  return API.patch(`${URLS.NOTIFICATIONS}`, { timeout: 10000 });
};

export const _resendQR = (body) => {
  return API.post(`${URLS.RESEND_QR}`, body, { timeout: 8000 });
};

export const _sendReUploadLink = (id) => {
  return API.post(`${URLS.PHARMACIES}/generate-reupload-store/${id}`, {
    timeout: 8000,
  });
};

export const _getAdminOrdersList = async (search, status, page, limit = 10) => {
  let url = `${URLS.ORDERS}/?page=${page ? page : ""}&limit=${
    limit ? limit : ""
  }`;
  if (search) {
    url += `&order_no=${search ? search : ""}`;
  }
  if (status) {
    url += `&status=${status ? status : ""}`;
  }
  return API.get(`${url}`, { timeout: 20000 });
};

export const _getAdminBusinessList = async (
  search,
  status,
  page,
  limit = 10
) => {
  let url = `${URLS.BUSINESSES}/?page=${page ? page : ""}&limit=${
    limit ? limit : ""
  }`;
  if (search) {
    url += `&search=${search ? search : ""}`;
  }
  if (status) {
    url += `&status=${status ? status : ""}`;
  }
  return API.get(`${url}`, { timeout: 20000 });
};

export const _getAdminBusiness = (id) => {
  return API.get(`${URLS.BUSINESSES}/${id}`, { timeout: 20000 });
};

export const _updateAdminBusinessStatus = (data, id) => {
  return API.patch(`${URLS.BUSINESSES}/${id}`, data, { timeout: 10000 });
};

export const _getAdminMemberList = async (search, status, page, limit = 10) => {
  let url = `${URLS.MEMBERS}/?page=${page ? page : ""}&limit=${
    limit ? limit : ""
  }`;
  if (search) {
    url += `&search=${search ? search : ""}`;
  }
  if (status) {
    url += `&status=${status ? status : ""}`;
  }
  return API.get(`${url}`, { timeout: 20000 });
};

export const _getAdminMember = (id) => {
  return API.get(`${URLS.MEMBERS}/${id}`, { timeout: 20000 });
};

export const _updateAdminMemberStatus = (data, id) => {
  return API.patch(`${URLS.MEMBERS}/${id}`, data, { timeout: 10000 });
};

export const _updateAdminMemberStatusSuspend = (data, id) => {
  return API.patch(`${URLS.MEMBERS}/${id}/status`, data, { timeout: 10000 });
};

export const _orderReporting = (fromDate, toDate) => {
  return API.get(
    `${URLS.ORDERS_REPORTING}?from=${fromDate ? fromDate : ""}&to=${
      toDate ? toDate : ""
    }`
  );
};

export const _getOrderCardReporting = () => {
  return API.get(`${URLS.ORDERS_REPORTING}`);
};

export const _monthlySaleReport = () => {
  return API.get(`${URLS.MONTHLY_REPORT}`);
};

export const _topSellingProducts = (limit, fromDate, toDate) => {
  return API.get(
    `${URLS.TOP_SELLING_PRODUCTS}?limit=${limit ? limit : ""}&from=${
      fromDate ? fromDate : ""
    }&to=${toDate ? toDate : ""}`
  );
};

export const _logout = () => {
  return API.get(`${URLS.LOGOUT}`);
};

export const _getOrderDetail = (id) => {
  return API.get(`${URLS.ORDER_DETAIL}/${id}`);
};

export const _updateOrderStatus = (id, data) => {
  return API.patch(`${URLS.ORDER_DETAIL}/${id}`, data, { timeout: 10000 });
};

export const _generateOrderQR = (id, forType) => {
  return API.get(`${URLS.ORDER_DETAIL}/generate-qr/${id}?forType=${forType}`);
};
export const _getProducts = (
  search,
  status,
  page,
  limit = 10,
  busId,
  storeId
) => {
  let url = `${URLS.PRODUCTS}/?page=${page ? page : ""}&limit=${
    limit ? limit : ""
  }`;
  if (search) {
    url += `&search=${search ? search : ""}`;
  }
  if (status) {
    url += `&status=${status ? status : ""}`;
  }
  if (busId) {
    url += `&business=${busId ? busId : ""}`;
  }
  if (storeId) {
    url += `&store=${storeId ? storeId : ""}`;
  }
  return API.get(`${url}`, { timeout: 20000 });
};
export const _getProductDetail = (id) => {
  return API.get(`${URLS.PRODUCT_DETAIL}${id}`);
};
export const _getSameProductInventories = (din, page, limit = 10) => {
  return API.get(
    `${URLS.PRODUCT_INVENTORIES}${din}/?page=${page ? page : ""}&limit=${
      limit ? limit : ""
    }`
  );
};
export const _getStores = (id) => {
  return API.get(`${URLS.STORES}${id}`);
};
export const _getActiveBusiness = () => {
  return API.get(`${URLS.ACTIVE_BUSINESS}`);
};
