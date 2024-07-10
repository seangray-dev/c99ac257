'use client';

import { resetCalls } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function ResetCalls() {
  const queryClient = useQueryClient();

  const { mutate: resetAllCalls, isPending } = useMutation({
    mutationFn: resetCalls,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Error resetting calls');
    },
  });

  return (
    <Button
      className='w-24'
      disabled={isPending}
      onClick={() => resetAllCalls()}
      variant={'destructive'}>
      {isPending ? <Loader2Icon className='animate-spin' /> : 'Reset Calls'}
    </Button>
  );
}
