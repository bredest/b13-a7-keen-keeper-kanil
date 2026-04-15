"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Timeline', path: '/timeline', icon: Clock },
    { name: 'Stats', path: '/stats', icon: BarChart2 },
  ];

  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b bg-white top-0 sticky z-50">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/assets/logo.png" alt="KeenKeeper Logo" width={150} height={40} className="object-contain w-auto h-8" />
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.name}
              href={link.path}
              className={twMerge(
                clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#194E38] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )
              )}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
