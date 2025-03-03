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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { trasnformDateFromUsaToBr } from '@/lib';
import { Dialog } from '@/components/dialog';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';

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
      <Table className='mt-4 shadow-md rounded-xl bg-slate-50'>
        <TableCaption>Lista de Entradas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Data</TableHead>
            <TableHead>Maquininha</TableHead>
            <TableHead>Dinheiro</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell className='font-medium'>
                  {trasnformDateFromUsaToBr(item.date)}
                </TableCell>
                <TableCell>{item.machine}</TableCell>
                <TableCell>{item.money}</TableCell>

                <TableCell>
                  <Dialog
                    trigger={
                      <Dialog.ButtonTrigger
                        label='Exluir'
                        btnClass='bg-red-700'
                      />
                    }
                  >
                    <Dialog.HeaderDescription
                      title='Excluindo Entrada'
                      message={`Tem certeza que deseja excluir essa entrada do dia: ${trasnformDateFromUsaToBr(
                        item.date
                      )} ? `}
                    />
                    <Button
                      onClick={() => handleDelete(item)}
                      className='bg-red-700 mt-5'
                    >
                      Deletar
                    </Button>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
