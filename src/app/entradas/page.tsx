import React, { Suspense } from 'react';
import { EntryFrom } from './components/';
import EntryList from './components/entry-list';
import { EntriesService } from '@/services';
import { TFetchEntrySchema } from '@/schemas';
import { Dialog } from '@/components/dialog';

export default async function page() {
  return (
    <div className='h-screen '>
      <div className='mb-10 '>
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
          <EntryFrom />
        </Dialog>
      </div>
      <Suspense>
        <List />
      </Suspense>
    </div>
  );
}

const List = async () => {
  const data: TFetchEntrySchema[] = await EntriesService.ListEntries();
  return <EntryList data={data ?? []} />;
};
