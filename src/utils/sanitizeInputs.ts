export const sanitizeData = (data: any): string => {
  const stringData = data && String(data); // convert data to string
  return stringData.toLowerCase().trim();
};
