import React, { Suspense } from 'react';
import { EntryFrom } from './components/';
import EntryList from './components/entry-list';
import { EntriesService } from '@/services';
import { TFetchEntrySchema } from '@/schemas';
import { CreateModal } from '@/components';

export default async function page() {
  return (
    <div className='container'>
      <CreateModal>
        <EntryFrom />
      </CreateModal>
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
