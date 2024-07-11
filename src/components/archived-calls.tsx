'use client';

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
import { animationVariants } from '@/lib/animations';
import { fetchCalls } from '@/lib/api';
import { Call } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import CallCard from './call-card';
import { ErrorCalls } from './error-calls';
import Loading from './loading';
import NoCalls from './no-calls';
import { Button } from './ui/button';

export default function Inbox() {
  const {
    data: calls,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorCalls />;

  const archivedCalls = calls?.filter((call: Call) => call.is_archived) || [];

  return (
    <div className='flex-1 flex flex-col'>
      <motion.div
        variants={animationVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        layout>
        {archivedCalls.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' className='w-full mb-6'>
                Unarchive All
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
                <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
                  Archive All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </motion.div>

      {archivedCalls.length > 0 ? (
        <div className='grid gap-4'>
          <AnimatePresence>
            {archivedCalls.map((call: Call) => (
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
