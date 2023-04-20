const getRowsWithValue = <T>(
  data: T[],
  keyValue: string | number,
  key: keyof T
) => data.filter((value) => value[key] === keyValue);

const getKeyValuesFromRow = <T>(data: T[], key: keyof T) =>
  data.map((value) => value[key]);

export const getRowValues =
  <T>(data: T[], idKey: keyof T) =>
  (keyValue: string | number, key: keyof T) => {
    const rowData = getRowsWithValue(data, keyValue, idKey);
    return getKeyValuesFromRow(rowData, key);
  };
