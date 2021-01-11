/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
export const formatDate = (date) => {
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  if (hour < 10) hour = '0' + hour;
  if (minute < 10) minute = '0' + minute;

  const formattedDate =
    day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
  return formattedDate;
};
