import currency from 'currency.js';

export const handleFormatForBRL = (value: number | string) =>
  currency(value, {
    symbol: 'R$',
    separator: '.',
    decimal: ',',
    precision: 2,
  });
