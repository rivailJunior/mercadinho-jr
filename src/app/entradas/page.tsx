'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const entryFormSchema = z.object({
  machine: z.number().min(1).max(99999),
  money: z.number().min(1).max(999999),
});

const EntryFrom = () => {
  const form = useForm<z.infer<typeof entryFormSchema>>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      machine: 0,
      money: 0,
    },
  });

  function onSubmit(values: z.infer<typeof entryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='machine'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maquininha</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} type='money' />
              </FormControl>
              <FormDescription>Vendas na maquininha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='money'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dinheiro</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>Vendas no dinheiro</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
export default function page() {
  return (
    <div className='h-screen '>
      <EntryFrom />
    </div>
  );
}
