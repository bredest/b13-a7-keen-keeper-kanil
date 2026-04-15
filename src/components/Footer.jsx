import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#194E38] text-white py-12 px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center text-center gap-6">
        
        <Image src="/assets/logo-xl.png" alt="KeenKeeper Logo" width={200} height={60} className="w-auto h-12 mb-2" />
        
        <p className="text-sm text-gray-300 max-w-md">
          Your personal vault of meaningful connections.
          Ensure, track and nurture the relationships that matter most.
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold mb-3">Social Links</p>
          <div className="flex gap-4 justify-center">
            <Link href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <Image src="/assets/facebook.png" alt="Facebook" width={16} height={16} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <Image src="/assets/twitter.png" alt="Twitter" width={16} height={16} />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <Image src="/assets/instagram.png" alt="Instagram" width={16} height={16} />
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-white/20 text-xs text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
