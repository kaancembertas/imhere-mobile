export const formatDate = (date) => {
  const formattedDate =
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes();
  return formattedDate;
};
