import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ErrorCalls() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center flex-1'>
      <Alert variant='destructive'>
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading your calls. Please try again later.
        </AlertDescription>
      </Alert>
    </div>
  );
}
