import React from 'react';
import { Dialog } from './dialog';

export function EditModal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dialog>
      <Dialog.ButtonTrigger
        label='Editar Entrada'
        btnClass='bg-green-600'
        contentClass='float-right'
      />
      <Dialog.Content>
        <Dialog.HeaderDescription title='Entradas' />
        {children}
      </Dialog.Content>
    </Dialog>
  );
}
