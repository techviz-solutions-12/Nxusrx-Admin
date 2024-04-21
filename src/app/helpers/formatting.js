export const capitalize = (str) => {
  let string = "";

  if (!str) {
    return "N/A";
  }
  string = str.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function ($1) {
    return $1.toUpperCase();
  });

  return string;
};
export function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function getMonthName(date) {
  let month = date.split("-")[1];
  let year = date.split("-")[0];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[Number(month) - 1];
}
