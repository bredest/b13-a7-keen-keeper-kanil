"use client";

import React, { useState } from 'react';
import { useAppData, InteractionType } from '@/context/AppDataContext';
import Image from 'next/image';

export default function Timeline() {
  const { timeline } = useAppData();
  const [filter, setFilter] = useState<'All' | InteractionType>('All');

  const filteredTimeline = filter === 'All' ? timeline : timeline.filter(t => t.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
        
        {/* Timeline Filter */}
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#194E38] focus:border-[#194E38]"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">All Interactions</option>
            <option value="Call">Calls only</option>
            <option value="Text">Texts only</option>
            <option value="Video">Video only</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {filteredTimeline.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No interactions found. Go to a friend's details page to add a check-in!
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredTimeline.map((entry, idx) => {
              const IconSrc = {
                'Call': '/assets/call.png',
                'Text': '/assets/text.png',
                'Video': '/assets/video.png'
              }[entry.type];

              return (
                <div key={entry.id} className={`p-6 flex items-start gap-6 ${idx !== filteredTimeline.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Image src={IconSrc} alt={entry.type} width={24} height={24} className="opacity-80" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{entry.type} <span className="font-normal text-gray-600">with {entry.friendName}</span></h3>
                    <p className="text-sm font-medium text-gray-400">
                      {new Date(entry.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
