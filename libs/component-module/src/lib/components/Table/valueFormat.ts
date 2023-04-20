export const valueFormat = (value?: number, type?: any) => {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ options

  const toInteger = {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const toDecimal = {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  };
  const toPercentDecimal = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  };
  const toPercentDecimal2Digits = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const toPercentInteger = {
    style: 'percent',
    maximumFractionDigits: 0,
  };
  const toCurrencyDecimal = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const toCurrencyInteger = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  };

  const toPercent = toPercentDecimal;
  const toCurrency = toCurrencyInteger;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ convertor

  const convert = (v: number, toX: any) => v.toLocaleString('en-US', toX);

  const v = value || 0;
  if (type === 'integer') return convert(v, toInteger);
  if (type === 'decimal') return convert(v, toDecimal);
  if (type === 'percent') return convert(v, toPercent);
  if (type === 'percent-integer') return convert(v, toPercentInteger);
  if (type === 'percent-decimal') return convert(v, toPercentDecimal);
  if (type === 'percent-decimal-2Digits')
    return convert(v, toPercentDecimal2Digits);
  if (type === 'currency') return convert(v, toCurrency);
  if (type === 'currency-integer') return convert(v, toCurrencyInteger);
  if (type === 'currency-decimal') return convert(v, toCurrencyDecimal);
  if (typeof value === 'number') return convert(v, toInteger); // default number
  return value || ''; // default non-number
};

export default valueFormat;
