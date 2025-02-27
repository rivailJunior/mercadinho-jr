import { z } from 'zod';

export const transformDateFromBrToUsa = (data: string) => {
  const date = z.string().transform((value) => {
    return value.split('-').reverse().join('-');
  });

  return date.parse(data);
};

export const trasnformDateFromUsaToBr = (data: string) => {
  const date = z.string().transform((value) => {
    return value.split('-').reverse().join('-');
  });
  return date.parse(data);
};
