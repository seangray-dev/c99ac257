import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CogIcon } from 'lucide-react';
import React from 'react';
import ResetCalls from './reset-calls';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ModeToggle } from './ui/mode-toggle';

export default function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className='text-muted-foreground'>
          <CogIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Card className='flex justify-between bg-transparent'>
            <CardHeader>
              <CardTitle className='text-lg'>Dark Mode</CardTitle>
              <CardDescription>
                Change your dark mode preference.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center py-0'>
              <ModeToggle />
            </CardContent>
          </Card>
          <Card className='flex justify-between bg-transparent'>
            <CardHeader>
              <CardTitle className='text-lg'>Reset Calls</CardTitle>
              <CardDescription>
                Reset all calls to initial state.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center py-0'>
              <ResetCalls />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
