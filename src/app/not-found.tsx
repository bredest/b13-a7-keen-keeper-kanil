"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 py-12 text-center">
      <h2 className="text-9xl font-black text-[#194E38] mb-4">404</h2>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h3>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn't track down the friendship or page you were looking for. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="bg-[#194E38] text-white px-8 py-3 rounded-full font-medium hover:bg-[#133b2a] transition"
      >
        Return Home
      </Link>
    </div>
  );
}
