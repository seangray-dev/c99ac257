import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SettingsDialog from './settings-dialog';

export default function Header() {
  return (
    <header className='flex items-center justify-between mb-6'>
      <Link href='/'>
        <Image
          className='dark:hidden'
          src={'/images/logo/logo-black.png'}
          alt='AirCall Logo'
          width={100}
          height={24}
        />
        <Image
          className='hidden dark:block'
          src={'/images/logo/logo-white.png'}
          alt='AirCall Logo'
          width={100}
          height={24}
        />
      </Link>
      <SettingsDialog />
    </header>
  );
}
