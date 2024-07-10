'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { Switch } from './switch';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Switch
      checked={resolvedTheme === 'dark'}
      onCheckedChange={() =>
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }
    />
  );
}
