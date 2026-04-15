"use client";

import React, { useState, useEffect } from 'react';
import { useAppData } from '@/context/AppDataContext';
import FriendCard from '@/components/FriendCard';
import { Plus } from 'lucide-react';

export default function Home() {
  const { friends } = useAppData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full pt-32">
        <div className="w-12 h-12 border-4 border-[#194E38] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#194E38] font-medium">Loading your friends...</p>
      </div>
    );
  }

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needsAttention = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;
  const interactionsThisMonth = 12;

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      {/* Banner Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Friends to keep close in your life</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Your personal vault of meaningful connections. Ensure, track and nurture the relationships that matter most.
        </p>
        <button className="bg-[#194E38] text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-[#133b2a] transition">
          <Plus size={20} />
          Add a Friend
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-[#194E38] mb-1">{totalFriends}</div>
          <div className="text-sm text-gray-500">Total Friends</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-[#194E38] mb-1">{onTrack}</div>
          <div className="text-sm text-gray-500">On Track</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-[#194E38] mb-1">{needsAttention}</div>
          <div className="text-sm text-gray-500">Needs Attention</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-[#194E38] mb-1">{interactionsThisMonth}</div>
          <div className="text-sm text-gray-500">Interactions This Month</div>
        </div>
      </div>

      {/* Friends List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
