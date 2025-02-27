import currency from 'currency.js';

export const handleFormatForBRL = (value: number | string) =>
  currency(value, {
    symbol: 'R$',
    separator: '.',
    decimal: ',',
    precision: 2,
  });

export const handleTransformToNumber = (value: string) => {
  return Number(value.replace(/[\D]+/g, '')) / 100;
};