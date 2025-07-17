'use client';

import { Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-4">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center ${
          pathname === '/' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link
        href="/settings"
        className={`flex flex-col items-center justify-center ${
          pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
}
