'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TFetchEntrySchema } from '@/schemas';
import { EntriesService } from '@/services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { trasnformDateFromUsaToBr } from '@/lib';
import { DeleteModal } from '@/components';

type TEntryList = {
  data: TFetchEntrySchema[];
};
export default function EntryList({ data }: Readonly<TEntryList>) {
  const router = useRouter();
  const handleDelete = async (data: TFetchEntrySchema) => {
    const response = await EntriesService.DeleteEntry(data.id, data.date);

    if (response.status !== 200) {
      return toast.warning('Erro ao deletar', {
        duration: 3000,
        position: 'top-right',
        richColors: true,
      });
    }
    toast.success('Entrada deletada com sucesso', {
      duration: 3000,
      position: 'top-right',
      richColors: true,
    });
    router.refresh();
  };

  return (
    <div>
      <Table className='mt-4 shadow-md rounded-xl bg-slate-50 dark:bg-slate-500 font-regular'>
        <TableCaption>Lista de Entradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px] dark:text-white'>Data</TableHead>
            <TableHead className='dark:text-white'>Maquininha</TableHead>
            <TableHead className='dark:text-white'>Dinheiro</TableHead>
            <TableHead className='dark:text-white'>Eventos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{trasnformDateFromUsaToBr(item.date)}</TableCell>
                <TableCell>{item.machine}</TableCell>
                <TableCell>{item.money}</TableCell>
                <TableCell>
                  <DeleteModal
                    title='Delete'
                    message={`Tem certeza que deseja excluir essa entrada do dia: ${trasnformDateFromUsaToBr(
                      item.date
                    )}`}
                    onClickAction={() => handleDelete(item)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
