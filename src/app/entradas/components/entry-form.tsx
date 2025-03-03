'use client';
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
import { cn, handleFormatForBRL } from '@/lib';
import { z } from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { EntriesService } from '@/services';
import { EntrySchema } from '@/schemas';
import { useRouter } from 'next/navigation';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';

export const EntryFrom = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof EntrySchema>>({
    resolver: zodResolver(EntrySchema),
  });

  const clearForm = () => {
    form.reset({
      machine: 0,
      money: 0,
      date: '',
    });
  };

  async function onSubmit(values: z.infer<typeof EntrySchema>) {
    const data = await EntriesService.AddEntry(values);

    if (data) {
      toast.success('Entrada cadastrada com sucesso', {
        duration: 3000,
        position: 'top-right',
        richColors: true,
      });
      clearForm();
      router.refresh();
    }
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

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy')
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Data da entrada</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-row gap-2 justify-end'>
          <AlertDialogCancel className='bg-red-700 text-white'>
            Cancelar
          </AlertDialogCancel>
          <Button type='submit' className=' bg-green-700'>
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
};
