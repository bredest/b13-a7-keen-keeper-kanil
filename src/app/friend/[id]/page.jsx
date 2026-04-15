"use client";

import React, { useState, useEffect, use } from 'react';
import { useAppData } from '@/context/AppDataContext';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Clock, Archive, Trash2, Phone, MessageSquare, Video } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FriendDetail({ params }) {
  const resolvedParams = use(params);
  const { friends, addInteraction } = useAppData();
  const [loading, setLoading] = useState(true);

  const friend = friends.find(f => f.id === parseInt(resolvedParams.id, 10));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-12 text-center text-gray-500">Loading friend profile...</div>;
  if (!friend) return notFound();

  const statusColors = {
    'on-track': 'bg-emerald-500 text-white',
    'almost due': 'bg-amber-500 text-white',
    'overdue': 'bg-red-500 text-white'
  };

  const handleInteraction = (type) => {
    addInteraction(friend.id, type);
    toast.success(`Logged a ${type} with ${friend.name}!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Info Card */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center mb-1">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
              {friend.picture.includes('/assets/faces/') ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold text-4xl bg-gray-100">
                  {friend.name.charAt(0)}
                </div>
              ) : (
                <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
              )}
            </div>
            
            <h1 className="text-[22px] font-bold text-slate-800 mb-2">{friend.name}</h1>
            
            <div className={`px-4 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-2 ${statusColors[friend.status]}`}>
              {friend.status === 'on-track' ? 'On-Track' : friend.status === 'almost due' ? 'Almost Due' : 'Overdue'}
            </div>

            <div className="flex flex-wrap gap-1 justify-center mb-6">
              {friend.tags.map(tag => (
                <span key={tag} className="px-3 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-500 text-center italic text-sm font-medium mb-2">
              &quot;{friend.bio}&quot;
            </p>
            <p className="text-slate-400 text-[13px] text-center">
              Preferred: email
            </p>
          </div>

          <button className="bg-white rounded-lg shadow-sm border border-gray-100 w-full py-3 px-4 text-slate-700 font-bold flex justify-center gap-2 items-center text-[15px] hover:bg-gray-50 transition">
            <Clock size={16} strokeWidth={2.5} /> Snooze 2 Weeks
          </button>
          <button className="bg-white rounded-lg shadow-sm border border-gray-100 w-full py-3 px-4 text-slate-700 font-bold flex justify-center gap-2 items-center text-[15px] hover:bg-gray-50 transition">
            <Archive size={16} strokeWidth={2.5} /> Archive
          </button>
          <button className="bg-white rounded-lg shadow-sm border border-gray-100 w-full py-3 px-4 text-red-500 font-bold flex justify-center gap-2 items-center text-[15px] hover:bg-red-50 transition">
            <Trash2 size={16} strokeWidth={2.5} /> Delete
          </button>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white py-8 px-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
              <div className="text-3xl font-bold text-[#194E38] mb-2">{friend.days_since_contact}</div>
              <div className="text-sm text-slate-500">Days Since Contact</div>
            </div>
            <div className="bg-white py-8 px-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
              <div className="text-3xl font-bold text-[#194E38] mb-2">{friend.goal}</div>
              <div className="text-sm text-slate-500">Goal (Days)</div>
            </div>
            <div className="bg-white py-8 px-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
              <div className="text-[26px] font-bold text-[#194E38] mb-2 whitespace-nowrap overflow-hidden text-ellipsis px-1" title={friend.next_due_date}>
                {new Date(friend.next_due_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
              </div>
              <div className="text-sm text-slate-500">Next Due</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 h-full">
            {/* Relationship Goal Card */}
            <div className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg text-[#194E38]">Relationship Goal</h3>
                <button className="text-sm font-medium text-slate-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-md transition">
                  Edit
                </button>
              </div>
              <div className="flex items-center">
                 <p className="text-slate-500 text-[15px]">
                   Connect every <span className="font-bold text-slate-900">{friend.goal} days</span>
                 </p>
              </div>
            </div>

            {/* Quick Check-In Card */}
            <div className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
              <h3 className="font-semibold text-lg text-[#194E38] mb-6">Quick Check-In</h3>
              <div className="grow flex items-center justify-between gap-4 w-full">
                <button 
                  onClick={() => handleInteraction('Call')}
                  className="w-full py-8 rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition border border-gray-100"
                >
                   <Phone size={24} className="text-slate-700" strokeWidth={2} />
                   <span className="text-[15px] font-medium text-slate-800">Call</span>
                </button>
                <button 
                  onClick={() => handleInteraction('Text')}
                  className="w-full py-8 rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition border border-gray-100"
                >
                   <MessageSquare size={24} className="text-slate-700" strokeWidth={2} />
                   <span className="text-[15px] font-medium text-slate-800">Text</span>
                </button>
                <button 
                  onClick={() => handleInteraction('Video')}
                  className="w-full py-8 rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition border border-gray-100"
                >
                   <Video size={24} className="text-slate-700" strokeWidth={2} />
                   <span className="text-[15px] font-medium text-slate-800">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
