'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { animationVariants } from '@/lib/animations';
import { fetchCalls, toggleArchiveAllCalls } from '@/lib/api';
import { Call } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import CallCard from './call-card';
import { ErrorCalls } from './error-calls';
import Loading from './loading';
import NoCalls from './no-calls';
import { Button } from './ui/button';

export default function Inbox() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: calls,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  });

  const { mutate: server_updateMultipleCalls, isPending } = useMutation({
    mutationFn: ({
      callIds,
      isArchived,
    }: {
      callIds: string[];
      isArchived: boolean;
    }) => toggleArchiveAllCalls({ callIds, isArchived }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success('Calls archived successfully');
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message);
      setIsOpen(true);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorCalls />;

  const activeCalls = calls?.filter((call: Call) => !call.is_archived) || [];
  const activeCallIds = activeCalls.map((call: Call) => call.id);


  return (
    <div className='flex-1 flex flex-col'>
      <motion.div
        variants={animationVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        layout>
        {activeCalls.length > 0 && (
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant='outline' className='w-full mb-6'>
                Archive All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will move all calls to the archived tab.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={isPending}
                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90 md:w-24'
                  onClick={() =>
                    server_updateMultipleCalls({
                      callIds: activeCallIds,
                      isArchived: true,
                    })
                  }>
                  {isPending ? (
                    <Loader2Icon className='animate-spin' />
                  ) : (
                    'Archive All'
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </motion.div>
      {activeCalls.length > 0 ? (
        <div className='grid gap-4'>
          <AnimatePresence>
            {activeCalls.map((call: Call) => (
              <CallCard key={call.id} call={call} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoCalls />
      )}
    </div>
  );
}
