import React from 'react';
import { Dialog } from './dialog';

export function CreateModal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dialog
      trigger={
        <Dialog.ButtonTrigger
          label='Nova Entrada'
          btnClass='bg-green-600'
          contentClass='float-right'
        />
      }
    >
      <Dialog.HeaderDescription title='Entradas' />
      {children}
    </Dialog>
  );
}
