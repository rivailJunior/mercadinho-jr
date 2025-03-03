import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';

type TDialog = {
  children?: React.ReactNode;
  trigger?: React.ReactNode | React.JSX.Element;
};

function Dialog({ children, trigger }: Readonly<TDialog>) {
  return (
    <AlertDialog>
      {trigger}
      <AlertDialogContent>{children}</AlertDialogContent>
    </AlertDialog>
  );
}

const Cta = ({
  label,
  btnClass,
  contentClass,
}: {
  label: string;
  btnClass?: string;
  contentClass?: string;
}) => {
  return (
    <AlertDialogTrigger className={contentClass}>
      <Button className={btnClass}>{label}</Button>
    </AlertDialogTrigger>
  );
};
Dialog.ButtonTrigger = Cta;

const HeaderDescription = ({
  message,
  title,
}: {
  message?: string;
  title: string;
}) => {
  return (
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      {message && <AlertDialogDescription>{message}</AlertDialogDescription>}
    </AlertDialogHeader>
  );
};
Dialog.HeaderDescription = HeaderDescription;

const Footer = ({
  cancelLabel,
  actionLabel,
}: {
  cancelLabel?: string;
  actionLabel?: string;
}) => {
  return (
    <AlertDialogFooter>
      {cancelLabel && <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>}
      {actionLabel && <AlertDialogAction>{actionLabel}</AlertDialogAction>}
    </AlertDialogFooter>
  );
};
Dialog.Footer = Footer;
export { Dialog };
