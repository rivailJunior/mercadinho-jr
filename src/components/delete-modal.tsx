import React from 'react';
import { Dialog } from './dialog';
import { Button } from './ui/button';
import { AlertDialogCancel } from './ui/alert-dialog';

type TDeleteModal = {
  message: string;
  title: string;
  onClickAction: () => void;
};
export function DeleteModal({
  message,
  title,
  onClickAction,
}: Readonly<TDeleteModal>) {
  return (
    <Dialog
      trigger={
        <Dialog.ButtonTrigger label='Exluir' btnClass='bg-red-700 text-white' />
      }
    >
      <Dialog.HeaderDescription title={title} message={message} />
      <Button onClick={onClickAction} className='bg-red-700 mt-5 text-white'>
        Deletar
      </Button>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
    </Dialog>
  );
}
