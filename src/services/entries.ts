import { api } from '@/lib/axios';
import { FetchEntrySchema } from '@/schemas';

const AddEntry = async (data: any) => {
  return await api.post('/api/entradas', data);
};

const ListEntries = async () => {
  const { data } = await api.get('/api/entradas');
  return FetchEntrySchema.array().parse(data);
};

const DeleteEntry = async (id: string, date: string) => {
  const response = await api.delete('/api/entradas', { data: { id, date } });

  return response;
};

const UpdateEntry = async (data: any) => {
  return await api.put('/api/entradas', data);
};

export const EntriesService = {
  AddEntry,
  ListEntries,
  DeleteEntry,
  UpdateEntry,
};
