'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
        <DialogDescription></DialogDescription>
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
