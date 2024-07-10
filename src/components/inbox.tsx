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
import { fetchCalls } from '@/lib/api';
import { Call } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
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

  const activeCalls = calls?.filter((call: Call) => !call.is_archived) || [];

  return (
    <div className='flex-1 flex flex-col'>
      {activeCalls.length > 0 && (
        <AlertDialog>
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
              <AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
                Archive All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {activeCalls.length > 0 ? (
        <div className='grid gap-4'>
          {activeCalls.map((call: Call) => (
            <CallCard key={call.id} call={call} />
          ))}
        </div>
      ) : (
        <NoCalls />
      )}
    </div>
  );
}
