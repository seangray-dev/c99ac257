'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { updateCall } from '@/lib/api';
import { Call } from '@/lib/types';
import { formatCallDuration, formatDate } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InfoIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function CallDetails({ call }: { call: Call }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { mutate: server_updateCall, isPending } = useMutation({
    mutationFn: ({
      callId,
      isArchived,
    }: {
      callId: string;
      isArchived: boolean;
    }) => updateCall({ callId, isArchived }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success(
        `Call ${call.is_archived ? 'unarchived' : 'archived'} successfully`
      );
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <InfoIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          <div className='flex items-center justify-between'>
            <div>
              {call.direction === 'inbound' ? (
                <p>{call.from}</p>
              ) : (
                <p>{call.to}</p>
              )}
              <p className='capitalize'>{call.direction}</p>
            </div>
            <div>
              <p>{formatDate(call.created_at)}</p>
              <p>{formatCallDuration(call.duration)}</p>
            </div>
          </div>
          <Button
            variant='destructive'
            className='w-full'
            onClick={() =>
              server_updateCall({
                callId: call.id,
                isArchived: !call.is_archived,
              })
            }>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : call.is_archived ? (
              'Unarchive'
            ) : (
              'Archive'
            )}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <InfoIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Call Details</DrawerTitle>
        </DrawerHeader>
        <div className='flex items-center justify-between px-4'>
          <div>
            {call.direction === 'inbound' ? (
              <p>{call.from}</p>
            ) : (
              <p>{call.to}</p>
            )}
            <p className='capitalize'>{call.direction}</p>
          </div>
          <div>
            <p>{formatDate(call.created_at)}</p>
            <p>{formatCallDuration(call.duration)}</p>
          </div>
        </div>
        <DrawerFooter className='pt-4'>
          <Button
            variant='destructive'
            className='w-full'
            onClick={() =>
              server_updateCall({
                callId: call.id,
                isArchived: !call.is_archived,
              })
            }>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : call.is_archived ? (
              'Unarchive'
            ) : (
              'Archive'
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
