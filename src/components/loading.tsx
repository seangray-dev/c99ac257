import { Loader2Icon } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center flex-1'>
      <Loader2Icon size={36} className='animate-spin' />
      Loading...
    </div>
  );
}
