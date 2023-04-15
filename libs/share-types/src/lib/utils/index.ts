export const parseIdToNumber = (value: any) => {
  const parseValue = parseInt(value);
  if (Number.isNaN(parseValue)) {
    throw Error('Id is not a number');
  }
  return parseValue;
};
