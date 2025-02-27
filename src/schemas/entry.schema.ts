import { handleFormatForBRL, handleTransformToNumber } from '@/lib';
import { format } from 'date-fns';
import { z } from 'zod';

export const EntrySchema = z.object({
  machine: z
    .string()
    .min(1, {
      message: 'Campo obrigatório',
    })
    .transform((value) => {
      return handleTransformToNumber(value);
    }),
  money: z
    .string()
    .min(1, {
      message: 'Campo obrigatório',
    })
    .transform((value) => {
      return handleTransformToNumber(value);
    }),
  date: z.date({ required_error: 'Campo obrigatório' }).transform((date) => {
    return format(date, 'yyyy-MM-dd');
  }),
});

export type TEntrySchema = z.infer<typeof EntrySchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const FetchEntrySchema = z.object({
  id: z.string(),
  machine: z.number().transform((value) => {
    return handleFormatForBRL(value).format();
  }),
  money: z.number().transform((value) => {
    return handleFormatForBRL(value).format();
  }),
  date: z.string(),
});

export type TFetchEntrySchema = z.infer<typeof FetchEntrySchema>;
