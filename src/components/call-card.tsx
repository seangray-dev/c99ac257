import { animationVariants } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  PhoneForwarded,
  PhoneIncomingIcon,
  PhoneMissedIcon,
  PhoneOutgoingIcon,
} from 'lucide-react';
import React from 'react';
import CallDetails from './call-details';
import { Card } from './ui/card';

export default function CallCard({ call }: { call: any }) {
  const getIconClass = () => {
    if (call.call_type === 'answered') {
      return 'text-primary';
    } else if (call.call_type === 'missed' || call.call_type === 'voicemail') {
      return 'text-destructive';
    } else {
      return 'text-muted-foreground';
    }
  };

  const getPhoneIcon = () => {
    const iconClass = getIconClass();

    if (call.call_type === 'voicemail') {
      return <PhoneForwarded size={18} className={iconClass} />;
    } else if (call.call_type === 'missed') {
      return <PhoneMissedIcon size={18} className={iconClass} />;
    } else if (call.direction === 'inbound') {
      return <PhoneIncomingIcon size={18} className={iconClass} />;
    } else {
      return <PhoneOutgoingIcon size={18} className={iconClass} />;
    }
  };

  return (
    <motion.div
      variants={animationVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      layout>
      <Card key={call.id} className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {getPhoneIcon()}
            <div className='text-lg font-medium'>
              {call.direction === 'inbound' ? (
                <p>{call.from}</p>
              ) : (
                <p>{call.to}</p>
              )}
            </div>
          </div>
          <div className='text-right flex items-center gap-2'>
            <p className='text-muted-foreground'>
              {formatDate(call.created_at)}
            </p>
            <CallDetails call={call} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
