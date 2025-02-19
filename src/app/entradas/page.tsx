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
import { handleFormatForBRL } from '@/lib';

const entryFormSchema = z.object({
  machine: z
    .string({
      required_error: 'Required',
    })
    .min(1),
  money: z
    .string({
      required_error: 'Required',
    })
    .min(1),
});
const EntryFrom = () => {
  const form = useForm<z.infer<typeof entryFormSchema>>({
    resolver: zodResolver(entryFormSchema),
  });

  function onSubmit(values: z.infer<typeof entryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
    const numericValue = rawValue ? Number(rawValue) / 100 : 0; // Convert to a decimal number
    form.setValue(fieldName as any, handleFormatForBRL(numericValue).format(), {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='machine'
          render={() => (
            <FormItem>
              <FormLabel>Maquininha</FormLabel>
              <FormControl>
                <Input
                  placeholder='R$100,00'
                  value={form.watch('machine')}
                  {...form.register('machine')}
                  onChange={handleChange}
                />
              </FormControl>
              <FormDescription>Vendas na maquininha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='money'
          render={() => (
            <FormItem>
              <FormLabel>Dinheiro</FormLabel>
              <FormControl>
                <Input
                  placeholder='R$200,00'
                  value={form.watch('money')}
                  {...form.register('money')}
                  onChange={handleChange}
                />
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
